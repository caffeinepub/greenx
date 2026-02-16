import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, AlertTriangle } from 'lucide-react';
import { WeatherData } from '../../weather/simulatedWeather';

interface WeatherPanelProps {
  weather: WeatherData;
  showExtended?: boolean;
}

export default function WeatherPanel({ weather, showExtended = false }: WeatherPanelProps) {
  const statusColors = {
    good: 'bg-green-500',
    moderateRisk: 'bg-yellow-500',
    highRisk: 'bg-red-500',
  };

  const statusLabels = {
    good: 'Good',
    moderateRisk: 'Moderate Risk',
    highRisk: 'High Risk',
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Weather Conditions</h3>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${statusColors[weather.status]}`} />
          <span className="text-xs font-medium">{statusLabels[weather.status]}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs text-muted-foreground">Temperature</p>
            <p className="text-sm font-semibold">{weather.temperature}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-xs text-muted-foreground">Rain</p>
            <p className="text-sm font-semibold">{weather.rainProbability}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-semibold">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-teal-500" />
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>

      {weather.status !== 'good' && (
        <div className="flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-800 dark:text-yellow-200">{weather.weatherAlert}</p>
        </div>
      )}
    </div>
  );
}
