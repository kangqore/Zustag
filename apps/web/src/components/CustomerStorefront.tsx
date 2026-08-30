'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Zap, 
  Clock, 
  ShoppingBag, 
  Sparkles, 
  Store as StoreIcon, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  AlertCircle,
  Truck,
  Check
} from 'lucide-react';
import { LocalAvailabilityItem, Product, ProductVariant, JAMSHEDPUR_ZONES } from '@zustag/domain-core';

interface CustomerStorefrontProps {
  onOrderPlaced: (orderId: string) => void;
}

export const CustomerStorefront: React.FC<CustomerStorefrontProps> = ({ onOrderPlaced }) => {
  const [selectedZone, setSelectedZone] = useState<string>('BISTUPUR_MAIN');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [under30Only, setUnder30Only] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [items, setItems] = useState<LocalAvailabilityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Selected variant drawer
  const [selectedItem, setSelectedItem] = useState<LocalAvailabilityItem | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<any | null>(null);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  const fetchDiscovery = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        zone: selectedZone,
        category: selectedCategory,
        under30: under30Only.toString(),
        q: searchQuery
      });
      const res = await fetch(`/api/discovery?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to fetch discovery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscovery();
    const interval = setInterval(fetchDiscovery, 4000); // Polling for real-time inventory updates
    return () => clearInterval(interval);
  }, [selectedZone, selectedCategory, under30Only, searchQuery]);

  const handleOpenDrawer = (item: LocalAvailabilityItem) => {
    setSelectedItem(item);
    setSelectedVariant(item.variant);
  };

  const handleCheckout = async () => {
    if (!selectedItem || !selectedVariant) return;
    setIsOrdering(true);
    setOrderSuccessMsg(null);

    try {
      const zone = JAMSHEDPUR_ZONES[selectedZone];
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Rohit Sharma (Bistupur Resident)',
          customerPhone: '+91 98352 11098',
          deliveryAddress: {
            addressLine: 'Flat 4B, Steel Enclave, Near Jubilee Park',
            area: zone.areaName,
            city: zone.city,
            coordinates: zone
          },
          storeId: selectedItem.store.id,
          items: [
            {
              productId: selectedItem.product.id,
              variantId: selectedVariant.id,
              quantity: 1
            }
          ]
        })
      });

      const data = await res.json();
      if (data.success && data.order) {
        setActiveOrder(data.order);
        setOrderSuccessMsg(`Order #${data.order.orderNumber} placed! 30-min express fulfillment started.`);
        onOrderPlaced(data.order.id);
        fetchDiscovery();
      } else {
        alert(data.error || 'Failed to place order');
      }
    } catch (err: any) {
      alert('Error during checkout: ' + err.message);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Location & Guarantee Banner */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-slate-800/80 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold brand-badge-30m">
                <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                HYPERLOCAL 30-MIN PROMISE
              </span>
              <span className="text-xs text-slate-400">Jamshedpur Fashion Grid</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Discover Local Showrooms & Fast Delivery
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Real-time variant availability directly synced with offline clothing showrooms across Jamshedpur.
            </p>
          </div>

          {/* User Location Zone Selector */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/70 rounded-xl p-2.5 px-3.5 shadow-inner">
            <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Your Location</div>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
              >
                {Object.entries(JAMSHEDPUR_ZONES).map(([key, zone]) => (
                  <option key={key} value={key} className="bg-slate-900 text-white">
                    {zone.areaName} ({zone.city})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'All Styles' },
              { id: 'shirts', label: 'Shirts' },
              { id: 'jeans', label: 'Denims & Jeans' },
              { id: 'ethnic', label: 'Festive & Ethnic' },
              { id: 'dresses', label: 'Dresses' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUnder30Only(!under30Only)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                under30Only
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-800/60 border-slate-700/70 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              ⚡ Under 30 Mins Only
            </button>

            <input
              type="text"
              placeholder="Search shirts, jeans, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-48 md:w-56"
            />
          </div>
        </div>
      </div>

      {/* Live Active Order Notification Card */}
      {activeOrder && (
        <div className="glass-panel bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-cyan-950/40 rounded-xl p-4 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Live Order in Progress</span>
                <span className="text-xs text-slate-400">• Order #{activeOrder.orderNumber}</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {activeOrder.items[0]?.productTitle} ({activeOrder.items[0]?.brand})
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>Showroom: {activeOrder.storeName}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">OTP: {activeOrder.otp}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 p-2.5 px-4 rounded-lg border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase">Estimated Delivery</div>
              <div className="text-sm font-bold text-cyan-300">
                {activeOrder.eta.totalETAMinutes} Mins Guaranteed
              </div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div className="text-xs text-slate-300">
              Status: <span className="font-semibold text-white">{activeOrder.status}</span>
            </div>
          </div>
        </div>
      )}

      {/* Discovery Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>Showrooms Near You</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-normal">
              {items.length} Live Variants
            </span>
          </h2>
          <span className="text-xs text-slate-400">
            Serving Layer: <span className="text-emerald-400 font-mono">Redis Cached (~1.2ms)</span>
          </span>
        </div>

        {loading && items.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Querying Jamshedpur Local Inventory Intelligence...
          </div>
        ) : items.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="text-base font-semibold text-white">No exact 30-min matches found for this filter</div>
            <p className="text-xs text-slate-500">
              Try switching your location or relaxing the 30-minute delivery constraint.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item, idx) => (
              <div
                key={`${item.store.id}_${item.variant.id}_${idx}`}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => handleOpenDrawer(item)}
              >
                {/* Product Image & Badges */}
                <div className="relative h-56 bg-slate-900 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* 30-Min Fast Delivery Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 shadow-lg">
                      <Zap className="w-3 h-3 fill-cyan-400" />
                      {item.etaMinutes} MINS
                    </span>
                  </div>

                  {/* Showroom distance badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950/70 backdrop-blur-md text-slate-300 border border-slate-700">
                      {item.distanceKm} km away
                    </span>
                  </div>

                  {/* Showroom Origin Tag */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-white font-medium drop-shadow-md">
                      <StoreIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="truncate">{item.store.name}</span>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                      {item.product.brand}
                    </div>
                    <h3 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {item.product.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                        Size: {item.variant.size}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                        {item.variant.color}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-medium ml-auto">
                        ● {item.availableQuantity} in stock
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-white">₹{item.price}</span>
                        {item.product.mrp > item.price && (
                          <span className="text-xs text-slate-500 line-through">₹{item.product.mrp}</span>
                        )}
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold hover:shadow-md hover:shadow-cyan-500/20 transition-all flex items-center gap-1">
                      Pick Size
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Variant Selection & Express Checkout Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  {selectedItem.product.brand} Showroom Exclusive
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{selectedItem.product.title}</h2>
                <p className="text-xs text-slate-400 mt-1">{selectedItem.product.description}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Selected Store Breakdown */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <StoreIcon className="w-4 h-4 text-cyan-400" />
                  Showroom: <span className="text-white font-medium">{selectedItem.store.name}</span>
                </span>
                <span className="text-emerald-400 font-semibold">● Store Open</span>
              </div>
              
              {/* ETA Formula Breakdown */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-center">
                <div className="bg-slate-900 p-2 rounded">
                  <div className="text-[10px] text-slate-500">Prep SLA</div>
                  <div className="text-xs font-bold text-white">{selectedItem.store.averagePrepTimeMinutes}m</div>
                </div>
                <div className="bg-slate-900 p-2 rounded">
                  <div className="text-[10px] text-slate-500">Rider Assign</div>
                  <div className="text-xs font-bold text-white">3m</div>
                </div>
                <div className="bg-slate-900 p-2 rounded">
                  <div className="text-[10px] text-slate-500">Transit ({selectedItem.distanceKm}km)</div>
                  <div className="text-xs font-bold text-white">{Math.max(4, Math.round(selectedItem.distanceKm * 2.8))}m</div>
                </div>
                <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-cyan-500/40 p-2 rounded">
                  <div className="text-[10px] text-cyan-300 font-semibold">Total ETA</div>
                  <div className="text-xs font-bold text-cyan-300">{selectedItem.etaMinutes}m</div>
                </div>
              </div>
            </div>

            {/* Variant Selector: Sizes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span>Select Variant Size:</span>
                <span className="text-cyan-400">SKU: {selectedVariant?.sku}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {selectedItem.product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {v.size} ({v.color})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Checkout Pricing & Lock */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Hyperlocal Price</div>
                <div className="text-2xl font-bold text-white">₹{selectedVariant?.price}</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  10-Min Atomic Inventory Lock
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isOrdering}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isOrdering ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Locking Inventory...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    Order for 30-Min Delivery
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
