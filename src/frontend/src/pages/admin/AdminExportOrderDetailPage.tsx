import React from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { DEMO_EXPORTS } from '../../data/demoExports';
import { formatCurrency } from '../../lib/formatting';
import { ArrowLeft, Package, MapPin, Calendar, DollarSign } from 'lucide-react';

export default function AdminExportOrderDetailPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const orderId = params.orderId;
  
  const order = DEMO_EXPORTS.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate({ to: '/admin/exports' })}
        className="flex items-center gap-2 text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Back to Exports</span>
      </button>

      <div>
        <h1 className="text-3xl font-bold text-foreground">{order.crop} → {order.destination}</h1>
        <p className="text-muted-foreground mt-1">Order ID: {order.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Shipment Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Crop:</span>
              <span className="text-sm font-semibold">{order.crop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <span className="text-sm font-semibold">{order.quantity} {order.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className={`text-sm font-semibold ${order.shipmentStatus === 'In Transit' ? 'text-blue-600' : 'text-yellow-600'}`}>
                {order.shipmentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Destination</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Country:</span>
              <span className="text-sm font-semibold">{order.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Shipment Date:</span>
              <span className="text-sm font-semibold">{order.shipmentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Est. Arrival:</span>
              <span className="text-sm font-semibold">{order.estimatedArrival}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Financial Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expected Revenue:</span>
              <span className="text-2xl font-bold text-green-600">{formatCurrency(order.expectedRevenue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
