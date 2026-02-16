export interface ExportOrder {
  id: string;
  crop: string;
  destination: string;
  quantity: number;
  unit: string;
  shipmentStatus: string;
  expectedRevenue: number;
  shipmentDate: string;
  estimatedArrival: string;
}

export const DEMO_EXPORTS: ExportOrder[] = [
  {
    id: 'EXP001',
    crop: 'Chilli',
    destination: 'UAE',
    quantity: 5000,
    unit: 'kg',
    shipmentStatus: 'In Transit',
    expectedRevenue: 450000,
    shipmentDate: '2026-02-10',
    estimatedArrival: '2026-02-25',
  },
  {
    id: 'EXP002',
    crop: 'Rice',
    destination: 'Malaysia',
    quantity: 10000,
    unit: 'kg',
    shipmentStatus: 'Preparing',
    expectedRevenue: 380000,
    shipmentDate: '2026-02-20',
    estimatedArrival: '2026-03-05',
  },
];
