import React from 'react';

export default function AgriTechBanner() {
  return (
    <div className="w-full overflow-hidden rounded-xl shadow-sm border border-border bg-card">
      <img
        src="/assets/generated/agri-tech-banner.dim_1200x400.png"
        alt="Agriculture Technology - Drones, Smart Systems, and Sensors"
        className="w-full h-auto object-cover"
        style={{ maxHeight: '200px' }}
      />
    </div>
  );
}
