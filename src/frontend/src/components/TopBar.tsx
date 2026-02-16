import React from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import GreenXWordmark from './GreenXWordmark';
import RoleLogo from './RoleLogo';

export default function TopBar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  if (!session) return null;

  return (
    <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <GreenXWordmark size="sm" variant="onPrimary" />
          <RoleLogo />
        </div>
        <div className="border-l border-primary-foreground/20 pl-3">
          <p className="text-sm font-medium">{session.name}</p>
          <p className="text-xs opacity-75 capitalize">{session.role.replace(/([A-Z])/g, ' $1').trim()}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}
