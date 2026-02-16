import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <ShieldAlert className="h-20 w-20 text-destructive mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You don't have permission to access this page.</p>
        <button
          onClick={() => navigate({ to: '/' })}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
