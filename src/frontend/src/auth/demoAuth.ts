export type DemoRole = 'landOwner' | 'fieldManager' | 'expert' | 'worker' | 'admin';

export interface DemoCredentials {
  username: string;
  password: string;
  role: DemoRole;
  name: string;
  phone: string;
}

export const DEMO_ACCOUNTS: DemoCredentials[] = [
  { username: 'owner1', password: 'demo123', role: 'landOwner', name: 'Rajesh Kumar', phone: '+91 98765 00001' },
  { username: 'manager1', password: 'demo123', role: 'fieldManager', name: 'Priya Sharma', phone: '+91 98765 00002' },
  { username: 'expert1', password: 'demo123', role: 'expert', name: 'Dr. Anand Patel', phone: '+91 98765 00003' },
  { username: 'worker1', password: 'demo123', role: 'worker', name: 'Suresh Reddy', phone: '+91 98765 00004' },
  { username: 'admin1', password: 'demo123', role: 'admin', name: 'Admin User', phone: '+91 98765 00000' },
];

export interface DemoSession {
  username: string;
  role: DemoRole;
  name: string;
}

const SESSION_KEY = 'greenx_demo_session';

export function validateCredentials(username: string, password: string): DemoCredentials | null {
  return DEMO_ACCOUNTS.find(acc => acc.username === username && acc.password === password) || null;
}

export function saveSession(session: DemoSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): DemoSession | null {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
