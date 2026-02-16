import React from 'react';
import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthProvider';
import {
  LayoutDashboard,
  Map,
  Users,
  Activity,
  Cloud,
  DollarSign,
  Package,
  UserCog,
  Settings,
  LogOut,
} from 'lucide-react';
import GreenXWordmark from '../components/GreenXWordmark';

export default function AdminLayout() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!session || session.role !== 'admin') {
    navigate({ to: '/access-denied' });
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Map, label: 'Land Management', path: '/admin/land' },
    { icon: Users, label: 'Farmers', path: '/admin/farmers' },
    { icon: Activity, label: 'Diagnostics', path: '/admin/diagnostics' },
    { icon: Cloud, label: 'Weather Analytics', path: '/admin/weather' },
    { icon: DollarSign, label: 'Finance', path: '/admin/finance' },
    { icon: Package, label: 'Exports', path: '/admin/exports' },
    { icon: UserCog, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col gap-2">
            <GreenXWordmark size="md" variant="default" />
            <div>
              <h2 className="text-sm font-semibold text-foreground">GreenX Admin</h2>
              <p className="text-xs text-muted-foreground">{session.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
