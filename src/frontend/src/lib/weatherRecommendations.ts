import { WeatherData } from '../weather/simulatedWeather';

export interface WeatherRecommendations {
  spray: 'Yes' | 'No';
  irrigation: string;
  pestRisk: 'Low' | 'Medium' | 'High';
}

export function getWeatherRecommendations(weather: WeatherData): WeatherRecommendations {
  const spray = weather.rainProbability > 60 || weather.humidity > 85 ? 'No' : 'Yes';

  let irrigation = 'Normal schedule';
  if (weather.rainProbability > 70) {
    irrigation = 'Skip irrigation - sufficient rain expected';
  } else if (weather.rainProbability < 20 && weather.humidity < 50) {
    irrigation = 'Increase irrigation frequency';
  }

  let pestRisk: 'Low' | 'Medium' | 'High' = 'Low';
  if (weather.humidity > 75 && weather.temperature > 28) {
    pestRisk = 'High';
  } else if (weather.humidity > 60 || weather.temperature > 32) {
    pestRisk = 'Medium';
  }

  return { spray, irrigation, pestRisk };
}
