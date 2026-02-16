import React from 'react';
import { WeatherRecommendations } from '../../lib/weatherRecommendations';
import { Sprout, Droplet, Bug } from 'lucide-react';

interface FieldManagerWeatherActionsProps {
  recommendations: WeatherRecommendations;
}

export default function FieldManagerWeatherActions({ recommendations }: FieldManagerWeatherActionsProps) {
  const pestRiskColors = {
    Low: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    Medium: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
    High: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">Recommendations</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Spray</span>
          </div>
          <span className={`text-sm font-bold ${recommendations.spray === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
            {recommendations.spray}
          </span>
        </div>

        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
          <Droplet className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Irrigation</p>
            <p className="text-xs text-muted-foreground">{recommendations.irrigation}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium">Pest Risk</span>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded ${pestRiskColors[recommendations.pestRisk]}`}>
            {recommendations.pestRisk}
          </span>
        </div>
      </div>
    </div>
  );
}
