import React, { useState } from 'react';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { formatCurrency } from '../../lib/formatting';
import { User, MapPin, Leaf } from 'lucide-react';

export default function AdminFarmersPage() {
  const [selectedFarmer, setSelectedFarmer] = useState(DEMO_FARMERS[0]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Farmers</h1>
        <p className="text-muted-foreground mt-1">Manage farmer profiles and contracts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-3">Farmer List</h3>
          <div className="space-y-2">
            {DEMO_FARMERS.map((farmer) => (
              <button
                key={farmer.id}
                onClick={() => setSelectedFarmer(farmer)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedFarmer.id === farmer.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <p className="font-medium text-sm">{farmer.name}</p>
                <p className="text-xs opacity-80">{farmer.village}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{selectedFarmer.name}</h2>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedFarmer.village}
                </span>
                <span className="flex items-center gap-1">
                  <Leaf className="h-4 w-4" />
                  {selectedFarmer.cropName}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Land</p>
              <p className="text-xl font-bold">{selectedFarmer.totalLand} Acres</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Expected Revenue</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(selectedFarmer.expectedRevenue)}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Profit Share</p>
              <p className="text-xl font-bold">{selectedFarmer.profitShare}%</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Health Score</p>
              <p className="text-xl font-bold">{selectedFarmer.cropHealthScore}/100</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Contract Summary</h3>
            <p className="text-sm text-muted-foreground">{selectedFarmer.contractSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
