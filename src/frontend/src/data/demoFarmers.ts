import { CropType } from '../backend';

export interface WorkerInfo {
  id: string;
  name: string;
  phone: string;
  role: string;
}

export interface InputProduct {
  id: string;
  name: string;
  category: 'Pesticide' | 'Fertilizer' | 'Herbicide';
  company: string;
  cost: number;
  dateApplied: string;
  quantity: number;
  unit: string;
}

export interface DroneSprayLog {
  id: string;
  droneName: string;
  flightTime: number; // in minutes
  acresSpayed: number;
  cost: number;
  date: string;
  productApplied: string;
}

export interface DemoFarmer {
  id: string;
  name: string;
  village: string;
  totalLand: number;
  crop: CropType;
  cropName: string;
  growthStage: string;
  expectedRevenue: number;
  profitShare: number;
  cropHealthScore: number;
  paymentHistory: PaymentRecord[];
  contractSummary: string;
  soilData: SoilInfo;
  tasks: TaskInfo[];
  workers: WorkerInfo[];
  inputsUsed: InputProduct[];
  droneSprayLogs: DroneSprayLog[];
}

export interface PaymentRecord {
  date: string;
  amount: number;
  description: string;
}

export interface SoilInfo {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  texture: string;
}

export interface TaskInfo {
  id: string;
  name: string;
  status: 'pending' | 'inProgress' | 'completed';
  deadline: string;
}

