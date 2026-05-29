/* Public blog data access — reads the static content store written by the
   admin panel (api/admin.js commits these files to the repo). No API call
   at read time: these are plain static JSON files served by the host. */

let _indexCache = null;

/** Fetch the blog index (array of published-or-draft summaries). Cached per session. */
export async function fetchBlogIndex() {
  if (_indexCache) return _indexCache;
  try {
    const res = await fetch('/content/blog-index.json', { cache: 'no-cache' });
    if (!res.ok) return [];
    const data = await res.json();
    _indexCache = Array.isArray(data) ? data : [];
    return _indexCache;
  } catch {
    return [];
  }
}

/** Only published posts, newest first. */
export async function fetchPublishedBlogs() {
  const index = await fetchBlogIndex();
  return index
    .filter((b) => b.status === 'published')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

/** Fetch a single full post by slug. Returns null if missing. */
export async function fetchBlog(slug) {
  try {
    const res = await fetch(`/content/blogs/${slug}.json`, { cache: 'no-cache' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
