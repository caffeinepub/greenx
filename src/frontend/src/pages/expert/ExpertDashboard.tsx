import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from '@tanstack/react-router';
import { DEMO_FARMERS } from '../../data/demoFarmers';
import { getSimulatedWeather } from '../../weather/simulatedWeather';
import { generatePrescription } from '../../lib/prescriptions';
import { predictCropHealth, generateSmartAlerts } from '../../lib/aiLikeHeuristics';
import TopBar from '../../components/TopBar';
import AgriTechBanner from '../../components/AgriTechBanner';
import WeatherPanel from '../../components/weather/WeatherPanel';
import ExpertAdvisories from '../../components/weather/ExpertAdvisories';
import CropHealthPredictionPanel from '../../components/insights/CropHealthPredictionPanel';
import SmartAlerts from '../../components/insights/SmartAlerts';
import { FileText, AlertTriangle } from 'lucide-react';

export default function ExpertDashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [selectedFarmerId, setSelectedFarmerId] = useState('1');
  const [prescription, setPrescription] = useState<any>(null);

  if (!session || session.role !== 'expert') {
    navigate({ to: '/access-denied' });
    return null;
  }

  const farmer = DEMO_FARMERS.find(f => f.id === selectedFarmerId) || DEMO_FARMERS[0];
  const weather = getSimulatedWeather(farmer.village);
  const healthPrediction = predictCropHealth(farmer.soilData, weather, farmer.cropHealthScore);
  const alerts = generateSmartAlerts(weather, farmer.soilData);

  const handleGeneratePrescription = () => {
    const rx = generatePrescription(farmer.soilData, weather, farmer.cropName);
    setPrescription(rx);
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
              setPrescription(null);
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
        <ExpertAdvisories weather={weather} />
        <CropHealthPredictionPanel prediction={healthPrediction} />
        <SmartAlerts alerts={alerts} />

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Soil Test Report</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">pH Level</span>
              <span className="font-semibold">{farmer.soilData.ph}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Nitrogen (N)</span>
              <span className="font-semibold">{farmer.soilData.nitrogen}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Phosphorus (P)</span>
              <span className="font-semibold">{farmer.soilData.phosphorus}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Potassium (K)</span>
              <span className="font-semibold">{farmer.soilData.potassium}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Organic Matter</span>
              <span className="font-semibold">{farmer.soilData.organicMatter}%</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">Moisture</span>
              <span className="font-semibold">{farmer.soilData.moisture}%</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Risk Assessment</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span className="text-sm">Pest Risk</span>
              <span className="text-xs font-bold px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded">
                Medium
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span className="text-sm">Disease Prediction</span>
              <span className="text-xs font-bold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                Low
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span className="text-sm">Humidity Level</span>
              <span className="text-sm font-semibold">{weather.humidity}%</span>
            </div>
          </div>
        </div>

        {!prescription ? (
          <button
            onClick={handleGeneratePrescription}
            className="w-full py-4 px-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <FileText className="h-6 w-6" />
            Generate Prescription
          </button>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Prescription Generated
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-green-700 dark:text-green-300 mb-1">Recommended Fertilizer</p>
                <p className="font-semibold text-green-900 dark:text-green-100">{prescription.fertilizer}</p>
              </div>
              <div>
                <p className="text-xs text-green-700 dark:text-green-300 mb-1">Dosage</p>
                <p className="font-semibold text-green-900 dark:text-green-100">{prescription.dosage}</p>
              </div>
              <div>
                <p className="text-xs text-green-700 dark:text-green-300 mb-1">Application Method</p>
                <p className="font-semibold text-green-900 dark:text-green-100">{prescription.application}</p>
              </div>
              <div>
                <p className="text-xs text-green-700 dark:text-green-300 mb-1">Notes</p>
                <p className="text-xs text-green-800 dark:text-green-200">{prescription.notes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
