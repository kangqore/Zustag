'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bike, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  ShieldCheck, 
  Phone, 
  Clock, 
  Radio, 
  Send,
  Zap
} from 'lucide-react';
import { Order, OrderStatus } from '@zustag/domain-core';

export const RiderSimulator: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeDispatchOrder, setActiveDispatchOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
      
      // Keep active order updated
      if (activeDispatchOrder) {
        const found = (data.orders || []).find((o: Order) => o.id === activeDispatchOrder.id);
        if (found) setActiveDispatchOrder(found);
      } else if ((data.orders || []).length > 0) {
        setActiveDispatchOrder(data.orders[0]);
      }
    } catch (err) {
      console.error('Failed to load orders for rider:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      });
      fetchOrders();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Rider Telemetry Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Bike className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Rider Express Dispatch</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">
                <Radio className="w-2.5 h-2.5 animate-ping" />
                ONLINE (JH 05 CD 8821)
              </span>
            </div>
            <h1 className="text-xl font-bold text-white">
              Amitabh Soren (Jamshedpur Hyper-Fleet)
            </h1>
            <p className="text-xs text-slate-400">Current Hub: Bistupur Commercial Zone • 100% On-Time SLA</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700/80 rounded-xl p-3 px-5">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Urban Speed Index</div>
            <div className="text-base font-bold text-white font-mono">22 km/h avg</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Max Delivery Radius</div>
            <div className="text-base font-bold text-cyan-400 font-mono">5.5 KM / 30m</div>
          </div>
        </div>
      </div>

      {/* Main Rider Console: Active Task vs Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1-Col: Assigned Pickups List */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>Assigned Tasks</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {orders.length} TOTAL
            </span>
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Bike className="w-10 h-10 mx-auto text-slate-700" />
              <div className="text-xs">No active orders assigned right now</div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {orders.map((order) => {
                const isSelected = activeDispatchOrder?.id === order.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => setActiveDispatchOrder(order)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950/40 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">#{order.orderNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-cyan-950 text-cyan-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 mt-1 font-medium truncate">
                      {order.storeName} → {order.deliveryAddress.area}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                      <span>{order.eta.distanceKm} km</span>
                      <span className="text-cyan-300 font-semibold">{order.eta.totalETAMinutes} min target</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 2-Cols: Interactive Live Express Route & Action Flow */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
          {activeDispatchOrder ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Express 30-Minute Dispatch Workflow
                  </span>
                  <h2 className="text-lg font-bold text-white mt-0.5">
                    Order #{activeDispatchOrder.orderNumber}
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase">Customer Verification OTP</div>
                  <div className="text-xl font-mono font-bold text-emerald-400 tracking-wider">
                    {activeDispatchOrder.otp}
                  </div>
                </div>
              </div>

              {/* Waypoint Route Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Store Pickup */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                    <MapPin className="w-4 h-4" />
                    STEP 1: PICKUP SHOWROOM
                  </div>
                  <div className="text-sm font-semibold text-white">{activeDispatchOrder.storeName}</div>
                  <p className="text-xs text-slate-400">{activeDispatchOrder.storeAddress}</p>
                </div>

                {/* Customer Drop */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Navigation className="w-4 h-4" />
                    STEP 2: DELIVERY DROP
                  </div>
                  <div className="text-sm font-semibold text-white">{activeDispatchOrder.customerName}</div>
                  <p className="text-xs text-slate-400">{activeDispatchOrder.deliveryAddress.addressLine}, {activeDispatchOrder.deliveryAddress.area}</p>
                </div>
              </div>

              {/* Items in Parcel */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-300">Fashion Package Contents:</div>
                <div className="space-y-1">
                  {activeDispatchOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-white">
                      <span>{item.quantity}x {item.productTitle} ({item.brand})</span>
                      <span className="font-mono text-slate-400">Size: {item.size} • Color: {item.color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Rider Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-300">Advance Dispatch Stage:</div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleUpdateStatus(activeDispatchOrder.id, 'RIDER_AT_STORE')}
                    disabled={activeDispatchOrder.status === 'RIDER_AT_STORE' || activeDispatchOrder.status === 'OUT_FOR_DELIVERY' || activeDispatchOrder.status === 'DELIVERED'}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-30 cursor-pointer"
                  >
                    1. Arrived at Showroom
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(activeDispatchOrder.id, 'OUT_FOR_DELIVERY')}
                    disabled={activeDispatchOrder.status === 'OUT_FOR_DELIVERY' || activeDispatchOrder.status === 'DELIVERED'}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 disabled:opacity-30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bike className="w-4 h-4" />
                    2. Picked Up & Out for Delivery
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(activeDispatchOrder.id, 'DELIVERED')}
                    disabled={activeDispatchOrder.status === 'DELIVERED'}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    3. Verify OTP & Complete Delivery
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              Select an order on the left to review pickup and dispatch route.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
