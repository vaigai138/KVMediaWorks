/* Admin API client — wraps the /api/admin serverless function.
   Token lives in localStorage; every authed call sends it as a Bearer token. */

const TOKEN_KEY = 'kv_admin_token';
const USER_KEY = 'kv_admin_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER_KEY) || 'Admin';
export const setSession = (token, username) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
};
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/** Generic authed call. Returns parsed JSON; throws Error(message) on failure.
    On 401 it clears the session so callers can redirect to login. */
export async function adminFetch(action, { method = 'GET', body } = {}) {
  const opts = {
    method,
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(`/api/admin?action=${action}`, opts);
  if (res.status === 401) {
    clearSession();
    const err = new Error('Unauthorized');
    err.unauthorized = true;
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

/** Login is the only unauthenticated call. */
export async function adminLogin(username, password) {
  const res = await fetch('/api/admin?action=login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setSession(data.token, data.username);
  return data;
}

/** Upload an image file → returns its public URL. */
export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result.split(',')[1];
        const data = await adminFetch('upload', { method: 'POST', body: { filename: file.name, data: base64 } });
        resolve(data.url);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
