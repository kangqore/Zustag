'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Zap, 
  ArrowRight, 
  Check, 
  Tag, 
  Heart, 
  SlidersHorizontal,
  Flame,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { LocalAvailabilityItem, ProductVariant } from '@zustag/domain-core';

interface OutfitBundle {
  id: string;
  occasionTitle: string;
  occasionSubtitle: string;
  tagline: string;
  themeColor: string;
  items: {
    slot: 'Topwear' | 'Bottomwear' | 'Footwear' | 'Accessory';
    brand: string;
    name: string;
    size: string;
    price: number;
    mrp: number;
    storeName: string;
    imageUrl: string;
  }[];
  bundleDiscount: number;
  eta: string;
}

const CURATED_BUNDLES: OutfitBundle[] = [
  {
    id: 'bundle_wedding_regal',
    occasionTitle: 'Royal Wedding Guest Look',
    occasionSubtitle: 'Curated from Manyavar Bistupur & Sen Shoes Manglam',
    tagline: 'Festive Jacquard Silk + Mojaris + Titan Watch',
    themeColor: 'from-amber-600 to-rose-700',
    bundleDiscount: 450,
    eta: '⚡ 24 MINS',
    items: [
      {
        slot: 'Topwear',
        brand: 'Manyavar',
        name: 'Festive Royal Jacquard Kurta Set',
        size: 'L',
        price: 2999,
        mrp: 4999,
        storeName: 'Manyavar Bistupur',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
      },
      {
        slot: 'Footwear',
        brand: 'Sen Shoes',
        name: 'Handcrafted Embroidered Mojari',
        size: '8',
        price: 1299,
        mrp: 2199,
        storeName: 'Sen Shoes Manglam',
        imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80'
      },
      {
        slot: 'Accessory',
        brand: 'Titan',
        name: 'Classique Gold Dial Watch',
        size: 'Free',
        price: 2495,
        mrp: 3495,
        storeName: 'Helios Bistupur',
        imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'bundle_date_night_chic',
    occasionTitle: 'Chic Date Night Look',
    occasionSubtitle: 'Curated from Westside P&M Mall & Dhane Bags',
    tagline: 'Sleek Party Dress + Stilettos + Quilted Clutch',
    themeColor: 'from-rose-600 to-purple-800',
    bundleDiscount: 350,
    eta: '⚡ 20 MINS',
    items: [
      {
        slot: 'Topwear',
        brand: 'Westside',
        name: 'Satin Wrap Midi Party Dress',
        size: 'M',
        price: 1999,
        mrp: 3299,
        storeName: 'Westside P&M Mall',
        imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80'
      },
      {
        slot: 'Footwear',
        brand: 'Bata Red Label',
        name: 'Strappy Ankle-Strap Stilettos',
        size: '6',
        price: 1499,
        mrp: 2499,
        storeName: 'Bata Sakchi High St',
        imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80'
      },
      {
        slot: 'Accessory',
        brand: 'Dhane Bags',
        name: 'Quilted Metallic Evening Clutch',
        size: 'Free',
        price: 899,
        mrp: 1599,
        storeName: 'Dhane Bags Gamharia',
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];

interface OutfitBundlerProps {
  onAddBundleToCart: (items: any[]) => void;
}

export const ZustagOutfitBundler: React.FC<OutfitBundlerProps> = ({ onAddBundleToCart }) => {
  const [selectedBundleIdx, setSelectedBundleIdx] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const bundle = CURATED_BUNDLES[selectedBundleIdx];
  const totalMRP = bundle.items.reduce((acc, i) => acc + i.mrp, 0);
  const totalPrice = bundle.items.reduce((acc, i) => acc + i.price, 0) - bundle.bundleDiscount;

  const handleAddBundle = () => {
    onAddBundleToCart(bundle.items);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 my-8">
      <div className="bg-gradient-to-r from-[#182344] via-[#243768] to-[#182344] rounded-2xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Ambient Shimmer Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#4ab6d4_1px,transparent_1px)] opacity-15 [background-size:20px_20px]" />

        {/* Top Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI OCCASION STYLIST &bull; 1-CLICK COMPLETE LOOKS</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">
              Get Dressed in 25 Minutes
            </h2>
            <p className="text-xs text-slate-300">
              Coordinated fashion bundles from nearby Jamshedpur showrooms delivered together in a single rider package.
            </p>
          </div>

          {/* Bundle Selector Tabs */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
            {CURATED_BUNDLES.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setSelectedBundleIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedBundleIdx === idx
                    ? 'bg-[#ff3f6c] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {b.occasionTitle.split(' ')[0]} Look
              </button>
            ))}
          </div>
        </div>

        {/* Main Bundle Card Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 items-center">
          {/* Bundle Items (2 Cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bundle.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3 text-[#282c3f] shadow-md border border-white/20 flex flex-col justify-between group hover:scale-102 transition-transform duration-300"
              >
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-slate-100 mb-2.5">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#182344] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                    {item.slot}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-black text-xs text-[#282c3f] truncate">
                    {item.brand}
                  </div>
                  <div className="text-[11px] text-[#535766] truncate font-normal">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-[#7e818c]">
                    Size: <strong>{item.size}</strong> &bull; {item.storeName.split(' ')[0]}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="font-extrabold text-[#282c3f]">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#7e818c] line-through">
                      ₹{item.mrp.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Summary & 1-Click Action Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                <span>CONSOLIDATED BUNDLE</span>
                <span className="bg-[#03a685] text-white text-[10px] font-black px-2 py-0.5 rounded">
                  {bundle.eta} SLA
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                {bundle.occasionTitle}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {bundle.tagline}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total 3 Items MRP</span>
                <span className="line-through">₹{totalMRP.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>AI Bundle Combo Discount</span>
                <span>-₹{bundle.bundleDiscount} Instant</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-1 border-t border-white/10">
                <span>Bundle Total</span>
                <span className="text-cyan-300">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleAddBundle}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                addedSuccess
                  ? 'bg-[#03a685] text-white'
                  : 'bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] hover:opacity-95 text-white'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Bundle Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complete Outfit (3 Items)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
