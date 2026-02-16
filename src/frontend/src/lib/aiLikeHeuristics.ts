import { SoilInfo } from '../data/demoFarmers';
import { WeatherData } from '../weather/simulatedWeather';

export interface CropHealthPrediction {
  score: number;
  label: string;
  explanation: string;
}

export interface YieldEstimate {
  estimatedYield: number;
  unit: string;
  estimatedRevenue: number;
  confidence: string;
}

export interface SmartAlert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  action: string;
}

export function predictCropHealth(
  soilData: SoilInfo,
  weather: WeatherData,
  currentHealthScore: number
): CropHealthPrediction {
  let adjustedScore = currentHealthScore;
  const factors: string[] = [];

  if (soilData.nitrogen < 40) {
    adjustedScore -= 5;
    factors.push('low nitrogen');
  }
  if (soilData.moisture < 50) {
    adjustedScore -= 8;
    factors.push('low soil moisture');
  }
  if (weather.humidity > 80) {
    adjustedScore -= 6;
    factors.push('high humidity (disease risk)');
  }
  if (weather.rainProbability < 20 && soilData.moisture < 55) {
    adjustedScore -= 7;
    factors.push('drought stress');
  }

  adjustedScore = Math.max(0, Math.min(100, adjustedScore));

  let label = 'Excellent';
  if (adjustedScore < 60) label = 'Poor';
  else if (adjustedScore < 75) label = 'Fair';
  else if (adjustedScore < 85) label = 'Good';

  const explanation =
    factors.length > 0
      ? `Health affected by: ${factors.join(', ')}`
      : 'Optimal conditions - soil and weather favorable';

  return { score: Math.round(adjustedScore), label, explanation };
}

export function estimateYield(
  acreage: number,
  cropType: string,
  soilData: SoilInfo,
  weather: WeatherData
): YieldEstimate {
  const baseYields: Record<string, number> = {
    Paddy: 500,
    Cotton: 180,
    Chilli: 220,
    Maize: 450,
    Groundnut: 280,
    Turmeric: 350,
    Tomato: 600,
    Onion: 550,
    Sugarcane: 4500,
    Banana: 800,
  };

  const basePrices: Record<string, number> = {
    Paddy: 25,
    Cotton: 80,
    Chilli: 82,
    Maize: 21,
    Groundnut: 39,
    Turmeric: 47,
    Tomato: 22,
    Onion: 22,
    Sugarcane: 3.4,
    Banana: 17.5,
  };

  let baseYield = baseYields[cropType] || 300;
  let multiplier = 1.0;

  if (soilData.nitrogen > 50 && soilData.phosphorus > 40) multiplier += 0.15;
  if (soilData.moisture > 65) multiplier += 0.1;
  if (weather.rainProbability > 40 && weather.rainProbability < 70) multiplier += 0.08;
  if (weather.humidity > 85 || weather.rainProbability > 80) multiplier -= 0.12;

  const estimatedYield = Math.round(baseYield * acreage * multiplier);
  const pricePerKg = basePrices[cropType] || 25;
  const estimatedRevenue = Math.round(estimatedYield * pricePerKg);

  const confidence = multiplier > 1.1 ? 'High' : multiplier > 0.95 ? 'Medium' : 'Low';

  return {
    estimatedYield,
    unit: 'kg',
    estimatedRevenue,
    confidence,
  };
}

export function generateSmartAlerts(weather: WeatherData, soilData: SoilInfo): SmartAlert[] {
  const alerts: SmartAlert[] = [];

  if (weather.humidity > 80) {
    alerts.push({
      id: 'alert-humidity',
      severity: 'warning',
      message: 'High humidity detected - Fungal disease risk',
      action: 'Apply fungicide preventively',
    });
  }

  if (weather.rainProbability > 70) {
    alerts.push({
      id: 'alert-rain',
      severity: 'warning',
      message: 'Heavy rain expected - Avoid spraying',
      action: 'Postpone pesticide/fertilizer application',
    });
  }

  if (soilData.moisture < 45) {
    alerts.push({
      id: 'alert-moisture',
      severity: 'critical',
      message: 'Low soil moisture - Irrigation needed',
      action: 'Schedule immediate irrigation',
    });
  }

  if (weather.temperature > 38) {
    alerts.push({
      id: 'alert-heat',
      severity: 'warning',
      message: 'High temperature - Heat stress risk',
      action: 'Ensure adequate irrigation',
    });
  }

  return alerts;
}
