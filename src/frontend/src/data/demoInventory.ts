export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  location?: string;
}

export const DEMO_INVENTORY: InventoryItem[] = [
  // Field Inputs
  { id: 'INV001', name: 'NPK Fertilizer', category: 'Fertilizer', quantity: 5000, unit: 'kg', reorderLevel: 1000, location: 'Main Warehouse' },
  { id: 'INV002', name: 'Urea', category: 'Fertilizer', quantity: 3500, unit: 'kg', reorderLevel: 800, location: 'Main Warehouse' },
  { id: 'INV003', name: 'Pesticide A', category: 'Pesticide', quantity: 250, unit: 'liters', reorderLevel: 50, location: 'Main Warehouse' },
  { id: 'INV004', name: 'Herbicide B', category: 'Herbicide', quantity: 180, unit: 'liters', reorderLevel: 40, location: 'Main Warehouse' },
  { id: 'INV005', name: 'Seeds - Paddy', category: 'Seeds', quantity: 800, unit: 'kg', reorderLevel: 200, location: 'Main Warehouse' },
  { id: 'INV006', name: 'Seeds - Cotton', category: 'Seeds', quantity: 600, unit: 'kg', reorderLevel: 150, location: 'Main Warehouse' },
  
  // Drones
  { id: 'DRONE001', name: 'AgriDrone X1', category: 'Drone', quantity: 2, unit: 'units', reorderLevel: 1, location: 'Equipment Bay' },
  { id: 'DRONE002', name: 'AgriDrone X2', category: 'Drone', quantity: 2, unit: 'units', reorderLevel: 1, location: 'Equipment Bay' },
  
  // Office/Cluster Stock (Pharma/Fertilizer/Pesticide)
  { id: 'OFF001', name: 'DAP (Office Stock)', category: 'Fertilizer', quantity: 1200, unit: 'kg', reorderLevel: 300, location: 'Office Cluster' },
  { id: 'OFF002', name: 'Potash (Office Stock)', category: 'Fertilizer', quantity: 900, unit: 'kg', reorderLevel: 200, location: 'Office Cluster' },
  { id: 'OFF003', name: 'Chlorpyrifos (Office Stock)', category: 'Pesticide', quantity: 80, unit: 'liters', reorderLevel: 20, location: 'Office Cluster' },
  { id: 'OFF004', name: 'Imidacloprid (Office Stock)', category: 'Pesticide', quantity: 65, unit: 'liters', reorderLevel: 15, location: 'Office Cluster' },
  { id: 'OFF005', name: 'Fungicide Mix (Office Stock)', category: 'Pharma', quantity: 120, unit: 'kg', reorderLevel: 30, location: 'Office Cluster' },
  { id: 'OFF006', name: 'Plant Growth Regulator (Office Stock)', category: 'Pharma', quantity: 45, unit: 'liters', reorderLevel: 10, location: 'Office Cluster' },
  { id: 'OFF007', name: 'Micronutrient Spray (Office Stock)', category: 'Pharma', quantity: 90, unit: 'kg', reorderLevel: 25, location: 'Office Cluster' },
];
