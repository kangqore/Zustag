'use client';

import React from 'react';
import { Zap, Sparkles } from 'lucide-react';

interface CategoryTrayItem {
  id: string;
  name: string;
  categoryFilter: string;
  imageUrl: string;
  badge?: string;
  isHot?: boolean;
}

const TRAY_CATEGORIES: CategoryTrayItem[] = [
  {
    id: 't_tshirts',
    name: 'T-Shirts & Polos',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80',
    badge: 'Under ₹499',
    isHot: true
  },
  {
    id: 't_shirts',
    name: 'Formal Shirts',
    categoryFilter: 'shirts',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80',
    badge: '18M Dispatch'
  },
  {
    id: 't_jeans',
    name: 'Levi\'s & Denims',
    categoryFilter: 'jeans',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80',
    badge: 'Min 40% Off'
  },
  {
    id: 't_ethnic',
    name: 'Ethnic & Kurtas',
    categoryFilter: 'ethnic',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    badge: 'Manyavar/Soch',
    isHot: true
  },
  {
    id: 't_dresses',
    name: 'Party Dresses',
    categoryFilter: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=300&q=80',
    badge: 'Trending'
  },
  {
    id: 't_footwear',
    name: 'Sneakers & Shoes',
    categoryFilter: 'footwear',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=300&q=80',
    badge: 'Sen Shoes/Bata'
  },
  {
    id: 't_watches',
    name: 'Luxury Watches',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=300&q=80',
    badge: 'Helios Titan'
  },
  {
    id: 't_bags',
    name: 'Bags & Belts',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80',
    badge: 'Dhane Bags'
  }
];

interface QuickCategoryTrayProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const ZustagQuickCategoryTray: React.FC<QuickCategoryTrayProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-xs border-y border-[#eaeaec] py-4.5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Zap className="w-3 h-3 fill-white text-white" />
              <span>BLINK-SPEED FASHION</span>
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-[#1e2434] uppercase tracking-wider font-display">
              Quick Category Picks
            </h3>
          </div>
          <span className="text-[11px] text-[#7e818c] font-semibold hidden sm:inline">
            ⚡ Direct Showroom Packaging in 5 Mins &bull; 100% CCTV Verified
          </span>
        </div>

        {/* Circular Story Trays */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {TRAY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.categoryFilter;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.categoryFilter)}
                className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group select-none"
              >
                {/* Story Ring Outer Circle */}
                <div
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[#ff3f6c] via-[#f26a10] to-[#ff905a] ring-2 ring-[#ff3f6c] scale-105 shadow-md'
                      : 'bg-gradient-to-tr from-slate-200 to-slate-300 group-hover:from-[#ff3f6c] group-hover:to-[#f26a10] group-hover:scale-105 shadow-2xs'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {cat.badge && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1e2434] text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-xs border border-white/40">
                      {cat.badge}
                    </div>
                  )}
                </div>

                <span
                  className={`text-[11px] sm:text-xs font-bold text-center truncate max-w-[85px] transition-colors mt-0.5 ${
                    isSelected ? 'text-[#ff3f6c] font-black' : 'text-[#1e2434] group-hover:text-[#ff3f6c]'
                  }`}
                >
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
