import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { adminFetch, uploadImage } from '../../utils/adminApi';

const ACCENT = '#0f9df8';

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const BlogEditor = () => {
  const navigate = useNavigate();
  const { slug: editSlug } = useParams();
  const isEditing = Boolean(editSlug);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('published');
  const [tags, setTags] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loadingPost, setLoadingPost] = useState(isEditing);

  const coverInputRef = useRef(null);

  // Auto-generate slug from title (new posts only)
  useEffect(() => {
    if (!slugEdited && !isEditing) setSlug(slugify(title));
  }, [title, slugEdited, isEditing]);

  // Load existing post when editing
  useEffect(() => {
    if (!isEditing) return;
    adminFetch(`blog&slug=${editSlug}`)
      .then((data) => {
        setTitle(data.title);
        setSlug(data.slug);
        setSlugEdited(true);
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        setCoverImage(data.coverImage || '');
        setAuthor(data.author || '');
        setCategory(data.category || '');
        setStatus(data.status || 'published');
        setTags(data.tags?.join(', ') || '');
        setMetaTitle(data.metaTitle || '');
        setMetaDescription(data.metaDescription || '');
      })
      .catch((err) => { if (err.unauthorized) navigate('/admin/login'); else setError(err.message); })
      .finally(() => setLoadingPost(false));
  }, [editSlug, isEditing, navigate]);

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      return await uploadImage(file);
    } catch (e) {
      alert(e.message || 'Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handleImageUpload(file);
    if (url) setCoverImage(url);
  };

  const handleSubmit = async (publishStatus) => {
    if (!title.trim() || !content.trim()) { setError('Title and content are required'); return; }
    if (!slug.trim()) { setError('Slug is required'); return; }

    setSaving(true);
    setError('');
    try {
      await adminFetch('publish', {
        method: 'POST',
        body: {
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim(),
          content,
          coverImage,
          author: author.trim() || 'KV Media Works',
          category: category.trim() || 'General',
          status: publishStatus || status,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
        },
      });
      navigate('/admin');
    } catch (err) {
      if (err.unauthorized) navigate('/admin/login');
      else setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingPost) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: ACCENT, borderTopColor: 'transparent' }} />
        </div>
      </AdminLayout>
    );
  }

  const inputCls = 'w-full border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#0f9df8] transition-colors';

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Post' : 'New Post'}</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => handleSubmit('draft')} disabled={saving} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50">Save Draft</button>
            <button onClick={() => handleSubmit('published')} disabled={saving} className="px-5 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50" style={{ backgroundColor: ACCENT }}>
              {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Publish'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-4">{error}</div>}
        {uploading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-600 text-sm px-4 py-3 mb-4 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Uploading image...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-4">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title..." className="w-full text-2xl font-bold text-gray-900 placeholder:text-gray-300 border border-gray-200 px-4 py-3 outline-none focus:border-[#0f9df8] transition-colors bg-white" />
            <RichTextEditor content={content} onChange={setContent} onImageUpload={handleImageUpload} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 p-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">URL Slug</label>
              <div className="text-sm text-gray-400 mb-1">/blog/</div>
              <input type="text" value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugEdited(true); }} className={inputCls} />
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cover Image</label>
              {coverImage && (
                <div className="relative mb-2">
                  <img src={coverImage} alt="Cover" className="w-full h-40 object-cover rounded" />
                  <button onClick={() => setCoverImage('')} className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center text-xs hover:bg-black/80">&times;</button>
                </div>
              )}
              <input type="file" ref={coverInputRef} accept="image/*" onChange={handleCoverUpload} className="hidden" />
              <button onClick={() => coverInputRef.current?.click()} className="w-full py-2 border border-dashed border-gray-300 text-sm text-gray-500 hover:border-[#0f9df8] hover:text-[#0f9df8] transition-colors">
                {coverImage ? 'Change Image' : 'Upload Cover Image'}
              </button>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Brief summary shown in the blog listing..." className={`${inputCls} resize-none`} />
            </div>

            <div className="bg-white border border-gray-200 p-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Post Production" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="KV Media Works" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tags</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Editing, Color, Tips" className={inputCls} />
                <p className="text-[10px] text-gray-400 mt-1">Separate with commas</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">SEO</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Meta Title</label>
                  <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Custom title (optional)" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Meta Description</label>
                  <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} placeholder="Search engine description (optional)" className={`${inputCls} resize-none`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogEditor;
