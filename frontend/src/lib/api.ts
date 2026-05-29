function resolveApiOrigin(): string {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (import.meta.env.DEV) return 'http://localhost:5000';
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

export const API_ORIGIN = resolveApiOrigin();
const API_BASE_URL = `${API_ORIGIN}/api`;

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = localStorage.getItem('xenura_auth_token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = { ...options, headers };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data as T;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Request failed';
    console.error(`API Request Failed [${options.method || 'GET'} ${endpoint}]:`, message);
    throw err;
  }
}

export function resolveMediaUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  resumeUrl?: string;
  source: 'popup' | 'contact' | 'career';
  submittedAt: string;
  status: string; // 'new' | 'read' | 'replied'
}

export interface ModalPromo {
  slug: string;
  isActive: boolean;
  badgeText?: string;
  headline?: string;
  description?: string;
  bullets?: string[];
  eventLabel?: string;
  gradientStart?: string;
  gradientMid?: string;
  gradientEnd?: string;
  imageUrl: string;
  bannerLink: string;
  hasBanner?: boolean;
  updatedAt: string;
}

export const api = {
  // Auth Token Helpers
  getToken(): string | null {
    return localStorage.getItem('xenura_auth_token');
  },

  setToken(token: string): void {
    localStorage.setItem('xenura_auth_token', token);
    localStorage.setItem('xenura_admin_logged_in', 'true');
  },

  removeToken(): void {
    localStorage.removeItem('xenura_auth_token');
    localStorage.setItem('xenura_admin_logged_in', 'false');
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  },

  /* ─── PUBLIC APIS ─── */

  // Submit Contact Form
  async submitInquiry(formData: {
    name: string;
    email: string;
    phone?: string;
    company: string;
    budget: string;
    message: string;
    resumeUrl?: string;
    source?: 'popup' | 'contact' | 'career';
  }): Promise<{ success: boolean; message: string; submissionId: string }> {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  // Log in as Admin
  async login(username: string, password: string): Promise<{ success: boolean; token: string; message: string }> {
    const data = await apiRequest<{ success: boolean; token: string; message: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    if (data.success && data.token) {
      this.setToken(data.token);
    }
    
    return data;
  },

  async fetchPopupPromo(): Promise<ModalPromo> {
    return apiRequest<ModalPromo>('/promo/popup', { method: 'GET' });
  },

  /* ─── PROTECTED ADMIN APIS ─── */

  async fetchAdminPromo(): Promise<ModalPromo> {
    return apiRequest<ModalPromo>('/admin/promo/popup', { method: 'GET' });
  },

  async updatePopupPromo(settings: {
    isActive: boolean;
    bannerLink?: string;
  }): Promise<{ success: boolean; message: string; promo: ModalPromo }> {
    return apiRequest('/admin/promo/popup', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  async uploadPopupBanner(file: File): Promise<{ success: boolean; message: string; promo: ModalPromo }> {
    const formData = new FormData();
    formData.append('banner', file);
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/admin/promo/popup/banner`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Upload failed (${response.status})`);
    }
    return data;
  },

  async deletePopupBanner(): Promise<{ success: boolean; message: string; promo: ModalPromo }> {
    return apiRequest('/admin/promo/popup/banner', { method: 'DELETE' });
  },

  // Fetch all inquiries from database
  async fetchSubmissions(): Promise<Submission[]> {
    return apiRequest<Submission[]>('/admin/submissions', {
      method: 'GET'
    });
  },

  // Update Status of an inquiry
  async updateStatus(id: string, status: 'new' | 'read' | 'replied'): Promise<{ success: boolean; message: string }> {
    return apiRequest(`/admin/submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  // Delete an inquiry
  async deleteSubmission(id: string): Promise<{ success: boolean; message: string }> {
    return apiRequest(`/admin/submissions/${id}`, {
      method: 'DELETE'
    });
  },

  // Clear all inquiries
  async clearAll(): Promise<{ success: boolean; message: string }> {
    return apiRequest('/admin/submissions', {
      method: 'DELETE'
    });
  },
};
