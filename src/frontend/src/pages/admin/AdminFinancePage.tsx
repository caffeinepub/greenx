import React from 'react';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { formatCurrency } from '../../lib/formatting';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminFinancePage() {
  const totalRevenue = DEMO_FARMERS.reduce((sum, f) => sum + f.expectedRevenue, 0);
  const totalPayments = DEMO_FARMERS.reduce((sum, f) => 
    sum + f.paymentHistory.reduce((pSum, p) => pSum + p.amount, 0), 0
  );
  const totalLand = DEMO_FARMERS.reduce((sum, f) => sum + f.totalLand, 0);
  const perAcreProfitability = Math.round(totalRevenue / totalLand);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Finance</h1>
        <p className="text-muted-foreground mt-1">Financial overview and profitability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Payments</p>
            <TrendingDown className="h-5 w-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalPayments)}</p>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Per Acre Profitability</p>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(perAcreProfitability)}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Revenue by Farmer</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Farmer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Crop</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Land (Acres)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Expected Revenue</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Profit Share</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Farmer Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DEMO_FARMERS.map((farmer) => {
                const farmerProfit = Math.round(farmer.expectedRevenue * (farmer.profitShare / 100));
                return (
                  <tr key={farmer.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-medium">{farmer.name}</td>
                    <td className="px-4 py-3 text-sm">{farmer.cropName}</td>
                    <td className="px-4 py-3 text-sm">{farmer.totalLand}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatCurrency(farmer.expectedRevenue)}</td>
                    <td className="px-4 py-3 text-sm">{farmer.profitShare}%</td>
                    <td className="px-4 py-3 text-sm font-semibold">{formatCurrency(farmerProfit)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
