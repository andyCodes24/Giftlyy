// Pointing to port 5000 as per your backend setup
const BASE_URL = "http://localhost:5000/api";

// --- MILESTONE 3 LEGACY EXPORTS ---
// Kept intact so older components do not break
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function getProducts() {
  return apiRequest("/products");
}

// --- MILESTONE 4 EXPORTS ---
// The newer api object implementation used by updated components
async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  
  // Auto-fetch token if not explicitly provided
  const authToken = token || localStorage.getItem("token");
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Some endpoints have no body, which is fine.
  }

  if (!res.ok) {
    const message = data?.message || data?.error || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path, token) => request(path, { method: "GET", token }),
  post: (path, body, token) => request(path, { method: "POST", body, token }),
  put: (path, body, token) => request(path, { method: "PUT", body, token }),
  del: (path, token) => request(path, { method: "DELETE", token }),
};

export default api;