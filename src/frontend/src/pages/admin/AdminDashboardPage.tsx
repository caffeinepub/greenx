import React from 'react';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { DEMO_EXPORTS } from '../../data/demoExports';
import { DEMO_INVENTORY } from '../../data/demoInventory';
import { formatCurrency, formatNumber } from '../../lib/formatting';
import { TrendingUp, Users, Leaf, DollarSign, Package, BarChart3, Plane } from 'lucide-react';

export default function AdminDashboardPage() {
  const totalLand = DEMO_FARMERS.reduce((sum, f) => sum + f.totalLand, 0);
  const totalFarmers = DEMO_FARMERS.length;
  const activeCrops = new Set(DEMO_FARMERS.map(f => f.cropName)).size;
  const totalRevenue = DEMO_FARMERS.reduce((sum, f) => sum + f.expectedRevenue, 0);
  const perAcreProfitability = Math.round(totalRevenue / totalLand);

  const kpis = [
    { label: 'Total Land', value: `${totalLand} Acres`, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Farmers', value: totalFarmers, icon: Users, color: 'text-green-600' },
    { label: 'Active Crops', value: activeCrops, icon: Leaf, color: 'text-green-600' },
    { label: 'Revenue Projection', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-yellow-600' },
    { label: 'Export Orders', value: DEMO_EXPORTS.length, icon: Package, color: 'text-orange-600' },
    { label: 'Per Acre Profitability', value: formatCurrency(perAcreProfitability), icon: BarChart3, color: 'text-green-600' },
  ];

  const droneInventory = DEMO_INVENTORY.filter(item => item.category === 'Drone');
  const officeStock = DEMO_INVENTORY.filter(item => item.location === 'Office Cluster');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of GreenX operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-card rounded-xl p-5 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <Icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Export Orders Summary</h3>
          <div className="space-y-3">
            {DEMO_EXPORTS.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{order.crop} → {order.destination}</p>
                  <p className="text-xs text-muted-foreground">{order.shipmentStatus}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">{formatCurrency(order.expectedRevenue)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Input Inventory</h3>
          <div className="space-y-2">
            {DEMO_INVENTORY.filter(item => item.location === 'Main Warehouse').slice(0, 5).map((item) => (
              <div key={item.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{formatNumber(item.quantity)} {item.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Plane className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-foreground">Drone Inventory</h3>
          </div>
          <div className="space-y-2">
            {droneInventory.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">{item.quantity} {item.unit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-foreground">Office/Cluster Stock</h3>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {officeStock.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-block px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-medium mr-1">
                      {item.category}
                    </span>
                  </p>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">{formatNumber(item.quantity)} {item.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
