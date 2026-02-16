import React from 'react';

interface GreenXWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'onPrimary';
}

export default function GreenXWordmark({ className = '', size = 'md', variant = 'default' }: GreenXWordmarkProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  };

  // For primary backgrounds, use foreground color for "X" instead of hardcoded black
  const xColorClass = variant === 'onPrimary' ? 'text-primary-foreground' : 'text-foreground';

  return (
    <div className={`greenx-wordmark inline-flex items-baseline font-bold tracking-tight ${sizeClasses[size]} ${className}`}>
      <span className="text-primary">Green</span>
      <span className={`${xColorClass} greenx-x-shadow`}>X</span>
    </div>
  );
}
