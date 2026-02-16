import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import TopBar from '../../components/TopBar';
import { ArrowLeft, TrendingUp, DollarSign, Droplets } from 'lucide-react';

export default function LandOwnerReportsPage() {
  const navigate = useNavigate();

  const reports = [
    { title: 'Crop Performance', value: '87%', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Revenue YTD', value: '₹1.25L', icon: DollarSign, color: 'text-blue-600' },
    { title: 'Water Usage', value: '850 m³', icon: Droplets, color: 'text-cyan-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <button
          onClick={() => navigate({ to: '/land-owner' })}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <h1 className="text-2xl font-bold text-foreground">Reports</h1>

        <div className="grid gap-4">
          {reports.map((report, idx) => {
            const Icon = report.icon;
            return (
              <div key={idx} className="bg-card rounded-xl p-5 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{report.title}</p>
                    <p className={`text-2xl font-bold ${report.color}`}>{report.value}</p>
                  </div>
                  <Icon className={`h-10 w-10 ${report.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Monthly Summary</h3>
          <p className="text-sm text-muted-foreground">
            Your farm is performing well this month. Crop health is above average, and revenue is on track to meet projections.
          </p>
        </div>
      </div>
    </div>
  );
}
