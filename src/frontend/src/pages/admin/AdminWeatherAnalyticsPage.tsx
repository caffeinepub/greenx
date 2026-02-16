import React from 'react';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { DEMO_YIELD } from '../../data/demoYield';
import { getSimulatedWeather } from '../../weather/simulatedWeather';

export default function AdminWeatherAnalyticsPage() {
  const weatherByVillage = DEMO_FARMERS.map(f => ({
    village: f.village,
    weather: getSimulatedWeather(f.village),
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Weather Analytics</h1>
        <p className="text-muted-foreground mt-1">Weather patterns and agricultural insights</p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">District Weather Map</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {weatherByVillage.map((item, idx) => {
            const statusColors = {
              good: 'bg-green-500',
              moderateRisk: 'bg-yellow-500',
              highRisk: 'bg-red-500',
            };
            return (
              <div key={idx} className="p-4 bg-muted/50 rounded-lg text-center">
                <div className={`h-3 w-3 rounded-full ${statusColors[item.weather.status]} mx-auto mb-2`} />
                <p className="font-semibold text-sm">{item.village}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.weather.temperature}°C</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Rainfall vs Yield</h3>
        <div className="space-y-2">
          {DEMO_YIELD.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium">{item.crop}</div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full flex items-center justify-end pr-2"
                    style={{ width: `${(item.rainfall / 1200) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">{item.rainfall}mm</span>
                  </div>
                </div>
                <div className="w-24 text-sm text-muted-foreground">{item.expectedYield} {item.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Pest Risk Heat Map</h3>
        <div className="grid grid-cols-5 gap-2">
          {weatherByVillage.map((item, idx) => {
            const riskLevel = item.weather.humidity > 75 ? 'high' : item.weather.humidity > 60 ? 'medium' : 'low';
            const riskColors = {
              low: 'bg-green-200 dark:bg-green-900/40',
              medium: 'bg-yellow-200 dark:bg-yellow-900/40',
              high: 'bg-red-200 dark:bg-red-900/40',
            };
            return (
              <div key={idx} className={`p-3 ${riskColors[riskLevel]} rounded-lg text-center`}>
                <p className="text-xs font-semibold">{item.village}</p>
                <p className="text-xs mt-1 capitalize">{riskLevel}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-green-200 dark:bg-green-900/40 rounded" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-yellow-200 dark:bg-yellow-900/40 rounded" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-red-200 dark:bg-red-900/40 rounded" />
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
