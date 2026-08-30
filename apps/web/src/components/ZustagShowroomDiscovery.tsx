'use client';

import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  Star, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Building2,
  Navigation,
  CheckCircle2,
  Users,
  Tag
} from 'lucide-react';
import { Store as StoreType } from '@zustag/domain-core';

interface ShowroomDiscoveryProps {
  stores: StoreType[];
  selectedShowroom: string;
  onSelectShowroom: (storeId: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const ZustagShowroomDiscovery: React.FC<ShowroomDiscoveryProps> = ({
  stores,
  selectedShowroom,
  onSelectShowroom,
  onSelectCategory
}) => {
  const [activeLocality, setActiveLocality] = useState<string>('ALL');

  const localities = [
    { id: 'ALL', label: 'All Outlets', count: stores.length },
    { id: 'Bistupur', label: 'Bistupur & P&M Mall', count: stores.filter(s => s.locality === 'Bistupur').length },
    { id: 'Gamharia', label: 'Gamharia Hub', count: stores.filter(s => s.locality === 'Gamharia').length },
    { id: 'Sakchi', label: 'Sakchi High Street', count: stores.filter(s => s.locality === 'Sakchi').length },
    { id: 'Sonari', label: 'Sonari & Kadma Boutiques', count: stores.filter(s => ['Sonari', 'Kadma'].includes(s.locality)).length }
  ];

  const filteredStores = stores.filter(store => {
    if (activeLocality === 'ALL') return true;
    if (activeLocality === 'Sonari') return ['Sonari', 'Kadma'].includes(store.locality);
    return store.locality.toLowerCase().includes(activeLocality.toLowerCase());
  });

  const handleShowroomClick = (storeId: string) => {
    onSelectShowroom(storeId);
    const el = document.getElementById('showroom-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#fafbfc] border-y border-[#eaeaec] py-10 my-6">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 space-y-6">
        {/* Section Header with Dynamic Locality Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#ff3f6c] tracking-widest">
              <Store className="w-4 h-4" />
              <span>ZOMATO-SPEED SHOWROOM OUTLETS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#282c3f] tracking-wide uppercase font-serif mt-1">
              Popular Outlets & Flagships Near You
            </h2>
            <p className="text-xs text-[#7e818c] mt-1 max-w-2xl">
              Authentic brick-and-mortar retail outlets across Jamshedpur & Gamharia. Live counter packing & 30-minute hyper-express doorstep dispatch.
            </p>
          </div>

          {/* Locality Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {localities.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLocality(loc.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeLocality === loc.id
                    ? 'bg-[#282c3f] text-white shadow-md'
                    : 'bg-white text-[#535766] border border-[#eaeaec] hover:border-[#282c3f] hover:text-[#282c3f]'
                }`}
              >
                <span>{loc.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeLocality === loc.id ? 'bg-white/20 text-white' : 'bg-[#f5f5f6] text-[#7e818c]'
                }`}>
                  {loc.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Store Active Banner */}
        {selectedShowroom !== 'all' && (
          <div className="bg-[#fff1f4] border border-[#ff3f6c]/30 rounded-xl p-3.5 flex items-center justify-between gap-4 animate-slide-in-up">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ff3f6c] text-white flex items-center justify-center font-bold">
                <Store className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#ff3f6c] uppercase">Currently Browsing Store: </span>
                <strong className="text-[#282c3f]">
                  {stores.find(s => s.id === selectedShowroom)?.name || 'Selected Showroom'}
                </strong>
                <span className="text-[#7e818c] ml-2 hidden sm:inline">
                  (Showing live verified showroom inventory)
                </span>
              </div>
            </div>
            <button
              onClick={() => onSelectShowroom('all')}
              className="text-xs font-bold text-[#ff3f6c] hover:underline uppercase shrink-0 cursor-pointer"
            >
              Clear Showroom Filter ✕
            </button>
          </div>
        )}

        {/* Showrooms Grid (Zomato-Style Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredStores.map((store, idx) => {
            const isSelected = selectedShowroom === store.id;
            // Approximate distance for hyper-local feel
            const distanceKm = ((idx % 5) * 0.7 + 1.1).toFixed(1);
            const prepTimeMins = store.averagePrepTimeMinutes || 5;

            return (
              <div
                key={store.id}
                onClick={() => handleShowroomClick(store.id)}
                className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-2xl hover:-translate-y-1 relative ${
                  isSelected 
                    ? 'border-[#ff3f6c] ring-3 ring-[#ff3f6c] shadow-lg' 
                    : 'border-[#eaeaec] hover:border-[#282c3f]'
                }`}
              >
                {/* Store Banner Image */}
                <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                  <img
                    src={store.imageUrl}
                    alt={store.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges (Distance & Rating) */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="bg-[#ff3f6c] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-white" />
                      <span>{distanceKm} km &bull; 18 MINS</span>
                    </span>

                    <span className="bg-white/95 backdrop-blur-xs text-[#282c3f] text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <span>{store.rating}</span>
                      <Star className="w-3 h-3 fill-[#ff905a] text-[#ff905a]" />
                      <span className="text-[#7e818c] font-normal text-[10px]">({store.totalRatings})</span>
                    </span>
                  </div>

                  {/* Live Counter Packing Status Ribbon */}
                  <div className="absolute bottom-11 left-3 z-10">
                    <span className="bg-emerald-950/80 backdrop-blur-xs border border-emerald-400/40 text-emerald-300 text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{prepTimeMins}m Counter Packing Live</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-2.5 inset-x-3 text-white">
                    <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider truncate">
                      {store.brand}
                    </div>
                    <h3 className="font-black text-sm sm:text-base text-white truncate drop-shadow-xs">
                      {store.name}
                    </h3>
                  </div>
                </div>

                {/* Showroom Meta Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[#535766]">
                      <MapPin className="w-3.5 h-3.5 text-[#ff3f6c] shrink-0" />
                      <span className="truncate font-medium">{store.address}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#7e818c] text-[11px]">
                      <Building2 className="w-3.5 h-3.5 text-[#2564ea] shrink-0" />
                      <span>{store.mallOrMarket || store.locality}</span>
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="bg-[#fff1f4] text-[#ff3f6c] text-[9px] font-bold px-1.5 py-0.5 rounded border border-rose-100 flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" />
                        <span>Up to 60% Off</span>
                      </span>
                      {store.tags?.slice(0, 2).map((tag, idx2) => (
                        <span 
                          key={idx2}
                          className="bg-[#f5f5f6] text-[#535766] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#eaeaec]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="border-t border-[#f5f5f6] pt-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#03a685] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Outlet
                    </span>

                    <button
                      className={`text-xs font-black uppercase px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#ff3f6c] text-white shadow-sm' 
                          : 'bg-[#f5f5f6] hover:bg-[#ff3f6c] text-[#282c3f] hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Browsing' : 'Order Now'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
