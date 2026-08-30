'use client';

import React, { useState, useEffect } from 'react';
import { 
  Store as StoreIcon, 
  Package, 
  Layers, 
  Plus, 
  Minus, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  RefreshCw,
  Bell,
  Check
} from 'lucide-react';
import { Store, Product, StoreInventoryItem } from '@zustag/domain-core';

export const MerchantTerminal: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('store_bistupur_zara_local');
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<StoreInventoryItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingSku, setUpdatingSku] = useState<string | null>(null);

  const fetchMerchantData = async () => {
    try {
      setLoading(true);
      const [invRes, orderRes] = await Promise.all([
        fetch(`/api/inventory?storeId=${selectedStoreId}`),
        fetch('/api/orders')
      ]);

      const invData = await invRes.json();
      const orderData = await orderRes.json();

      // Fetch all stores and products if not loaded
      if (stores.length === 0) {
        const fullInvRes = await fetch('/api/inventory');
        const fullData = await fullInvRes.json();
        setStores(fullData.stores || []);
        setProducts(fullData.products || []);
      }

      setInventory(invData.inventory || []);
      setOrders((orderData.orders || []).filter((o: any) => o.storeId === selectedStoreId));
    } catch (err) {
      console.error('Error loading merchant terminal:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchantData();
    const interval = setInterval(fetchMerchantData, 3000);
    return () => clearInterval(interval);
  }, [selectedStoreId]);

  const handleUpdateStock = async (variantId: string, currentTotal: number, delta: number) => {
    const newQty = Math.max(0, currentTotal + delta);
    setUpdatingSku(variantId);
    try {
      await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: selectedStoreId,
          variantId,
          totalQuantity: newQty
        })
      });
      await fetchMerchantData();
    } catch (err) {
      console.error('Stock update failed:', err);
    } finally {
      setUpdatingSku(null);
    }
  };

  const handleMarkPacked = async (orderId: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status: 'PACKED_READY'
        })
      });
      fetchMerchantData();
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const currentStore = stores.find(s => s.id === selectedStoreId);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Merchant Header & Showroom Switcher */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <StoreIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Merchant Live Terminal</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800 font-mono">
                ● SYNC ACTIVE
              </span>
            </div>
            <h1 className="text-xl font-bold text-white">
              {currentStore?.name || 'Showroom POS Inventory'}
            </h1>
            <p className="text-xs text-slate-400">{currentStore?.address}</p>
          </div>
        </div>

        {/* Store Selector */}
        <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-2 px-3.5 shadow-inner">
          <label className="text-[10px] text-slate-400 uppercase font-semibold block">Select Active Showroom</label>
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                {s.name} ({s.locality})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Live Incoming Orders vs Variant Stock Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1-Col: Incoming Express Orders (7-Min SLA Prep Kanban) */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400 animate-bounce" />
              <h2 className="text-base font-bold text-white">Incoming Orders</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono font-bold">
              {orders.length} ACTIVE
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Package className="w-10 h-10 mx-auto text-slate-700" />
              <div className="text-xs">No pending orders for this showroom right now</div>
              <div className="text-[10px] text-slate-600">Place an order in the Customer Tab to test the SLA queue</div>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">#{order.orderNumber}</span>
                      <div className="text-[11px] text-slate-400">Customer: {order.customerName}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-cyan-400 border border-cyan-500/30">
                      {order.status}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">
                          {item.quantity}x {item.productTitle} (Size: {item.size})
                        </span>
                        <span className="text-white font-mono">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      7-Min Prep Target
                    </div>

                    {order.status === 'STORE_ACCEPTED' && (
                      <button
                        onClick={() => handleMarkPacked(order.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Pack & Ready for Rider
                      </button>
                    )}

                    {order.status === 'PACKED_READY' && (
                      <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Awaiting Rider Pickup
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 2-Cols: Live Showroom Variant Inventory Manager */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Live Showroom SKU & Variant Stock
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Modifications instantly propagate to Redis Serving Layer and Customer Search (<span className="text-emerald-400 font-mono">CDC Event Bus</span>).
              </p>
            </div>
            <button 
              onClick={fetchMerchantData}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Product / SKU</th>
                  <th className="py-2.5 px-2">Size</th>
                  <th className="py-2.5 px-2">Color</th>
                  <th className="py-2.5 px-2">Total Qty</th>
                  <th className="py-2.5 px-2">Reserved (Cart)</th>
                  <th className="py-2.5 px-2">Available (Redis)</th>
                  <th className="py-2.5 px-3 text-right">Adjust Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.flatMap(p => 
                  p.variants.map(v => {
                    const invItem = inventory.find(i => i.variantId === v.id);
                    const total = invItem?.totalQuantity ?? 0;
                    const reserved = invItem?.reservedQuantity ?? 0;
                    const available = invItem?.availableQuantity ?? 0;

                    return (
                      <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white">{p.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{v.sku} ({p.brand})</div>
                        </td>
                        <td className="py-3 px-2 font-mono font-bold text-white">{v.size}</td>
                        <td className="py-3 px-2">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-slate-600 inline-block" 
                              style={{ backgroundColor: v.colorHex }} 
                            />
                            {v.color}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-mono text-slate-300 font-semibold">{total}</td>
                        <td className="py-3 px-2 font-mono text-amber-400">{reserved}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                            available > 0 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                              : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                          }`}>
                            {available}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleUpdateStock(v.id, total, -1)}
                              disabled={total <= 0 || updatingSku === v.id}
                              className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleUpdateStock(v.id, total, +1)}
                              disabled={updatingSku === v.id}
                              className="w-6 h-6 rounded bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center hover:opacity-90 shadow-sm cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
