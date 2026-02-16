import { SoilInfo } from '../data/demoFarmers';
import { WeatherData } from '../weather/simulatedWeather';

export interface Prescription {
  fertilizer: string;
  dosage: string;
  application: string;
  notes: string;
}

export function generatePrescription(soilData: SoilInfo, weather: WeatherData, cropName: string): Prescription {
  let fertilizer = 'NPK 20-20-20';
  let dosage = '50 kg/acre';
  let application = 'Apply in split doses';
  let notes = 'Standard recommendation';

  if (soilData.nitrogen < 45) {
    fertilizer = 'Urea + NPK 10-26-26';
    dosage = '60 kg/acre (40 kg Urea + 20 kg NPK)';
    notes = 'Low nitrogen detected - boost required';
  } else if (soilData.phosphorus < 35) {
    fertilizer = 'DAP + Potash';
    dosage = '55 kg/acre';
    notes = 'Phosphorus deficiency - use DAP';
  } else if (soilData.potassium < 40) {
    fertilizer = 'Muriate of Potash + NPK';
    dosage = '45 kg/acre';
    notes = 'Potassium boost needed';
  }

  if (weather.humidity > 80) {
    application = 'Delay application until humidity drops';
    notes += ' | High humidity - fungal risk';
  } else if (weather.rainProbability > 60) {
    application = 'Wait for rain to pass, then apply';
    notes += ' | Rain expected - avoid wastage';
  }

  return { fertilizer, dosage, application, notes };
}
