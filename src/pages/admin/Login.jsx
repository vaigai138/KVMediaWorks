import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../utils/adminApi';

const ACCENT = '#0f9df8';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setError('');
    try {
      await adminLogin(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ACCENT }}>
            <span className="text-white text-lg font-bold">KV</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">KV Media Works Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0f9df8] transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#0f9df8] transition-colors"
                placeholder="Enter password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 text-sm font-semibold transition-colors disabled:opacity-60"
              style={{ backgroundColor: ACCENT }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-gray-600 transition-colors">&larr; Back to website</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
