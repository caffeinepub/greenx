import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from '@tanstack/react-router';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { getSimulatedWeather } from '../../weather/simulatedWeather';
import { predictCropHealth, estimateYield, generateSmartAlerts } from '../../lib/aiLikeHeuristics';
import { formatCurrency, formatPercent, formatDuration } from '../../lib/formatting';
import TopBar from '../../components/TopBar';
import AgriTechBanner from '../../components/AgriTechBanner';
import WeatherPanel from '../../components/weather/WeatherPanel';
import CropHealthPredictionPanel from '../../components/insights/CropHealthPredictionPanel';
import YieldEstimator from '../../components/insights/YieldEstimator';
import SmartAlerts from '../../components/insights/SmartAlerts';
import { FileText, MessageSquare, Calendar, Phone, Package, Plane } from 'lucide-react';

export default function LandOwnerDashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [selectedFarmerId, setSelectedFarmerId] = useState('1');
  const [yieldEstimate, setYieldEstimate] = useState<any>(null);

  if (!session || session.role !== 'landOwner') {
    navigate({ to: '/access-denied' });
    return null;
  }

  const farmer = DEMO_FARMERS.find(f => f.id === selectedFarmerId) || DEMO_FARMERS[0];
  const weather = getSimulatedWeather(farmer.village);
  const healthPrediction = predictCropHealth(farmer.soilData, weather, farmer.cropHealthScore);
  const alerts = generateSmartAlerts(weather, farmer.soilData);

  const handleEstimate = (acreage: number, cropType: string) => {
    const estimate = estimateYield(acreage, cropType, farmer.soilData, weather);
    setYieldEstimate(estimate);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <AgriTechBanner />

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <label className="block text-xs font-medium text-muted-foreground mb-2">Select Farmer</label>
          <select
            value={selectedFarmerId}
            onChange={(e) => {
              setSelectedFarmerId(e.target.value);
              setYieldEstimate(null);
            }}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
          >
            {DEMO_FARMERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} - {f.village} ({f.cropName})
              </option>
            ))}
          </select>
        </div>

        <WeatherPanel weather={weather} />

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Farm Overview</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Farmer Name</span>
              <span className="text-sm font-semibold">{farmer.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Village</span>
              <span className="text-sm font-semibold">{farmer.village}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Land</span>
              <span className="text-sm font-semibold">{farmer.totalLand} Acres</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Crop</span>
              <span className="text-sm font-semibold">{farmer.cropName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Growth Stage</span>
              <span className="text-sm font-semibold">{farmer.growthStage}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expected Revenue</span>
              <span className="text-sm font-semibold text-green-600">{formatCurrency(farmer.expectedRevenue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Profit Share</span>
              <span className="text-sm font-semibold">{formatPercent(farmer.profitShare)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Crop Health Score</span>
              <span className="text-sm font-semibold">{farmer.cropHealthScore}/100</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Workers</h3>
          </div>
          {farmer.workers.length > 0 ? (
            <div className="space-y-3">
              {farmer.workers.map((worker) => (
                <div key={worker.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{worker.name}</p>
                      <p className="text-xs text-muted-foreground">{worker.role}</p>
                    </div>
                    <a href={`tel:${worker.phone}`} className="text-xs text-primary hover:underline font-medium">
                      {worker.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No workers assigned yet.</p>
          )}
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Inputs / Products Used</h3>
          </div>
          {farmer.inputsUsed.length > 0 ? (
            <div className="space-y-3">
              {farmer.inputsUsed.map((input) => (
                <div key={input.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{input.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {input.category} • {input.company}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{formatCurrency(input.cost)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                    <span>{input.quantity} {input.unit}</span>
                    <span>Applied: {input.dateApplied}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No inputs recorded yet.</p>
          )}
        </div>

        <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Plane className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Drone Spraying Logs</h3>
          </div>
          {farmer.droneSprayLogs.length > 0 ? (
            <div className="space-y-3">
              {farmer.droneSprayLogs.map((log) => (
                <div key={log.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{log.droneName}</p>
                      <p className="text-xs text-muted-foreground">Product: {log.productApplied}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{formatCurrency(log.cost)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span className="block font-medium text-foreground">Flight Time</span>
                      <span>{formatDuration(log.flightTime)}</span>
                    </div>
                    <div>
                      <span className="block font-medium text-foreground">Acres Sprayed</span>
                      <span>{log.acresSpayed} acres</span>
                    </div>
                    <div>
                      <span className="block font-medium text-foreground">Date</span>
                      <span>{log.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No drone spraying logs yet.</p>
          )}
        </div>

        <CropHealthPredictionPanel prediction={healthPrediction} />

        <YieldEstimator
          acreage={farmer.totalLand}
          cropType={farmer.cropName}
          onEstimate={handleEstimate}
          estimate={yieldEstimate}
        />

        <SmartAlerts alerts={alerts} />

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Payment History</h3>
          <div className="space-y-2">
            {farmer.paymentHistory.map((payment, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{payment.description}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">{formatCurrency(payment.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-2">Contract Summary</h3>
          <p className="text-sm text-muted-foreground">{farmer.contractSummary}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate({ to: '/land-owner/reports' })}
            className="flex flex-col items-center gap-2 p-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            <FileText className="h-8 w-8" />
            <span className="text-xs font-medium">Reports</span>
          </button>
          <button
            onClick={() => navigate({ to: '/land-owner/support' })}
            className="flex flex-col items-center gap-2 p-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            <MessageSquare className="h-8 w-8" />
            <span className="text-xs font-medium">Support</span>
          </button>
          <button
            onClick={() => navigate({ to: '/land-owner/timeline' })}
            className="flex flex-col items-center gap-2 p-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            <Calendar className="h-8 w-8" />
            <span className="text-xs font-medium">Timeline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
