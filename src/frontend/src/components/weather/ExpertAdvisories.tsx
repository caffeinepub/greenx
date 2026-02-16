import React from 'react';
import { WeatherData } from '../../weather/simulatedWeather';
import { AlertTriangle } from 'lucide-react';

interface ExpertAdvisoriesProps {
  weather: WeatherData;
}

export default function ExpertAdvisories({ weather }: ExpertAdvisoriesProps) {
  const showFungusRisk = weather.humidity > 80;
  const showAvoidSpray = weather.rainProbability > 60;

  if (!showFungusRisk && !showAvoidSpray) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">Weather-Based Advisories</h3>
      <div className="space-y-2">
        {showFungusRisk && (
          <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Fungus Risk</p>
              <p className="text-xs text-orange-700 dark:text-orange-300">High humidity detected - Apply fungicide preventively</p>
            </div>
          </div>
        )}

        {showAvoidSpray && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">Avoid Spray</p>
              <p className="text-xs text-red-700 dark:text-red-300">Rain expected - Postpone pesticide application</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
