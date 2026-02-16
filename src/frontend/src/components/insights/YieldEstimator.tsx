import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/formatting';

interface YieldEstimatorProps {
  acreage: number;
  cropType: string;
  onEstimate: (acreage: number, cropType: string) => void;
  estimate?: {
    estimatedYield: number;
    unit: string;
    estimatedRevenue: number;
    confidence: string;
  };
}

export default function YieldEstimator({ acreage, cropType, onEstimate, estimate }: YieldEstimatorProps) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Yield Estimation</h3>
      </div>

      {estimate ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Estimated Yield</span>
            <span className="text-sm font-semibold">
              {estimate.estimatedYield} {estimate.unit}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Estimated Revenue</span>
            <span className="text-sm font-semibold text-green-600">{formatCurrency(estimate.estimatedRevenue)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
              {estimate.confidence}
            </span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => onEstimate(acreage, cropType)}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Calculate Estimate
        </button>
      )}
    </div>
  );
}
