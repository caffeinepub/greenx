import React from 'react';
import { SmartAlert } from '../../lib/aiLikeHeuristics';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface SmartAlertsProps {
  alerts: SmartAlert[];
}

export default function SmartAlerts({ alerts }: SmartAlertsProps) {
  if (alerts.length === 0) return null;

  const severityConfig = {
    info: { icon: Info, bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-200' },
    warning: { icon: AlertTriangle, bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-800 dark:text-yellow-200' },
    critical: { icon: AlertCircle, bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-200' },
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">Smart Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div key={alert.id} className={`flex items-start gap-2 p-3 ${config.bg} rounded-lg border ${config.border}`}>
              <Icon className={`h-4 w-4 ${config.text} mt-0.5 flex-shrink-0`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${config.text}`}>{alert.message}</p>
                <p className={`text-xs ${config.text} opacity-80 mt-1`}>{alert.action}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
