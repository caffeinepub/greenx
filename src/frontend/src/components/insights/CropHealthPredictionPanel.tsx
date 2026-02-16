import React from 'react';
import { CropHealthPrediction } from '../../lib/aiLikeHeuristics';
import { Activity } from 'lucide-react';

interface CropHealthPredictionPanelProps {
  prediction: CropHealthPrediction;
}

export default function CropHealthPredictionPanel({ prediction }: CropHealthPredictionPanelProps) {
  const scoreColor =
    prediction.score >= 85
      ? 'text-green-600'
      : prediction.score >= 75
      ? 'text-blue-600'
      : prediction.score >= 60
      ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AI Crop Health Prediction</h3>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold ${scoreColor}">{prediction.score}</span>
        <span className="text-sm font-medium text-muted-foreground">{prediction.label}</span>
      </div>
      <p className="text-xs text-muted-foreground">{prediction.explanation}</p>
    </div>
  );
}
