import React from 'react';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AdminDiagnosticsPage() {
  const diagnostics = DEMO_FARMERS.map(f => ({
    farmer: f.name,
    village: f.village,
    crop: f.cropName,
    healthScore: f.cropHealthScore,
    soilPh: f.soilData.ph,
    moisture: f.soilData.moisture,
    status: f.cropHealthScore >= 85 ? 'good' : f.cropHealthScore >= 70 ? 'warning' : 'critical',
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Diagnostics</h1>
        <p className="text-muted-foreground mt-1">Crop health and soil diagnostics overview</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Farmer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Village</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Crop</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Health Score</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Soil pH</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Moisture</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {diagnostics.map((item, idx) => (
                <tr key={idx} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-medium">{item.farmer}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.village}</td>
                  <td className="px-4 py-3 text-sm">{item.crop}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{item.healthScore}/100</td>
                  <td className="px-4 py-3 text-sm">{item.soilPh}</td>
                  <td className="px-4 py-3 text-sm">{item.moisture}%</td>
                  <td className="px-4 py-3">
                    {item.status === 'good' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        Good
                      </span>
                    )}
                    {item.status === 'warning' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs font-medium">
                        <AlertTriangle className="h-3 w-3" />
                        Warning
                      </span>
                    )}
                    {item.status === 'critical' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-xs font-medium">
                        <AlertTriangle className="h-3 w-3" />
                        Critical
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
