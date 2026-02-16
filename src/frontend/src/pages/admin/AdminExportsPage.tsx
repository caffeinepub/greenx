import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { DEMO_EXPORTS } from '../../data/demoExports';
import { formatCurrency } from '../../lib/formatting';
import { Package, ArrowRight } from 'lucide-react';

export default function AdminExportsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Exports</h1>
        <p className="text-muted-foreground mt-1">Manage export orders and shipments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_EXPORTS.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate({ to: `/admin/exports/${order.id}` })}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{order.crop} → {order.destination}</h3>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium">{order.quantity} {order.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`font-medium ${order.shipmentStatus === 'In Transit' ? 'text-blue-600' : 'text-yellow-600'}`}>
                  {order.shipmentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected Revenue:</span>
                <span className="font-semibold text-green-600">{formatCurrency(order.expectedRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipment Date:</span>
                <span className="font-medium">{order.shipmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Arrival:</span>
                <span className="font-medium">{order.estimatedArrival}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
