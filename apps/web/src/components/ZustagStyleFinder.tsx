'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  PartyPopper, 
  Briefcase, 
  Crown, 
  Palmtree, 
  IndianRupee, 
  Check, 
  Zap, 
  ArrowRight, 
  RotateCcw,
  SlidersHorizontal,
  Shirt
} from 'lucide-react';

interface StyleFinderProps {
  onApplyStyleMatch: (filters: {
    category?: string;
    occasion?: string;
    maxPrice?: number;
    minPrice?: number;
    size?: string;
  }) => void;
  selectedZoneAreaName: string;
}

export const ZustagStyleFinder: React.FC<StyleFinderProps> = ({
  onApplyStyleMatch,
  selectedZoneAreaName
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<'party' | 'work' | 'wedding' | 'casual'>('party');
  const [selectedBudget, setSelectedBudget] = useState<'value' | 'premium' | 'luxury'>('premium');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isApplying, setIsApplying] = useState(false);

  const occasions = [
    { 
      id: 'party', 
      label: 'Party Tonight', 
      subtitle: 'Cocktails & Club Fits', 
      icon: PartyPopper, 
      color: 'from-pink-500 to-rose-500', 
      category: 'dresses' 
    },
    { 
      id: 'work', 
      label: 'Workplace Formals', 
      subtitle: 'Blazers & Executive Chinos', 
      icon: Briefcase, 
      color: 'from-blue-600 to-indigo-600', 
      category: 'shirts' 
    },
    { 
      id: 'wedding', 
      label: 'Wedding & Reception', 
      subtitle: 'Sherwanis & Silk Sarees', 
      icon: Crown, 
      color: 'from-amber-500 to-yellow-600', 
      category: 'wedding' 
    },
    { 
      id: 'casual', 
      label: 'Casual Weekend', 
      subtitle: 'Relaxed Denims & Tees', 
      icon: Palmtree, 
      color: 'from-emerald-500 to-teal-600', 
      category: 't-shirts' 
    }
  ];

  const budgets = [
    { id: 'value', label: 'Under ₹999', subtitle: 'Smart Value Drops', max: 999, min: 0 },
    { id: 'premium', label: '₹1,000 – ₹2,499', subtitle: 'Most Popular Fits', max: 2499, min: 1000 },
    { id: 'luxury', label: '₹2,500+', subtitle: 'Showroom Luxury Edition', max: 99999, min: 2500 }
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleSearch = () => {
    setIsApplying(true);
    const activeOccasionObj = occasions.find(o => o.id === selectedOccasion);
    const activeBudgetObj = budgets.find(b => b.id === selectedBudget);

    setTimeout(() => {
      onApplyStyleMatch({
        category: activeOccasionObj?.category,
        occasion: selectedOccasion,
        minPrice: activeBudgetObj?.min,
        maxPrice: activeBudgetObj?.max,
        size: selectedSize
      });
      setIsApplying(false);

      const el = document.getElementById('showroom-products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const handleReset = () => {
    setSelectedOccasion('party');
    setSelectedBudget('premium');
    setSelectedSize('M');
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-8 py-5">
      <div className="bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-slate-700/60">
        {/* Decorative Background Accents */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#ff3f6c]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#03a685]/20 blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-lg shrink-0">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-wide uppercase font-display">
                  3-CLICK "STYLE FINDER" WIZARD
                </h3>
                <span className="text-[10px] bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  AI OCCASION ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Pick your occasion, budget & size ➔ Find live showroom outfits in <strong className="text-white">{selectedZoneAreaName}</strong> within 15–20 minutes!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleReset}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5 relative z-10">
          
          {/* Step 1: Occasion (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-[10px] font-black">
                1
              </span>
              <span>Step 1: Select Your Occasion</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {occasions.map((occ) => {
                const IconComponent = occ.icon;
                const isSelected = selectedOccasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id as any)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-2.5 relative ${
                      isSelected
                        ? 'bg-white text-[#1e2434] border-white shadow-lg scale-[1.02]'
                        : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${occ.color} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black truncate">{occ.label}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-[#535766]' : 'text-slate-300'}`}>
                        {occ.subtitle}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#ff3f6c] text-white flex items-center justify-center absolute top-2 right-2">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Budget Range (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-black">
                2
              </span>
              <span>Step 2: Choose Budget</span>
            </div>

            <div className="space-y-2">
              {budgets.map((b) => {
                const isSelected = selectedBudget === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id as any)}
                    className={`w-full p-2.5 px-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-white text-[#1e2434] border-white shadow-lg scale-[1.02]'
                        : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black">{b.label}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-[#535766]' : 'text-slate-300'}`}>
                        {b.subtitle}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-amber-100 text-amber-900' : 'bg-white/10 text-slate-200'
                      }`}>
                        ⚡ 30M
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#03a685] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Size & Find Action (3 cols) */}
          <div className="lg:col-span-3 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[11px] font-black uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-rose-400 text-slate-950 flex items-center justify-center text-[10px] font-black">
                  3
                </span>
                <span>Step 3: Size</span>
              </div>

              {/* Size Selector Buttons */}
              <div className="flex items-center gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      selectedSize === s
                        ? 'bg-white text-[#ff3f6c] border-white shadow-md scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Trigger */}
            <button
              disabled={isApplying}
              onClick={handleSearch}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#ff3f6c] via-[#f26a10] to-[#ff3f6c] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-50 group"
            >
              {isApplying ? (
                <span>Scanning Showrooms...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white animate-bounce" />
                  <span>Find Matching Showroom Fits</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
