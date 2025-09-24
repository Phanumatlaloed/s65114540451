// static/js/api.js

// กำหนด base URL ให้รวม prefix/subpath ไว้ที่เดียว
const SUBPATH = "/s65114540451";  // เปลี่ยนตรงนี้ถ้าต้องการ
const API_BASE_URL = `${SUBPATH}/api/v1`;

// Helper: ดึง CSRF token จาก cookie
function getCSRFToken() {
  const name = "csrftoken=";
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return "";
}

// Wrapper function
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "X-Requested-With": "XMLHttpRequest",
  };

  // ถ้าเป็น JSON ให้ใส่ Content-Type
  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  // เพิ่ม CSRF token อัตโนมัติ
  defaultHeaders["X-CSRFToken"] = getCSRFToken();

  const response = await fetch(url, {
    credentials: "include", // สำคัญ: ส่ง cookie กลับไปด้วย
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return response.json();
}
