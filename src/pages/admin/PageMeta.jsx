import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminFetch } from '../../utils/adminApi';
import { SITE_URL } from '../../components/SEO';

const ACCENT = '#0f9df8';

const DEFAULT_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const EMPTY_META = { title: '', description: '', keywords: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '' };

const PageMeta = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [expandedPath, setExpandedPath] = useState(null);
  const [search, setSearch] = useState('');
  const [newPath, setNewPath] = useState('');
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    adminFetch('page-meta')
      .then((data) => setPages(data || {}))
      .catch((err) => { if (err.unauthorized) navigate('/admin/login'); })
      .finally(() => setLoading(false));
  }, [navigate]);

  const getAllPages = () => {
    const customPages = Object.keys(pages)
      .filter((path) => !DEFAULT_PAGES.some((p) => p.path === path))
      .map((path) => ({ path, label: pages[path]?.label || path, isCustom: true }));
    return [...DEFAULT_PAGES, ...customPages];
  };

  const handleSave = async () => {
    setSaving(true); setError(''); setSuccess('');
    try {
      await adminFetch('save-page-meta', { method: 'POST', body: { pages } });
      setSuccess('Meta tags saved! Live in ~60s after redeploy.');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      if (err.unauthorized) navigate('/admin/login');
      else setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path, field, value) => {
    setPages((prev) => ({
      ...prev,
      [path]: { ...(prev[path] || EMPTY_META), label: getAllPages().find((p) => p.path === path)?.label || path, [field]: value },
    }));
  };

  const addCustomPage = () => {
    const path = newPath.startsWith('/') ? newPath : `/${newPath}`;
    if (!path || path === '/') return;
    if (getAllPages().some((p) => p.path === path)) { setError('Page already exists'); return; }
    setPages((prev) => ({ ...prev, [path]: { ...EMPTY_META, label: newLabel || path } }));
    setNewPath(''); setNewLabel(''); setExpandedPath(path);
  };

  const removeCustomPage = (path) => {
    if (DEFAULT_PAGES.some((p) => p.path === path)) return;
    setPages((prev) => { const next = { ...prev }; delete next[path]; return next; });
    if (expandedPath === path) setExpandedPath(null);
  };

  const getMeta = (path) => pages[path] || EMPTY_META;
  const hasData = (path) => {
    const m = pages[path];
    return m && (m.title || m.description || m.keywords || m.ogTitle || m.ogDescription || m.ogImage || m.canonical);
  };

  const filteredPages = getAllPages().filter((p) =>
    p.label.toLowerCase().includes(search.toLowerCase()) || p.path.toLowerCase().includes(search.toLowerCase())
  );

  const inputCls = 'w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0f9df8] transition-colors';

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO Meta Tags</h1>
            <p className="text-sm text-gray-500 mt-1">Manage meta tags for every page — like WordPress</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="text-white px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50" style={{ backgroundColor: ACCENT }}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 mb-4">{success}</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-4">{error}</div>}

        {/* Add custom page */}
        <div className="bg-white border border-gray-200 p-4 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Add Custom Page</p>
          <div className="flex gap-3">
            <input type="text" value={newPath} onChange={(e) => setNewPath(e.target.value)} placeholder="/your-page-path" className={`flex-1 ${inputCls}`} />
            <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Page Label" className={`flex-1 ${inputCls}`} />
            <button onClick={addCustomPage} className="px-4 py-2 text-sm font-semibold text-white transition-colors whitespace-nowrap" style={{ backgroundColor: ACCENT }}>+ Add</button>
          </div>
        </div>

        <div className="mb-4">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages..." className={`${inputCls} bg-white px-4 py-2.5`} />
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: ACCENT, borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <div className="space-y-2">
            {filteredPages.map((page) => {
              const isExpanded = expandedPath === page.path;
              const meta = getMeta(page.path);
              return (
                <div key={page.path} className="bg-white border border-gray-200">
                  <button onClick={() => setExpandedPath(isExpanded ? null : page.path)} className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${hasData(page.path) ? 'bg-green-400' : 'bg-gray-200'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{page.label}</p>
                        <p className="text-xs text-gray-400 truncate">{page.path}</p>
                      </div>
                      {page.isCustom && <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-500">Custom</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {page.isCustom && (
                        <button onClick={(e) => { e.stopPropagation(); removeCustomPage(page.path); }} className="text-xs text-red-400 hover:text-red-600 px-2 py-1 border border-red-100 hover:border-red-200 transition-colors">Remove</button>
                      )}
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 font-semibold mb-1">Meta Title</label>
                          <input type="text" value={meta.title || ''} onChange={(e) => updateField(page.path, 'title', e.target.value)} placeholder="Full page title for search engines" className={inputCls} />
                          <p className="text-[10px] text-gray-400 mt-1">{(meta.title || '').length}/60 characters</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 font-semibold mb-1">OG Title</label>
                          <input type="text" value={meta.ogTitle || ''} onChange={(e) => updateField(page.path, 'ogTitle', e.target.value)} placeholder="Social sharing title" className={inputCls} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-500 font-semibold mb-1">Meta Description</label>
                          <textarea value={meta.description || ''} onChange={(e) => updateField(page.path, 'description', e.target.value)} rows={2} placeholder="Search engine description (150-160 chars ideal)" className={`${inputCls} resize-none`} />
                          <p className="text-[10px] text-gray-400 mt-1">{(meta.description || '').length}/160 characters</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-500 font-semibold mb-1">OG Description</label>
                          <textarea value={meta.ogDescription || ''} onChange={(e) => updateField(page.path, 'ogDescription', e.target.value)} rows={2} placeholder="Social media sharing description" className={`${inputCls} resize-none`} />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 font-semibold mb-1">Keywords</label>
                          <input type="text" value={meta.keywords || ''} onChange={(e) => updateField(page.path, 'keywords', e.target.value)} placeholder="keyword1, keyword2" className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 font-semibold mb-1">OG Image URL</label>
                          <input type="text" value={meta.ogImage || ''} onChange={(e) => updateField(page.path, 'ogImage', e.target.value)} placeholder="https://kvmediaworks.me/og.jpg" className={inputCls} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-500 font-semibold mb-1">Canonical URL</label>
                          <input type="text" value={meta.canonical || ''} onChange={(e) => updateField(page.path, 'canonical', e.target.value)} placeholder="Optional override" className={inputCls} />
                        </div>
                      </div>

                      {(meta.title || meta.description) && (
                        <div className="mt-4 p-3 bg-gray-50 border border-gray-100 rounded">
                          <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Google Preview</p>
                          <p className="text-[#1a0dab] text-base font-medium truncate">{meta.title || page.label}</p>
                          <p className="text-green-700 text-xs truncate">{SITE_URL}{page.path === '/' ? '' : page.path}</p>
                          <p className="text-gray-600 text-xs mt-0.5 line-clamp-2">{meta.description || 'No description set'}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={handleSave} disabled={saving} className="text-white px-6 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50" style={{ backgroundColor: ACCENT }}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PageMeta;
