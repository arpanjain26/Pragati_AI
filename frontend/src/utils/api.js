// API Utility for Frontend
const DEFAULT_API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://pragati-ai-backend-seven.vercel.app' : '');
const BASE_URL = DEFAULT_API_URL.replace(/\/$/, '');

const getToken = () => localStorage.getItem('pragati_token');

const normalizeEndpoint = (endpoint) => {
  if (!endpoint) return '/';
  if (endpoint.startsWith('http')) return endpoint;
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Only set Content-Type to application/json if we are not sending FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const normalizedEndpoint = normalizeEndpoint(endpoint);
  const url = BASE_URL ? `${BASE_URL}${normalizedEndpoint}` : normalizedEndpoint;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    data = await response.json();
  } else {
    data = { message: await response.text() }; // Fallback to text for non-JSON errors like 404/405 pages
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `API Request Failed with status ${response.status}`);
  }

  return data;
};

export const api = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint, body) => {
    return apiFetch(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },
  put: (endpoint, body) => {
    return apiFetch(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' }),
};
