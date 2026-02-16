import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DemoRole, DemoSession, getSession, saveSession, clearSession, validateCredentials } from './demoAuth';

interface AuthContextValue {
  session: DemoSession | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: DemoRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);

  useEffect(() => {
    const stored = getSession();
    if (stored) {
      setSession(stored);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const credentials = validateCredentials(username, password);
    if (!credentials) return false;

    const newSession: DemoSession = {
      username: credentials.username,
      role: credentials.role,
      name: credentials.name,
    };
    saveSession(newSession);
    setSession(newSession);
    return true;
  };

  const logout = () => {
    clearSession();
    setSession(null);
  };

  const hasRole = (role: DemoRole): boolean => {
    return session?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenticated: !!session,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
