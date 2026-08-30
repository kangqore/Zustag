'use client';

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Zap, 
  Navigation, 
  Store as StoreIcon, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag,
  ExternalLink,
  Building2,
  ChevronRight
} from 'lucide-react';
import { Store as StoreType, JAMSHEDPUR_ZONES } from '@zustag/domain-core';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  stores: StoreType[];
  onSelectStoreToShop: (storeId: string) => void;
  selectedZone: string;
}

export const ZustagStoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
  stores,
  onSelectStoreToShop,
  selectedZone
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState<string>('all');

  if (!isOpen) return null;

  const currentZone = JAMSHEDPUR_ZONES[selectedZone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;

  const localities = [
    { id: 'all', label: 'All Localities' },
    { id: 'Bistupur', label: 'Bistupur / P&M Mall' },
    { id: 'Sakchi', label: 'Sakchi Market' },
    { id: 'Gamharia', label: 'Gamharia Corridor' },
    { id: 'Sonari', label: 'Sonari District' },
    { id: 'Kadma', label: 'Kadma Farm Area' }
  ];

  const filteredStores = stores.filter(store => {
    const matchesLoc = selectedLocality === 'all' || store.locality.toLowerCase().includes(selectedLocality.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      store.name.toLowerCase().includes(q) ||
      store.brand.toLowerCase().includes(q) ||
      store.address.toLowerCase().includes(q) ||
      store.locality.toLowerCase().includes(q);
    return matchesLoc && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1e2434] animate-slide-in-up border border-[#eaeaec]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-lg shrink-0">
              <StoreIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-wide font-display">
                  JAMSHEDPUR & GAMHARIA SHOWROOM LOCATOR
                </h2>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 font-bold px-2 py-0.5 rounded-full">
                  OMNICHANNEL TRY-ON
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Visit in person or order with <strong className="text-white">30-Minute Doorstep Try-On Delivery</strong> to your location.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#eaeaec] bg-[#fafbfc] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7e818c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by store name, brand, or area (e.g. Westside, P&M Mall, Zudio, Manyavar)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eaeaec] rounded-xl text-xs font-bold text-[#1e2434] focus:outline-none focus:border-[#ff3f6c] shadow-2xs"
            />
          </div>

          {/* Locality Quick-Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {localities.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocality(loc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedLocality === loc.id
                    ? 'bg-[#1e2434] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-[#535766] border border-[#eaeaec]'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Store Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="text-xs font-bold text-[#7e818c] flex items-center justify-between pb-1">
            <span>Showing {filteredStores.length} Certified Showroom Outlets</span>
            <span className="text-[#03a685] font-black">⚡ Real-Time Counter Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStores.map((store) => {
              const isCurrentZone = store.locality.toLowerCase().includes(currentZone.areaName.toLowerCase().split(' ')[0]);
              return (
                <div
                  key={store.id}
                  className={`rounded-2xl border p-4 transition-all flex flex-col justify-between space-y-3 bg-white shadow-xs hover:shadow-md ${
                    isCurrentZone ? 'border-amber-300 ring-2 ring-amber-100' : 'border-[#eaeaec]'
                  }`}
                >
                  {/* Top: Image & Details */}
                  <div className="flex items-start gap-3">
                    <img
                      src={store.imageUrl}
                      alt={store.name}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-[#eaeaec]"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-black text-[#1e2434] truncate">
                          {store.name}
                        </h4>
                        <span className="text-[10px] bg-emerald-50 text-[#03a685] border border-emerald-200 font-bold px-1.5 py-0.2 rounded shrink-0">
                          OPEN
                        </span>
                      </div>

                      <div className="text-[11px] text-[#7e818c] font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#ff3f6c] shrink-0" />
                        <span className="truncate">{store.address}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] text-[#535766] pt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{store.contactNumber}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>10:30 AM – 9:30 PM</span>
                        </span>
                      </div>

                      {isCurrentZone && (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-amber-50 text-amber-900 border border-amber-200 font-black px-2 py-0.5 rounded-full mt-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-600 fill-amber-600" />
                          <span>In Your Selected Locality (15-20 Min Delivery)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f5f5f7]">
                    {/* CTA 1: Order in 30 Mins */}
                    <button
                      onClick={() => {
                        onSelectStoreToShop(store.id);
                        onClose();
                      }}
                      className="py-2 px-2.5 bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] hover:opacity-95 text-white text-[11px] font-black uppercase rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Order (30M SLA)</span>
                    </button>

                    {/* CTA 2: Google Maps Directions */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="py-2 px-2.5 bg-[#f5f5f7] hover:bg-[#eaeaec] text-[#1e2434] text-[11px] font-extrabold uppercase rounded-xl flex items-center justify-center gap-1.5 border border-[#eaeaec] cursor-pointer transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#2564ea]" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#eaeaec] bg-[#fafbfc] flex items-center justify-between text-xs text-[#7e818c]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#03a685]" />
            <span>All Showrooms Certified for 10-Minute Doorstep Try-On Guarantee</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#1e2434] font-bold rounded-lg cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
