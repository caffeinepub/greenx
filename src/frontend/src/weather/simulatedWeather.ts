export type WeatherStatus = 'good' | 'moderateRisk' | 'highRisk';

export interface WeatherData {
  temperature: number;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
  weatherAlert: string;
  status: WeatherStatus;
}

const VILLAGE_SEEDS: Record<string, number> = {
  Kothapalli: 123,
  Ramapuram: 456,
  Anantapur: 789,
  Guntur: 234,
  Nellore: 567,
  Warangal: 890,
  Karimnagar: 345,
  Nizamabad: 678,
  Khammam: 901,
  Medak: 432,
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getSimulatedWeather(village: string, dayOffset: number = 0): WeatherData {
  const baseSeed = VILLAGE_SEEDS[village] || 500;
  const seed = baseSeed + dayOffset * 7;

  const temp = 22 + seededRandom(seed) * 18;
  const rain = seededRandom(seed + 1) * 100;
  const humidity = 40 + seededRandom(seed + 2) * 50;
  const wind = 5 + seededRandom(seed + 3) * 20;

  let status: WeatherStatus = 'good';
  let alert = 'Normal conditions';

  if (humidity > 80 || rain > 70) {
    status = 'highRisk';
    alert = 'High humidity/rain - Disease risk';
  } else if (humidity > 65 || rain > 50 || temp > 38) {
    status = 'moderateRisk';
    alert = 'Monitor conditions closely';
  }

  return {
    temperature: Math.round(temp * 10) / 10,
    rainProbability: Math.round(rain),
    humidity: Math.round(humidity),
    windSpeed: Math.round(wind * 10) / 10,
    weatherAlert: alert,
    status,
  };
}
