'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Sun, 
  CloudRain, 
  Moon, 
  PartyPopper, 
  Briefcase, 
  Crown, 
  Zap, 
  ArrowRight, 
  Store as StoreIcon, 
  Clock,
  Flame,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface AIPredictiveFeedProps {
  selectedZoneAreaName: string;
  onSelectCategory: (cat: string) => void;
  onTriggerAIStylist?: (prompt?: string) => void;
}

interface SmartFeedCard {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  weatherTag: string;
  bgGradient: string;
  borderColor: string;
  targetCategory: string;
  aiStylistPrompt: string;
  courierCount: number;
  avgSlaMinutes: number;
  highlightStores: string[];
}

const PREDICTIVE_CARDS: SmartFeedCard[] = [
  {
    id: 'evening_nightlife',
    badge: '🌙 EVENING DINNER & PARTY SURGE',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Nightlife & Dinner Fits Packing in Bistupur',
    subtitle: 'High-contrast silk dresses, dark denim & statement accessories ready for immediate dispatch.',
    weatherTag: '28°C • Clear Evening • Jamshedpur',
    bgGradient: 'from-[#0f172a] via-[#1e1b4b] to-[#311042]',
    borderColor: 'border-indigo-500/40',
    targetCategory: 'dresses',
    aiStylistPrompt: 'Style me for an upscale dinner party in Bistupur tonight',
    courierCount: 28,
    avgSlaMinutes: 18,
    highlightStores: ['Westside P&M Mall', "Levi's Bistupur", 'Soch Sakchi']
  },
  {
    id: 'climate_linen',
    badge: '🌦️ 28°C CLIMATE-OPTIMIZED EDIT',
    badgeColor: 'bg-amber-500 text-slate-900 font-black',
    title: 'Pure Breathable Linen & Cotton Drops',
    subtitle: 'Air-permeable organic fabrics calibrated for Jamshedpur daytime humidity and long comfort.',
    weatherTag: '28°C • Warm & Humid • Local AI Match',
    bgGradient: 'from-[#422006] via-[#291305] to-[#1c1917]',
    borderColor: 'border-amber-500/40',
    targetCategory: 'shirts',
    aiStylistPrompt: 'Light breathable 100% linen outfit for 28°C Jamshedpur weather',
    courierCount: 34,
    avgSlaMinutes: 16,
    highlightStores: ['Fabindia Bistupur', 'Peter England Sakchi', 'Zudio Gamharia']
  },
  {
    id: 'wedding_festive',
    badge: '👑 ROYAL WEDDING & FESTIVE SEASON',
    badgeColor: 'bg-gradient-to-r from-amber-500 to-rose-500 text-white',
    title: 'Manyavar & Soch Silk Festive Edits',
    subtitle: 'Hand-embroidered sherwanis, Banarasi sarees & festive kurta sets with 10-min doorstep try-on.',
    weatherTag: 'Peak Festive Surge • Free Doorstep Try-On',
    bgGradient: 'from-[#450a0a] via-[#2a0808] to-[#1a0505]',
    borderColor: 'border-rose-500/40',
    targetCategory: 'ethnic',
    aiStylistPrompt: 'Traditional royal wedding guest outfit with sherwani or silk saree',
    courierCount: 42,
    avgSlaMinutes: 20,
    highlightStores: ['Manyavar Mohey Bistupur', 'Kalamandir Sakchi', 'Raymond P&M']
  },
  {
    id: 'corporate_exec',
    badge: '💼 TATA STEEL CORPORATE MORNINGS',
    badgeColor: 'bg-blue-600 text-white',
    title: 'Boardroom-Ready Formal Shirts & Trousers',
    subtitle: 'Crisp Egyptian cotton formals, tailored blazers & leather shoes packed and ready for executive presentation.',
    weatherTag: 'Corporate SLA Active • 18M Dispatch',
    bgGradient: 'from-[#082f49] via-[#0c4a6e] to-[#03253b]',
    borderColor: 'border-cyan-500/40',
    targetCategory: 'shirts',
    aiStylistPrompt: 'Crisp corporate meeting formals for Tata Steel presentation',
    courierCount: 22,
    avgSlaMinutes: 15,
    highlightStores: ['Peter England Sakchi', 'Louis Philippe Bistupur', 'Bata Boulevard']
  }
];

export const ZustagAIPredictiveFeed: React.FC<AIPredictiveFeedProps> = ({
  selectedZoneAreaName,
  onSelectCategory,
  onTriggerAIStylist
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle through predictive feeds every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PREDICTIVE_CARDS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const card = PREDICTIVE_CARDS[activeIdx];

  const handleApplyFeed = () => {
    onSelectCategory(card.targetCategory);
    const el = document.getElementById('showroom-products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 my-4">
      <div 
        className={`relative rounded-3xl p-5 sm:p-7 text-white bg-gradient-to-r ${card.bgGradient} border-2 ${card.borderColor} shadow-xl overflow-hidden transition-all duration-700`}
      >
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff3f6c]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#2564ea]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Official Banner Name Header Strip */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black uppercase tracking-wider text-xs text-white font-display">
                ZUSTAG SMART WEATHER & OCCASION FEED
              </span>
              <span className="text-[9px] bg-white/20 text-white font-black px-2 py-0.5 rounded-full uppercase">
                AI REASONER
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-300">
            <span>Live City Telemetry: <strong>{selectedZoneAreaName}</strong></span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Column: AI Weather & City Calendar Telemetry */}
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full shadow-xs ${card.badgeColor} tracking-wide`}>
                {card.badge}
              </span>
              <span className="text-[11px] bg-white/15 backdrop-blur-md px-2.5 py-0.8 rounded-full font-bold border border-white/20 text-slate-200">
                🌦️ {card.weatherTag}
              </span>
              <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1 bg-emerald-950/60 px-2 py-0.8 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{card.courierCount} Couriers in {selectedZoneAreaName}</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display tracking-tight leading-tight">
              {card.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {card.subtitle}
            </p>

            {/* Showroom Hubs Highlight */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
              <span className="text-[10px] uppercase font-black text-slate-400">In-Stock At:</span>
              {card.highlightStores.map((st, idx) => (
                <span key={idx} className="bg-white/10 px-2 py-0.5 rounded-lg text-[11px] font-bold border border-white/10">
                  🏬 {st}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Action CTAs + Pagination */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0">
            <div className="text-left lg:text-right space-y-0.5">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Fastest Dispatch SLA</div>
              <div className="text-2xl font-black text-[#ff3f6c] flex items-center lg:justify-end gap-1 font-mono">
                <Zap className="w-5 h-5 fill-current" />
                <span>{card.avgSlaMinutes} MINUTES</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleApplyFeed}
                className="flex-1 sm:flex-none py-3 px-5 bg-gradient-to-r from-[#ff3f6c] via-[#f26a10] to-[#ff3f6c] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop This Edit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onTriggerAIStylist && (
                <button
                  onClick={() => onTriggerAIStylist(card.aiStylistPrompt)}
                  className="py-3 px-4 bg-white/15 hover:bg-white/25 text-white font-black text-xs uppercase tracking-wider rounded-2xl border border-white/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="hidden sm:inline">AI Stylist</span>
                </button>
              )}
            </div>

            {/* Carousel Tabs */}
            <div className="flex items-center gap-1.5 pt-1 self-center lg:self-end">
              {PREDICTIVE_CARDS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeIdx === idx ? 'w-7 bg-[#ff3f6c]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
