const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    let msg = `API error: ${res.status}`;
    try {
      const err = await res.json();
      const d = err.detail;
      if (typeof d === 'string') msg = d;
      else if (Array.isArray(d)) msg = d.map((e: any) => e.msg).join(', ');
      else if (err.error) msg = err.error;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export const authApi = {
  register: (email: string, password: string, display_name?: string) =>
    apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, display_name }),
    }),
  login: (email: string, password: string) =>
    apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => apiFetch('/api/auth/logout', { method: 'POST' }),
  me: () => apiFetch('/api/auth/me'),
  subscription: () => apiFetch('/api/auth/subscription'),
};

export const onboardingApi = {
  save: (data: any) =>
    apiFetch('/api/onboarding', { method: 'POST', body: JSON.stringify(data) }),
  status: () => apiFetch('/api/onboarding/status'),
};

export const vitalsApi = {
  log: (data: any) => apiFetch('/api/logs', { method: 'POST', body: JSON.stringify(data) }),
  getLogs: (days?: number) =>
    apiFetch(`/api/logs${days ? `?days=${days}` : ''}`),
};

export const dashboardApi = {
  trends: () => apiFetch('/api/dashboard/trends'),
  readinessScore: () => apiFetch('/api/dashboard/readiness-score'),
  insights: () => apiFetch('/api/dashboard/insights'),
  examChecklist: () => apiFetch('/api/dashboard/exam-checklist'),
};

export const certificateApi = {
  get: () => apiFetch('/api/certificates'),
  update: (certificate_expiry_date: string, next_exam_date: string) =>
    apiFetch('/api/certificates', {
      method: 'PUT',
      body: JSON.stringify({ certificate_expiry_date, next_exam_date }),
    }),
};

export const paymentApi = {
  createCheckout: (tier: 'pro' | 'plus') =>
    apiFetch('/api/payments/checkout', { method: 'POST', body: JSON.stringify({ tier }) }),
};