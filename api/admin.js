import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/* ═══════════════════════════════════════════════════════════
   KV MEDIA WORKS — ADMIN API (Vercel serverless function)
   Git-as-CMS: reads/writes content JSON + images to the GitHub
   repo via the Contents API. Each write is a commit, which
   triggers a Vercel redeploy (~60s) to publish the change.

   Required env vars (set in Vercel project settings):
     GITHUB_TOKEN   — PAT with "Contents: read & write" on the repo
     GITHUB_REPO    — "owner/repo" (e.g. "vaigai/KVMediaWorks")
     GITHUB_BRANCH  — branch to commit to (default "main")
     JWT_SECRET     — long random string for signing admin tokens
     ADMIN_USERNAME — fallback admin username (if no credentials file)
     ADMIN_PASSWORD — fallback admin password (if no credentials file)
   ═══════════════════════════════════════════════════════════ */

const GITHUB_API = 'https://api.github.com';

// ── Helpers ──

function cors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.status(200).end(); return true; }
  return false;
}

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) throw new Error('No token');
  return jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
}

async function getCredentials() {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;
  if (GITHUB_TOKEN && GITHUB_REPO) {
    try {
      const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/content/admin-credentials.json?ref=${GITHUB_BRANCH || 'main'}`, {
        headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
      });
      if (r.ok) { const d = await r.json(); return JSON.parse(Buffer.from(d.content, 'base64').toString('utf-8')); }
    } catch { /* fall through to env fallback */ }
  }
  return { username: process.env.ADMIN_USERNAME || 'admin', password: process.env.ADMIN_PASSWORD || 'KVmedia@2026' };
}

async function ghGet(path) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH || 'main'}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!r.ok) { if (r.status === 404) return null; throw new Error(`GitHub GET ${r.status}`); }
  return r.json();
}

async function ghPut(path, content, message, sha) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;
  const body = { message, content: Buffer.from(content).toString('base64'), branch: GITHUB_BRANCH || 'main' };
  if (sha) body.sha = sha;
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`GitHub PUT ${r.status}`);
  return r.json();
}

async function ghPutBinary(path, base64Content, message) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: base64Content, branch: GITHUB_BRANCH || 'main' }),
  });
  if (!r.ok) throw new Error(`GitHub PUT binary ${r.status}`);
  return r.json();
}

async function ghDelete(path, sha, message) {
  const { GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH } = process.env;
  const r = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'DELETE',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH || 'main' }),
  });
  if (!r.ok) throw new Error(`GitHub DELETE ${r.status}`);
  return r.json();
}

// ── Action handlers ──

async function handleLogin(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const creds = await getCredentials();
  if (username !== creds.username) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = creds.passwordHash ? bcrypt.compareSync(password, creds.passwordHash) : password === creds.password;
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.status(200).json({ token, username });
}

async function handleListBlogs(req, res) {
  const data = await ghGet('public/content/blog-index.json');
  if (!data) return res.status(200).json([]);
  res.status(200).json(JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')));
}

async function handleGetBlog(req, res) {
  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'Slug required' });
  const data = await ghGet(`public/content/blogs/${slug}.json`);
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')));
}

async function handlePublish(req, res) {
  const { title, slug, excerpt, content, coverImage, author, status, tags, category, metaTitle, metaDescription } = req.body;
  if (!title || !slug) return res.status(400).json({ error: 'Title and slug required' });
  if (!content) return res.status(400).json({ error: 'Content required' });
  const now = new Date().toISOString();
  const existing = await ghGet(`public/content/blogs/${slug}.json`);
  const existingBlog = existing ? JSON.parse(Buffer.from(existing.content, 'base64').toString('utf-8')) : null;
  const blogData = {
    title, slug, excerpt: excerpt || '', content, coverImage: coverImage || '',
    author: author || 'KV Media Works', category: category || 'General',
    publishedAt: existingBlog?.publishedAt || now, updatedAt: now,
    status: status || 'published', tags: tags || [], metaTitle: metaTitle || '', metaDescription: metaDescription || '',
  };
  await ghPut(`public/content/blogs/${slug}.json`, JSON.stringify(blogData, null, 2), existingBlog ? `Update: ${title}` : `Create: ${title}`, existing?.sha);
  const idxData = await ghGet('public/content/blog-index.json');
  let index = idxData ? JSON.parse(Buffer.from(idxData.content, 'base64').toString('utf-8')) : [];
  const entry = { title, slug, excerpt: blogData.excerpt, coverImage: blogData.coverImage, author: blogData.author, category: blogData.category, publishedAt: blogData.publishedAt, updatedAt: now, status: blogData.status, tags: blogData.tags };
  const idx = index.findIndex((b) => b.slug === slug);
  if (idx >= 0) index[idx] = entry; else index.unshift(entry);
  await ghPut('public/content/blog-index.json', JSON.stringify(index, null, 2), `Index: ${title}`, idxData?.sha);
  res.status(200).json({ success: true, blog: blogData });
}

async function handleDelete(req, res) {
  const { slug } = req.body;
  if (!slug) return res.status(400).json({ error: 'Slug required' });
  const file = await ghGet(`public/content/blogs/${slug}.json`);
  if (!file) return res.status(404).json({ error: 'Not found' });
  await ghDelete(`public/content/blogs/${slug}.json`, file.sha, `Delete: ${slug}`);
  const idxData = await ghGet('public/content/blog-index.json');
  if (idxData) {
    let index = JSON.parse(Buffer.from(idxData.content, 'base64').toString('utf-8'));
    index = index.filter((b) => b.slug !== slug);
    await ghPut('public/content/blog-index.json', JSON.stringify(index, null, 2), `Remove: ${slug}`, idxData.sha);
  }
  res.status(200).json({ success: true });
}

async function handleUpload(req, res) {
  const { filename, data } = req.body;
  if (!filename || !data) return res.status(400).json({ error: 'Filename and data required' });
  const date = new Date().toISOString().split('T')[0];
  const clean = filename.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
  const finalName = `${date}-${clean}`;
  await ghPutBinary(`public/blog-images/${finalName}`, data, `Upload: ${finalName}`);
  res.status(200).json({ success: true, url: `/blog-images/${finalName}` });
}

async function handleGetPageMeta(req, res) {
  const data = await ghGet('public/content/page-meta.json');
  if (!data) return res.status(200).json({});
  res.status(200).json(JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')));
}

async function handleSavePageMeta(req, res) {
  const { pages } = req.body;
  if (!pages || typeof pages !== 'object') return res.status(400).json({ error: 'Pages object required' });
  const existing = await ghGet('public/content/page-meta.json');
  await ghPut('public/content/page-meta.json', JSON.stringify(pages, null, 2), 'Update page meta tags', existing?.sha);
  res.status(200).json({ success: true });
}

async function handleChangePassword(req, res) {
  const { currentPassword, newUsername, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Current and new password required' });
  const creds = await getCredentials();
  const valid = creds.passwordHash ? bcrypt.compareSync(currentPassword, creds.passwordHash) : currentPassword === creds.password;
  if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });
  const newCreds = { username: newUsername || creds.username, passwordHash: bcrypt.hashSync(newPassword, 10) };
  const existing = await ghGet('content/admin-credentials.json');
  await ghPut('content/admin-credentials.json', JSON.stringify(newCreds, null, 2), 'Update admin credentials', existing?.sha);
  res.status(200).json({ success: true, message: 'Updated. Takes effect after redeployment (~60s).' });
}

// ── Main router ──

export default async function handler(req, res) {
  if (cors(req, res)) return;

  const action = req.query.action || req.body?.action;

  try {
    // Login doesn't need auth
    if (action === 'login') return handleLogin(req, res);

    // All other actions need a valid token
    try { verifyToken(req); } catch { return res.status(401).json({ error: 'Unauthorized' }); }

    switch (action) {
      case 'blogs':           return handleListBlogs(req, res);
      case 'blog':            return handleGetBlog(req, res);
      case 'publish':         return handlePublish(req, res);
      case 'delete':          return handleDelete(req, res);
      case 'upload':          return handleUpload(req, res);
      case 'page-meta':       return handleGetPageMeta(req, res);
      case 'save-page-meta':  return handleSavePageMeta(req, res);
      case 'change-password': return handleChangePassword(req, res);
      default:                return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error(`Admin ${action} error:`, error);
    res.status(500).json({ error: 'Internal error' });
  }
}
