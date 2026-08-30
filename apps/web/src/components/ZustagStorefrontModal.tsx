'use client';

import React, { useState } from 'react';
import { 
  X, 
  Store, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  Video, 
  Zap, 
  Phone, 
  Navigation, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Layers, 
  Award,
  Users
} from 'lucide-react';
import { Store as StoreType, LocalAvailabilityItem, ProductVariant } from '@zustag/domain-core';

interface StorefrontModalProps {
  store: StoreType | null;
  isOpen: boolean;
  onClose: () => void;
  items: LocalAvailabilityItem[];
  onOpenPDP: (item: LocalAvailabilityItem, initialVariant?: ProductVariant) => void;
  onQuickAddToCart: (item: LocalAvailabilityItem, variant: ProductVariant) => void;
}

const STORE_FACADE_IMAGES: Record<string, string> = {
  store_bistupur_manyavar: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80',
  store_gamharia_zudio: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
  store_pm_mall_pantaloons: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  store_gamharia_citi_style: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
  store_sakchi_soch: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
  store_gamharia_sen_shoes: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80'
};

const DEFAULT_FACADE = 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80';

export const ZustagStorefrontModal: React.FC<StorefrontModalProps> = ({
  store,
  isOpen,
  onClose,
  items,
  onOpenPDP,
  onQuickAddToCart
}) => {
  const [activeFloor, setActiveFloor] = useState<'all' | 'ground' | 'first' | 'accessories'>('all');
  const [addedVariants, setAddedVariants] = useState<Record<string, boolean>>({});

  if (!isOpen || !store) return null;

  const storeItems = items.filter(i => i.store.id === store.id);
  const facadeImage = STORE_FACADE_IMAGES[store.id] || DEFAULT_FACADE;

  const handleAdd = (item: LocalAvailabilityItem, variant: ProductVariant) => {
    onQuickAddToCart(item, variant);
    setAddedVariants(prev => ({ ...prev, [variant.id]: true }));
    setTimeout(() => {
      setAddedVariants(prev => ({ ...prev, [variant.id]: false }));
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative bg-white max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-[#282c3f] animate-slide-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#282c3f] hover:text-[#ff3f6c] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Showroom Facade Hero Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={facadeImage}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#182344] via-[#182344]/60 to-transparent" />

          {/* Showroom Badges & Live Status */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="bg-[#03a685] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              OPEN NOW &bull; COUNTER ACTIVE
            </span>
            <span className="bg-white/90 backdrop-blur-xs text-[#282c3f] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Video className="w-3 h-3 text-[#03a685]" />
              CCTV PACKING ASSURED
            </span>
          </div>

          {/* Bottom Showroom Meta */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Store className="w-4 h-4" />
                <span>Authorized {store.brand} Showroom</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow-sm">
                {store.name}
              </h1>
              <p className="text-xs text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ff3f6c]" />
                <span>{store.mallOrMarket || store.locality}, Jamshedpur</span>
                <span>&bull;</span>
                <span className="text-cyan-300 font-bold">⚡ {store.averagePrepTimeMinutes || 5}M Counter Prep</span>
              </p>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert(`Calling ${store.name} Floor Manager (+91 98350 11982)...`)}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store</span>
              </button>
              <button 
                onClick={() => alert(`Opening Google Maps navigation to ${store.name} (${store.locality})...`)}
                className="bg-[#ff3f6c] hover:bg-[#e0355d] text-white px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Showroom Floor / Aisle Navigator */}
        <div className="bg-[#fafbfc] border-b border-[#eaeaec] px-4 sm:px-8 py-3 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="text-[#7e818c] text-[11px] uppercase mr-1">Floor Aisle:</span>
            <button
              onClick={() => setActiveFloor('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFloor === 'all' ? 'bg-[#282c3f] text-white shadow-xs' : 'bg-white border border-[#eaeaec] text-[#282c3f] hover:border-[#282c3f]'
              }`}
            >
              All Store Inventory ({storeItems.length})
            </button>
            <button
              onClick={() => setActiveFloor('ground')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFloor === 'ground' ? 'bg-[#282c3f] text-white shadow-xs' : 'bg-white border border-[#eaeaec] text-[#282c3f] hover:border-[#282c3f]'
              }`}
            >
              Ground Floor: Formals & Tees
            </button>
            <button
              onClick={() => setActiveFloor('first')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFloor === 'first' ? 'bg-[#282c3f] text-white shadow-xs' : 'bg-white border border-[#eaeaec] text-[#282c3f] hover:border-[#282c3f]'
              }`}
            >
              1st Floor: Wedding & Silk
            </button>
            <button
              onClick={() => setActiveFloor('accessories')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFloor === 'accessories' ? 'bg-[#282c3f] text-white shadow-xs' : 'bg-white border border-[#eaeaec] text-[#282c3f] hover:border-[#282c3f]'
              }`}
            >
              Footwear & Accessories
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#03a685] shrink-0">
            <Users className="w-4 h-4" />
            <span>2 Attendants Packing Now</span>
          </div>
        </div>

        {/* 3. Live Store Inventory Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {storeItems.map((item, idx) => {
              const price = item.variant.price;
              const mrp = item.variant.mrp || price;
              const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
              const isAdded = addedVariants[item.variant.id];

              return (
                <div
                  key={idx}
                  onClick={() => onOpenPDP(item)}
                  className="group bg-white rounded-xl border border-[#eaeaec] hover:border-[#282c3f] p-2.5 shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#f5f5f6]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#ff3f6c] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      ⚡ {item.etaMinutes}M SLA
                    </div>
                  </div>

                  <div className="pt-2.5 space-y-1">
                    <div className="font-extrabold text-xs text-[#282c3f] truncate">
                      {item.product.brand}
                    </div>
                    <div className="text-[11px] text-[#535766] truncate font-normal">
                      {item.product.title}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-xs text-[#282c3f]">
                          ₹{price.toLocaleString()}
                        </span>
                        {mrp > price && (
                          <span className="text-[10px] text-[#7e818c] line-through">
                            ₹{mrp.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {discount > 0 && (
                        <span className="text-[10px] font-black text-[#ff905a]">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(item, item.variant);
                      }}
                      className={`w-full mt-2 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer ${
                        isAdded 
                          ? 'bg-[#03a685] text-white' 
                          : 'bg-[#f5f5f6] hover:bg-[#ff3f6c] text-[#282c3f] hover:text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Bag ({item.variant.size})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
