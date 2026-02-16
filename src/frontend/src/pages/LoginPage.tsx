import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from '@tanstack/react-router';
import { DEMO_ACCOUNTS } from '../auth/demoAuth';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import GreenXWordmark from '../components/GreenXWordmark';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const { login, isAuthenticated, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && session) {
      const roleRoutes = {
        landOwner: '/land-owner',
        fieldManager: '/field-manager',
        expert: '/expert',
        worker: '/worker',
        admin: '/admin',
      };
      navigate({ to: roleRoutes[session.role] });
    }
  }, [isAuthenticated, session, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const quickLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    const success = login(user, pass);
    if (!success) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <GreenXWordmark size="xl" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Where land meets intelligence</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="w-full text-sm text-primary hover:underline"
            >
              {showCredentials ? 'Hide' : 'Show'} Demo Credentials
            </button>

            {showCredentials && (
              <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                <p className="text-xs font-semibold text-foreground mb-2">Demo Accounts:</p>
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.username}
                    onClick={() => quickLogin(acc.username, acc.password)}
                    className="w-full text-left p-2 bg-background hover:bg-accent rounded text-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{acc.name}</span>
                      <span className="text-muted-foreground ml-2">({acc.role})</span>
                    </div>
                    <span className="text-muted-foreground">{acc.username}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GreenX. Built with ❤️ using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
