import React from 'react';
import { DailyForecast } from '../../weather/forecast';
import { Thermometer, Droplets } from 'lucide-react';

interface Forecast7DayProps {
  forecast: DailyForecast[];
}

export default function Forecast7Day({ forecast }: Forecast7DayProps) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">7-Day Forecast</h3>
      <div className="space-y-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12">
                <p className="text-xs font-medium">{day.day}</p>
                <p className="text-xs text-muted-foreground">{day.date.slice(5)}</p>
              </div>
              <div className="flex items-center gap-1">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">{day.temperature}°C</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">{day.rainProbability}%</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              H: {day.humidity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
