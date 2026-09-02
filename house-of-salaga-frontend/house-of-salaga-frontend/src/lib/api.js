const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

export function getAuthToken() {
  return localStorage.getItem('hos_token') || sessionStorage.getItem('hos_token');
}

export function getStoredUser() {
  const raw = localStorage.getItem('hos_user') || sessionStorage.getItem('hos_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAuthSession({ token, user }, remember = true) {
  const primary = remember ? localStorage : sessionStorage;
  const secondary = remember ? sessionStorage : localStorage;

  secondary.removeItem('hos_token');
  secondary.removeItem('hos_user');

  primary.setItem('hos_token', token);
  primary.setItem('hos_user', JSON.stringify(user));
  window.dispatchEvent(new Event('hos-auth-changed'));
}


export function updateStoredUser(patch = {}) {
  for (const storage of [localStorage, sessionStorage]) {
    const raw = storage.getItem('hos_user');
    if (!raw) continue;
    try {
      const current = JSON.parse(raw);
      storage.setItem('hos_user', JSON.stringify({ ...current, ...patch }));
    } catch {
      // Ignore malformed stored user data.
    }
  }
  window.dispatchEvent(new Event('hos-auth-changed'));
}

export function clearAuthSession() {
  localStorage.removeItem('hos_token');
  localStorage.removeItem('hos_user');
  sessionStorage.removeItem('hos_token');
  sessionStorage.removeItem('hos_user');
  window.dispatchEvent(new Event('hos-auth-changed'));
}

export async function apiFetch(path, options = {}) {
  const {
    auth = false,
    headers = {},
    body,
    ...rest
  } = options;

  const requestHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders['Content-Type'] = requestHeaders['Content-Type'] || 'application/json';
  }

  if (auth) {
    const token = getAuthToken();
    if (!token) {
      const error = new Error('Please log in to continue.');
      error.status = 401;
      throw error;
    }
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
    body:
      body === undefined || body instanceof FormData || typeof body === 'string'
        ? body
        : JSON.stringify(body),
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.errors?.[0]?.msg)) ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export { API_BASE_URL };
