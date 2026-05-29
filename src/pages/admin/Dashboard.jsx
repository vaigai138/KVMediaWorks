import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminFetch } from '../../utils/adminApi';

const ACCENT = '#0f9df8';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminFetch('blogs')
      .then((data) => setBlogs(Array.isArray(data) ? data : []))
      .catch((err) => { if (err.unauthorized) navigate('/admin/login'); else setError(err.message); })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleDelete = async (slug, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await adminFetch('delete', { method: 'POST', body: { slug } });
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    } catch (err) {
      if (err.unauthorized) navigate('/admin/login');
      else setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const drafts = blogs.filter((b) => b.status === 'draft');

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            {blogs.length} post{blogs.length !== 1 ? 's' : ''} total
            {drafts.length > 0 && ` · ${drafts.length} draft${drafts.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link to="/admin/new" className="text-white px-5 py-2.5 text-sm font-semibold transition-colors flex items-center gap-2" style={{ backgroundColor: ACCENT }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          New Post
        </Link>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-4">{error}</div>}

      {loading ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: ACCENT, borderTopColor: 'transparent' }} />
          <p className="text-sm text-gray-500">Loading posts...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No blog posts yet</p>
          <Link to="/admin/new" className="inline-block text-white px-5 py-2.5 text-sm font-semibold transition-colors" style={{ backgroundColor: ACCENT }}>
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.slug} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {blog.coverImage && <img src={blog.coverImage} alt="" className="w-10 h-10 object-cover rounded flex-shrink-0" />}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{blog.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{blog.excerpt}</p>
                        <div className="md:hidden mt-1 flex items-center gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 ${blog.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{blog.status}</span>
                          <span className="text-[10px] text-gray-400">{new Date(blog.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2.5 py-1 ${blog.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{blog.status}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-500">{new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/edit/${blog.slug}`} className="text-xs font-medium transition-colors px-3 py-1.5 border" style={{ color: ACCENT, borderColor: 'rgba(15,157,248,0.2)' }}>Edit</Link>
                      <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 border border-gray-200 hover:border-gray-300">View</a>
                      <button onClick={() => handleDelete(blog.slug, blog.title)} disabled={deleting === blog.slug} className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 border border-red-100 hover:border-red-200 disabled:opacity-50">
                        {deleting === blog.slug ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
