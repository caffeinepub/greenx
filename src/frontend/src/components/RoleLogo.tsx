import React from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function RoleLogo() {
  const { session } = useAuth();

  if (!session) return null;

  const roleLogoMap: Record<string, string> = {
    landOwner: '/assets/generated/role-owner-logo.dim_256x256.png',
    worker: '/assets/generated/role-worker-logo.dim_256x256.png',
    expert: '/assets/generated/role-expert-logo.dim_256x256.png',
  };

  const logoSrc = roleLogoMap[session.role];

  if (!logoSrc) return null;

  return (
    <img
      src={logoSrc}
      alt={`${session.role} logo`}
      className="h-8 w-8 object-contain"
    />
  );
}
