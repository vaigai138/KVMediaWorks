/* One-off migration: seed the Git-as-CMS content store from existing hardcoded data.
   Run once with: node scripts/migrate-content.mjs
   Safe to delete after the content/ + public/content/ files exist. */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { blogsData } from '../src/utils/blogsData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const write = (rel, obj) => {
  const full = resolve(root, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, JSON.stringify(obj, null, 2));
  console.log('wrote', rel);
};

// ── 1. Migrate blogs → per-post JSON + index ──
const index = [];
for (const b of blogsData) {
  const publishedAt = new Date(b.date).toISOString();
  const blog = {
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt || '',
    content: b.content || '',
    coverImage: b.image || '',
    author: b.author || 'KV Media Works',
    category: b.category || 'General',
    publishedAt,
    updatedAt: publishedAt,
    status: 'published',
    tags: b.category ? [b.category] : [],
    metaTitle: '',
    metaDescription: '',
  };
  write(`public/content/blogs/${b.slug}.json`, blog);
  index.push({
    title: blog.title, slug: blog.slug, excerpt: blog.excerpt, coverImage: blog.coverImage,
    author: blog.author, category: blog.category, publishedAt, updatedAt: publishedAt,
    status: blog.status, tags: blog.tags,
  });
}
write('public/content/blog-index.json', index);

// ── 2. Seed page-meta.json (admin-editable per-route SEO) ──
write('public/content/page-meta.json', {
  '/': { label: 'Home', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' },
  '/about': { label: 'About', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' },
  '/services': { label: 'Services', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' },
  '/portfolio': { label: 'Portfolio', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' },
  '/testimonials': { label: 'Testimonials', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' },
  '/blog': { label: 'Blog', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' },
  '/contact': { label: 'Contact', title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' },
});

// ── 3. Seed admin credentials (CHANGE THE PASSWORD after first login) ──
const DEFAULT_PASSWORD = 'KVmedia@2026';
write('content/admin-credentials.json', {
  username: 'admin',
  passwordHash: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
});
console.log(`\nAdmin login → username: "admin"  password: "${DEFAULT_PASSWORD}"  (change it in Settings after first login)`);
