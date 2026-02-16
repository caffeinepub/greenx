export interface YieldData {
  farmerId: string;
  crop: string;
  village: string;
  expectedYield: number;
  unit: string;
  rainfall: number;
}

export const DEMO_YIELD: YieldData[] = [
  { farmerId: '1', crop: 'Paddy', village: 'Kothapalli', expectedYield: 5000, unit: 'kg', rainfall: 850 },
  { farmerId: '2', crop: 'Cotton', village: 'Ramapuram', expectedYield: 1800, unit: 'kg', rainfall: 620 },
  { farmerId: '3', crop: 'Chilli', village: 'Anantapur', expectedYield: 2200, unit: 'kg', rainfall: 580 },
  { farmerId: '4', crop: 'Maize', village: 'Guntur', expectedYield: 4500, unit: 'kg', rainfall: 720 },
  { farmerId: '5', crop: 'Groundnut', village: 'Nellore', expectedYield: 2800, unit: 'kg', rainfall: 680 },
  { farmerId: '6', crop: 'Turmeric', village: 'Warangal', expectedYield: 3500, unit: 'kg', rainfall: 920 },
  { farmerId: '7', crop: 'Tomato', village: 'Karimnagar', expectedYield: 6000, unit: 'kg', rainfall: 780 },
  { farmerId: '8', crop: 'Onion', village: 'Nizamabad', expectedYield: 5500, unit: 'kg', rainfall: 650 },
  { farmerId: '9', crop: 'Sugarcane', village: 'Khammam', expectedYield: 45000, unit: 'kg', rainfall: 1100 },
  { farmerId: '10', crop: 'Banana', village: 'Medak', expectedYield: 8000, unit: 'kg', rainfall: 950 },
];
