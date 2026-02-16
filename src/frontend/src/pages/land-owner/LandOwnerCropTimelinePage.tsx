import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import TopBar from '../../components/TopBar';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';

export default function LandOwnerCropTimelinePage() {
  const navigate = useNavigate();

  const timeline = [
    { stage: 'Soil Sample Collection', date: '2025-11-01', completed: true },
    { stage: 'Soil Test Report', date: '2025-11-08', completed: true },
    { stage: 'Land Preparation', date: '2025-11-15', completed: true },
    { stage: 'Sowing', date: '2025-12-01', completed: true },
    { stage: 'Germination', date: '2025-12-10', completed: true },
    { stage: 'Vegetative Growth', date: '2026-01-05', completed: true },
    { stage: 'Flowering', date: '2026-02-01', completed: true },
    { stage: 'Fruiting/Maturation', date: '2026-03-01', completed: false },
    { stage: 'Pre-Harvest Inspection', date: '2026-04-01', completed: false },
    { stage: 'Harvest', date: '2026-04-15', completed: false },
    { stage: 'Post-Harvest Summary', date: '2026-04-20', completed: false },
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

        <h1 className="text-2xl font-bold text-foreground">Crop Timeline</h1>
        <p className="text-sm text-muted-foreground">Complete lifecycle from soil testing to post-harvest</p>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="space-y-4">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {item.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.stage}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
