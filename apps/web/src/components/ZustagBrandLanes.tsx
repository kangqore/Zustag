'use client';

import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Zap, Award } from 'lucide-react';

interface BrandLaneItem {
  id: string;
  name: string;
  tagline: string;
  discount: string;
  brandFilter: string;
  logoText: string;
  bgColor: string;
  textColor: string;
  showroomCount: number;
}

const FEATURED_BRANDS: BrandLaneItem[] = [
  {
    id: 'b_manyavar',
    name: 'Manyavar Mohey',
    tagline: 'Royal Sherwanis & Silk Kurtas',
    discount: 'UP TO 40% OFF',
    brandFilter: 'Manyavar',
    logoText: 'MANYAVAR',
    bgColor: 'bg-gradient-to-br from-amber-900 via-rose-950 to-amber-950',
    textColor: 'text-amber-300',
    showroomCount: 4
  },
  {
    id: 'b_zudio',
    name: 'Zudio (Tata Trent)',
    tagline: 'GenZ Everyday Streetfits',
    discount: 'UNDER ₹999',
    brandFilter: 'ZUDIO',
    logoText: 'ZUDIO',
    bgColor: 'bg-gradient-to-br from-slate-900 via-zinc-900 to-black',
    textColor: 'text-white',
    showroomCount: 3
  },
  {
    id: 'b_peter',
    name: 'Peter England',
    tagline: 'Crisp Oxford Formals & Suits',
    discount: 'MIN 30% OFF',
    brandFilter: 'Peter England',
    logoText: 'PETER ENGLAND',
    bgColor: 'bg-gradient-to-br from-red-900 via-rose-900 to-red-950',
    textColor: 'text-white',
    showroomCount: 5
  },
  {
    id: 'b_levis',
    name: "Levi's Exclusive",
    tagline: 'Iconic 501s & Denim Jackets',
    discount: '40-60% OFF',
    brandFilter: "Levi's",
    logoText: "LEVI'S",
    bgColor: 'bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900',
    textColor: 'text-rose-400',
    showroomCount: 3
  },
  {
    id: 'b_soch',
    name: 'Soch Studio',
    tagline: 'Chanderi & Handcrafted Sarees',
    discount: 'UP TO 50% OFF',
    brandFilter: 'Soch',
    logoText: 'SOCH',
    bgColor: 'bg-gradient-to-br from-pink-950 via-purple-950 to-rose-950',
    textColor: 'text-pink-300',
    showroomCount: 2
  },
  {
    id: 'b_bata',
    name: 'Bata Red Label',
    tagline: 'Italian Leather & Formal Shoes',
    discount: '30-70% OFF',
    brandFilter: 'Bata',
    logoText: 'BATA',
    bgColor: 'bg-gradient-to-br from-red-950 via-rose-950 to-slate-900',
    textColor: 'text-white',
    showroomCount: 6
  }
];

interface BrandLanesProps {
  onSelectBrand: (brand: string) => void;
}

export const ZustagBrandLanes: React.FC<BrandLanesProps> = ({ onSelectBrand }) => {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 my-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#ff3f6c] tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>OFFICIAL BRAND SHOWROOM PARTNERS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1e2434] tracking-wider uppercase font-serif mt-0.5">
            MEDAL WORTHY BRANDS TO BAG
          </h2>
          <p className="text-xs text-[#7e818c]">
            100% Original Certified Showroom Partners across Jamshedpur with 30-Min Fast Track
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
        {FEATURED_BRANDS.map((b) => (
          <div
            key={b.id}
            onClick={() => onSelectBrand(b.brandFilter)}
            className={`group cursor-pointer rounded-2xl p-4 flex flex-col justify-between h-44 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 relative overflow-hidden select-none ${b.bgColor} text-white border border-white/10`}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#03a685]" />
                  <span>Official</span>
                </span>
                <span className="text-[9px] text-cyan-300 font-bold">
                  ⚡ 30M
                </span>
              </div>
              <div className={`text-base sm:text-lg font-black tracking-wider pt-2 ${b.textColor} font-display`}>
                {b.logoText}
              </div>
              <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                {b.tagline}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-black text-amber-300 tracking-tight">
                {b.discount}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
