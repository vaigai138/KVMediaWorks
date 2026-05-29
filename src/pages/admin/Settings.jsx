import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminFetch, getUser } from '../../utils/adminApi';

const ACCENT = '#0f9df8';

const Settings = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(getUser());
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (newPassword.length < 8) { setError('New password must be at least 8 characters'); return; }
    if (newPassword !== confirmPassword) { setError('New passwords do not match'); return; }

    setSaving(true);
    try {
      const data = await adminFetch('change-password', {
        method: 'POST',
        body: { currentPassword, newUsername: newUsername.trim(), newPassword },
      });
      setSuccess(data.message || 'Credentials updated.');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) {
      if (err.unauthorized) navigate('/admin/login');
      else setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#0f9df8] transition-colors';

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-500 mb-6">Update your admin username and password.</p>

        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 mb-4">{success}</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Current Password</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputCls} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Username</label>
            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className={inputCls} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 characters" className={inputCls} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputCls} required />
          </div>
          <button type="submit" disabled={saving} className="text-white px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50" style={{ backgroundColor: ACCENT }}>
            {saving ? 'Updating...' : 'Update Credentials'}
          </button>
          <p className="text-[11px] text-gray-400">Changes commit to the repo and take effect after the redeploy (~60s). You'll need to log in again with the new credentials.</p>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Settings;
