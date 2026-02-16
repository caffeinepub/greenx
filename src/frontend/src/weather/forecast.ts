import { getSimulatedWeather, WeatherData } from './simulatedWeather';

export interface DailyForecast extends WeatherData {
  date: string;
  day: string;
}

export function get7DayForecast(village: string): DailyForecast[] {
  const forecast: DailyForecast[] = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const weather = getSimulatedWeather(village, i);

    forecast.push({
      ...weather,
      date: date.toISOString().split('T')[0],
      day: days[date.getDay()],
    });
  }

  return forecast;
}
