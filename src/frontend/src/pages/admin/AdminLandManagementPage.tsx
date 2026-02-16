import React from 'react';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { Map, TrendingUp } from 'lucide-react';

export default function AdminLandManagementPage() {
  const landBlocks = DEMO_FARMERS.map(f => ({
    id: f.id,
    location: f.village,
    acreage: f.totalLand,
    crop: f.cropName,
    farmer: f.name,
    status: f.growthStage,
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Land Management</h1>
        <p className="text-muted-foreground mt-1">Manage land blocks and allocations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landBlocks.map((block) => (
          <div key={block.id} className="bg-card rounded-xl p-5 shadow-sm border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{block.location}</h3>
                <p className="text-sm text-muted-foreground">{block.acreage} Acres</p>
              </div>
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Crop:</span>
                <span className="font-medium">{block.crop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Farmer:</span>
                <span className="font-medium">{block.farmer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">{block.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