export const DEMO_FARMERS: DemoFarmer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    village: 'Kothapalli',
    totalLand: 10,
    crop: CropType.paddy,
    cropName: 'Paddy',
    growthStage: 'Flowering',
    expectedRevenue: 125000,
    profitShare: 65,
    cropHealthScore: 87,
    paymentHistory: [
      { date: '2026-01-15', amount: 25000, description: 'Advance Payment' },
      { date: '2025-12-10', amount: 30000, description: 'Seed & Fertilizer' },
    ],
    contractSummary: '1-year contract, 65% profit share, GreenX provides inputs',
    soilData: {
      ph: 6.8,
      moisture: 72,
      nitrogen: 45,
      phosphorus: 38,
      potassium: 42,
      organicMatter: 3.2,
      texture: 'Clay Loam',
    },
    tasks: [
      { id: 't1', name: 'Apply Fertilizer', status: 'pending', deadline: '2026-02-20' },
      { id: 't2', name: 'Pest Inspection', status: 'inProgress', deadline: '2026-02-18' },
    ],
    workers: [
      { id: 'w1', name: 'Suresh Reddy', phone: '+91 98765 43210', role: 'Field Worker' },
      { id: 'w2', name: 'Ramesh Naidu', phone: '+91 98765 43211', role: 'Irrigation Specialist' },
    ],
    inputsUsed: [
      { id: 'inp1', name: 'NPK 20-20-20', category: 'Fertilizer', company: 'Coromandel', cost: 1200, dateApplied: '2026-01-10', quantity: 50, unit: 'kg' },
      { id: 'inp2', name: 'Chlorpyrifos', category: 'Pesticide', company: 'Bayer', cost: 850, dateApplied: '2026-01-25', quantity: 2, unit: 'liters' },
      { id: 'inp3', name: 'Urea', category: 'Fertilizer', company: 'IFFCO', cost: 600, dateApplied: '2026-02-05', quantity: 40, unit: 'kg' },
    ],
    droneSprayLogs: [
      { id: 'ds1', droneName: 'AgriDrone X1', flightTime: 45, acresSpayed: 10, cost: 2500, date: '2026-01-25', productApplied: 'Chlorpyrifos' },
      { id: 'ds2', droneName: 'AgriDrone X1', flightTime: 38, acresSpayed: 10, cost: 2200, date: '2026-02-08', productApplied: 'Fungicide Mix' },
    ],
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    village: 'Ramapuram',
    totalLand: 10,
    crop: CropType.cotton,
    cropName: 'Cotton',
    growthStage: 'Boll Formation',
    expectedRevenue: 145000,
    profitShare: 70,
    cropHealthScore: 92,
    paymentHistory: [
      { date: '2026-01-20', amount: 28000, description: 'Advance Payment' },
    ],
    contractSummary: '1-year contract, 70% profit share, premium quality cotton',
    soilData: {
      ph: 7.2,
      moisture: 58,
      nitrogen: 52,
      phosphorus: 44,
      potassium: 48,
      organicMatter: 2.8,
      texture: 'Sandy Loam',
    },
    tasks: [
      { id: 't3', name: 'Irrigation Check', status: 'completed', deadline: '2026-02-15' },
    ],
    workers: [
      { id: 'w3', name: 'Venkat Rao', phone: '+91 98765 43212', role: 'Field Worker' },
    ],
    inputsUsed: [
      { id: 'inp4', name: 'DAP', category: 'Fertilizer', company: 'Coromandel', cost: 1400, dateApplied: '2026-01-12', quantity: 60, unit: 'kg' },
      { id: 'inp5', name: 'Imidacloprid', category: 'Pesticide', company: 'Syngenta', cost: 950, dateApplied: '2026-01-28', quantity: 1.5, unit: 'liters' },
    ],
    droneSprayLogs: [
      { id: 'ds3', droneName: 'AgriDrone X2', flightTime: 42, acresSpayed: 10, cost: 2400, date: '2026-01-28', productApplied: 'Imidacloprid' },
    ],
  },
  {
    id: '3',
    name: 'Venkat Reddy',
    village: 'Anantapur',
    totalLand: 10,
    crop: CropType.chilli,
    cropName: 'Chilli',
    growthStage: 'Fruiting',
    expectedRevenue: 180000,
    profitShare: 68,
    cropHealthScore: 78,
    paymentHistory: [
      { date: '2026-02-01', amount: 35000, description: 'Mid-season Payment' },
      { date: '2026-01-05', amount: 25000, description: 'Initial Advance' },
    ],
    contractSummary: '1-year contract, 68% profit share, export quality chilli',
    soilData: {
      ph: 6.5,
      moisture: 65,
      nitrogen: 48,
      phosphorus: 40,
      potassium: 55,
      organicMatter: 3.5,
      texture: 'Loamy',
    },
    tasks: [
      { id: 't4', name: 'Spray Pesticide', status: 'pending', deadline: '2026-02-22' },
    ],
    workers: [
      { id: 'w4', name: 'Krishna Murthy', phone: '+91 98765 43213', role: 'Field Worker' },
      { id: 'w5', name: 'Srinivas Babu', phone: '+91 98765 43214', role: 'Pest Control Specialist' },
    ],
    inputsUsed: [
      { id: 'inp6', name: 'Potash', category: 'Fertilizer', company: 'IFFCO', cost: 1100, dateApplied: '2026-01-15', quantity: 45, unit: 'kg' },
      { id: 'inp7', name: 'Mancozeb', category: 'Pesticide', company: 'UPL', cost: 780, dateApplied: '2026-02-01', quantity: 2.5, unit: 'kg' },
      { id: 'inp8', name: 'Micronutrient Mix', category: 'Fertilizer', company: 'Rallis', cost: 650, dateApplied: '2026-02-10', quantity: 10, unit: 'kg' },
    ],
    droneSprayLogs: [
      { id: 'ds4', droneName: 'AgriDrone X1', flightTime: 50, acresSpayed: 10, cost: 2600, date: '2026-02-01', productApplied: 'Mancozeb' },
    ],
  },
  {
    id: '4',
    name: 'Suresh Naidu',
    village: 'Guntur',
    totalLand: 10,
    crop: CropType.maize,
    cropName: 'Maize',
    growthStage: 'Vegetative',
    expectedRevenue: 95000,
    profitShare: 62,
    cropHealthScore: 85,
    paymentHistory: [
      { date: '2026-01-25', amount: 20000, description: 'Seed Purchase' },
    ],
    contractSummary: '1-year contract, 62% profit share, hybrid maize variety',
    soilData: {
      ph: 6.9,
      moisture: 68,
      nitrogen: 50,
      phosphorus: 42,
      potassium: 45,
      organicMatter: 3.0,
      texture: 'Silty Loam',
    },
    tasks: [
      { id: 't5', name: 'Weed Control', status: 'inProgress', deadline: '2026-02-19' },
    ],
    workers: [
      { id: 'w6', name: 'Ravi Kumar', phone: '+91 98765 43215', role: 'Field Worker' },
    ],
    inputsUsed: [
      { id: 'inp9', name: 'Atrazine', category: 'Herbicide', company: 'Syngenta', cost: 720, dateApplied: '2026-01-20', quantity: 1.8, unit: 'liters' },
      { id: 'inp10', name: 'NPK 12-32-16', category: 'Fertilizer', company: 'Coromandel', cost: 1350, dateApplied: '2026-02-02', quantity: 55, unit: 'kg' },
    ],
    droneSprayLogs: [
      { id: 'ds5', droneName: 'AgriDrone X2', flightTime: 40, acresSpayed: 10, cost: 2300, date: '2026-01-20', productApplied: 'Atrazine' },
    ],
  },
  {
    id: '5',
    name: 'Manjula Rao',
    village: 'Nellore',
    totalLand: 10,
    crop: CropType.groundnut,
    cropName: 'Groundnut',
    growthStage: 'Pegging',
    expectedRevenue: 110000,
    profitShare: 66,
    cropHealthScore: 90,
    paymentHistory: [
      { date: '2026-02-05', amount: 22000, description: 'Fertilizer Payment' },
    ],
    contractSummary: '1-year contract, 66% profit share, oil-grade groundnut',
    soilData: {
      ph: 6.7,
      moisture: 60,
      nitrogen: 46,
      phosphorus: 39,
      potassium: 50,
      organicMatter: 2.9,
      texture: 'Sandy Clay',
    },
    tasks: [
      { id: 't6', name: 'Soil Testing', status: 'completed', deadline: '2026-02-10' },
    ],
    workers: [
      { id: 'w7', name: 'Prasad Reddy', phone: '+91 98765 43216', role: 'Field Worker' },
    ],
    inputsUsed: [
      { id: 'inp11', name: 'Gypsum', category: 'Fertilizer', company: 'Zuari', cost: 800, dateApplied: '2026-01-18', quantity: 70, unit: 'kg' },
      { id: 'inp12', name: 'Thiamethoxam', category: 'Pesticide', company: 'Bayer', cost: 890, dateApplied: '2026-02-03', quantity: 0.5, unit: 'kg' },
    ],
    droneSprayLogs: [
      { id: 'ds6', droneName: 'AgriDrone X1', flightTime: 35, acresSpayed: 10, cost: 2100, date: '2026-02-03', productApplied: 'Thiamethoxam' },
    ],
  },
  {
    id: '6',
    name: 'Krishna Murthy',
    village: 'Warangal',
    totalLand: 10,
    crop: CropType.turmeric,
    cropName: 'Turmeric',
    growthStage: 'Rhizome Development',
    expectedRevenue: 165000,
    profitShare: 72,
    cropHealthScore: 88,
    paymentHistory: [
      { date: '2026-01-30', amount: 32000, description: 'Advance Payment' },
    ],
    contractSummary: '1-year contract, 72% profit share, organic turmeric',
    soilData: {
      ph: 6.6,
      moisture: 75,
      nitrogen: 55,
      phosphorus: 46,
      potassium: 52,
      organicMatter: 4.1,
      texture: 'Clay Loam',
    },
    tasks: [
      { id: 't7', name: 'Mulching', status: 'pending', deadline: '2026-02-25' },
    ],
    workers: [
      { id: 'w8', name: 'Naresh Kumar', phone: '+91 98765 43217', role: 'Field Worker' },
      { id: 'w9', name: 'Mahesh Babu', phone: '+91 98765 43218', role: 'Organic Specialist' },
    ],
    inputsUsed: [
      { id: 'inp13', name: 'Organic Compost', category: 'Fertilizer', company: 'Local Co-op', cost: 950, dateApplied: '2026-01-22', quantity: 200, unit: 'kg' },
      { id: 'inp14', name: 'Neem Oil', category: 'Pesticide', company: 'Organic India', cost: 680, dateApplied: '2026-02-06', quantity: 3, unit: 'liters' },
    ],
    droneSprayLogs: [
      { id: 'ds7', droneName: 'AgriDrone X2', flightTime: 48, acresSpayed: 10, cost: 2500, date: '2026-02-06', productApplied: 'Neem Oil' },
    ],
  },
  {
    id: '7',
    name: 'Padma Latha',
    village: 'Karimnagar',
    totalLand: 10,
    crop: CropType.tomato,
    cropName: 'Tomato',
    growthStage: 'Flowering',
    expectedRevenue: 135000,
    profitShare: 64,
    cropHealthScore: 82,
    paymentHistory: [
      { date: '2026-02-08', amount: 27000, description: 'Input Costs' },
    ],
    contractSummary: '1-year contract, 64% profit share, hybrid tomato',
    soilData: {
      ph: 6.4,
      moisture: 70,
      nitrogen: 49,
      phosphorus: 41,
      potassium: 47,
      organicMatter: 3.3,
      texture: 'Loamy',
    },
    tasks: [
      { id: 't8', name: 'Staking Plants', status: 'inProgress', deadline: '2026-02-17' },
    ],
    workers: [
      { id: 'w10', name: 'Anand Rao', phone: '+91 98765 43219', role: 'Field Worker' },
    ],
    inputsUsed: [
      { id: 'inp15', name: 'Calcium Nitrate', category: 'Fertilizer', company: 'Yara', cost: 1250, dateApplied: '2026-01-28', quantity: 35, unit: 'kg' },
      { id: 'inp16', name: 'Azoxystrobin', category: 'Pesticide', company: 'Syngenta', cost: 1100, dateApplied: '2026-02-09', quantity: 0.8, unit: 'liters' },
    ],
    droneSprayLogs: [
      { id: 'ds8', droneName: 'AgriDrone X1', flightTime: 43, acresSpayed: 10, cost: 2450, date: '2026-02-09', productApplied: 'Azoxystrobin' },
    ],
  },
  {
    id: '8',
    name: 'Ramesh Babu',
    village: 'Nizamabad',
    totalLand: 10,
    crop: CropType.onion,
    cropName: 'Onion',
    growthStage: 'Bulb Formation',
    expectedRevenue: 120000,
    profitShare: 63,
    cropHealthScore: 86,
    paymentHistory: [
      { date: '2026-01-18', amount: 24000, description: 'Seed & Fertilizer' },
    ],
    contractSummary: '1-year contract, 63% profit share, red onion variety',
    soilData: {
      ph: 6.8,
      moisture: 62,
      nitrogen: 47,
      phosphorus: 40,
      potassium: 49,
      organicMatter: 2.7,
      texture: 'Sandy Loam',
    },
    tasks: [
      { id: 't9', name: 'Irrigation', status: 'pending', deadline: '2026-02-21' },
    ],
    workers: [
      { id: 'w11', name: 'Vijay Kumar', phone: '+91 98765 43220', role: 'Field Worker' },
    ],
    inputsUsed: [
      { id: 'inp17', name: 'Sulphur', category: 'Fertilizer', company: 'Deepak', cost: 580, dateApplied: '2026-01-16', quantity: 30, unit: 'kg' },
      { id: 'inp18', name: 'Carbendazim', category: 'Pesticide', company: 'UPL', cost: 720, dateApplied: '2026-02-02', quantity: 1.2, unit: 'kg' },
    ],
    droneSprayLogs: [
      { id: 'ds9', droneName: 'AgriDrone X2', flightTime: 37, acresSpayed: 10, cost: 2200, date: '2026-02-02', productApplied: 'Carbendazim' },
    ],
  },
  {
    id: '9',
    name: 'Srinivas Rao',
    village: 'Khammam',
    totalLand: 10,
    crop: CropType.sugarCane,
    cropName: 'Sugarcane',
    growthStage: 'Tillering',
    expectedRevenue: 155000,
    profitShare: 69,
    cropHealthScore: 91,
    paymentHistory: [
      { date: '2026-02-02', amount: 30000, description: 'Advance Payment' },
    ],
    contractSummary: '1-year contract, 69% profit share, high-yield variety',
    soilData: {
      ph: 7.0,
      moisture: 78,
      nitrogen: 53,
      phosphorus: 45,
      potassium: 51,
      organicMatter: 3.8,
      texture: 'Clay',
    },
    tasks: [
      { id: 't10', name: 'Fertilizer Application', status: 'completed', deadline: '2026-02-12' },
    ],
    workers: [
      { id: 'w12', name: 'Balaji Reddy', phone: '+91 98765 43221', role: 'Field Worker' },
      { id: 'w13', name: 'Kiran Kumar', phone: '+91 98765 43222', role: 'Irrigation Specialist' },
    ],
    inputsUsed: [
      { id: 'inp19', name: 'NPK 15-15-15', category: 'Fertilizer', company: 'Coromandel', cost: 1450, dateApplied: '2026-01-24', quantity: 80, unit: 'kg' },
      { id: 'inp20', name: 'Glyphosate', category: 'Herbicide', company: 'Monsanto', cost: 820, dateApplied: '2026-02-07', quantity: 2.5, unit: 'liters' },
    ],
    droneSprayLogs: [
      { id: 'ds10', droneName: 'AgriDrone X1', flightTime: 52, acresSpayed: 10, cost: 2700, date: '2026-02-07', productApplied: 'Glyphosate' },
    ],
  },
  {
    id: '10',
    name: 'Geetha Reddy',
    village: 'Medak',
    totalLand: 10,
    crop: CropType.banana,
    cropName: 'Banana',
    growthStage: 'Bunch Development',
    expectedRevenue: 140000,
    profitShare: 67,
    cropHealthScore: 89,
    paymentHistory: [
      { date: '2026-01-28', amount: 28000, description: 'Input Costs' },
    ],
    contractSummary: '1-year contract, 67% profit share, premium banana',
    soilData: {
      ph: 6.5,
      moisture: 80,
      nitrogen: 51,
      phosphorus: 43,
      potassium: 54,
      organicMatter: 4.0,
      texture: 'Loamy Clay',
    },
    tasks: [
      { id: 't11', name: 'Pest Control', status: 'pending', deadline: '2026-02-23' },
    ],
    workers: [
      { id: 'w14', name: 'Rajesh Naidu', phone: '+91 98765 43223', role: 'Field Worker' },
    ],
    inputsUsed: [
      { id: 'inp21', name: 'Potassium Sulphate', category: 'Fertilizer', company: 'SQM', cost: 1550, dateApplied: '2026-01-26', quantity: 50, unit: 'kg' },
      { id: 'inp22', name: 'Emamectin Benzoate', category: 'Pesticide', company: 'FMC', cost: 980, dateApplied: '2026-02-11', quantity: 0.6, unit: 'kg' },
    ],
    droneSprayLogs: [
      { id: 'ds11', droneName: 'AgriDrone X2', flightTime: 46, acresSpayed: 10, cost: 2550, date: '2026-02-11', productApplied: 'Emamectin Benzoate' },
    ],
  },
];
