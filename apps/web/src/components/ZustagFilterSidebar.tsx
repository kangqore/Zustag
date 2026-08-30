'use client';

import React, { useState } from 'react';
import { Filter, Zap, RotateCcw, Check, Sparkles, Search, ChevronDown } from 'lucide-react';
import { Store } from '@zustag/domain-core';

interface ZustagFilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  under30Only: boolean;
  onToggleUnder30: () => void;
  selectedShowroom: string;
  onSelectShowroom: (storeId: string) => void;
  stores: Store[];
  onClearAll: () => void;
}

const COLOR_SWATCHES = [
  { id: 'black', name: 'Black', hex: '#18181b' },
  { id: 'white', name: 'White', hex: '#f4f4f5' },
  { id: 'navy', name: 'Navy Blue', hex: '#1e3a8a' },
  { id: 'crimson', name: 'Crimson Red', hex: '#e11d48' },
  { id: 'gold', name: 'Mustard Gold', hex: '#d97706' },
  { id: 'olive', name: 'Olive Green', hex: '#4d7c0f' },
  { id: 'pink', name: 'Blush Pink', hex: '#ec4899' },
  { id: 'beige', name: 'Beige / Cream', hex: '#d6c7a1' }
];

export const ZustagFilterSidebar: React.FC<ZustagFilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  under30Only,
  onToggleUnder30,
  selectedShowroom,
  onSelectShowroom,
  stores,
  onClearAll
}) => {
  const [brandSearch, setBrandSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedDiscount, setSelectedDiscount] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories', count: 182 },
    { id: 'shirts', label: 'Shirts & Formals', count: 48 },
    { id: 't-shirts', label: 'T-Shirts & Polos', count: 54 },
    { id: 'jeans', label: 'Jeans & Denim', count: 32 },
    { id: 'ethnic', label: 'Ethnic & Festive Kurtas', count: 38 },
    { id: 'dresses', label: 'Dresses & Western', count: 26 },
    { id: 'footwear', label: 'Footwear & Sneakers', count: 40 },
    { id: 'accessories', label: 'Watches & Bags', count: 30 }
  ];

  const allBrands = [
    { id: 'all', label: 'All Brands' },
    { id: 'Manyavar', label: 'Manyavar Flagship' },
    { id: 'ZUDIO', label: 'Zudio Tata Trent' },
    { id: 'CITI STYLE', label: 'Citi Style Gamharia' },
    { id: "Levi's", label: "Levi's Store" },
    { id: 'Peter England', label: 'Peter England' },
    { id: 'Westside', label: 'Westside P&M Mall' },
    { id: 'Bata', label: 'Bata Red Label' },
    { id: 'Soch', label: 'Soch Studio Sakchi' },
    { id: 'Sen Shoes', label: 'Sen Shoes Manglam' },
    { id: 'Fabindia', label: 'Fabindia Organic' },
    { id: 'Roadster', label: 'Roadster Outdoor' },
    { id: 'Urban Thread', label: 'Urban Thread' }
  ];

  const filteredBrands = allBrands.filter(b => 
    b.label.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <aside className="w-68 shrink-0 bg-white border border-[#eaeaec] rounded-2xl p-4.5 space-y-5 text-[#1e2434] hidden md:block shadow-[0_2px_8px_rgba(0,0,0,0.02)] sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#eaeaec] pb-3">
        <div className="flex items-center gap-1.5 font-black text-sm uppercase tracking-wider text-[#1e2434] font-display">
          <Filter className="w-4 h-4 text-[#ff3f6c]" />
          <span>FILTERS</span>
        </div>
        <button
          onClick={() => {
            onClearAll();
            setSelectedColor(null);
            setSelectedPriceRange('all');
            setSelectedDiscount('all');
            setBrandSearch('');
          }}
          className="text-[11px] font-black text-[#ff3f6c] uppercase hover:underline cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Clear All
        </button>
      </div>

      {/* 1. Fast Track 30-Min SLA Filter Pill */}
      <div className="space-y-2">
        <span className="text-[11px] font-black uppercase text-[#7e818c] tracking-wider block">
          Delivery Speed SLA
        </span>
        <div
          onClick={onToggleUnder30}
          className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all select-none ${
            under30Only
              ? 'bg-[#fff1f4] border-[#ff3f6c] text-[#ff3f6c] shadow-xs'
              : 'bg-[#f5f5f7] border-[#eaeaec] hover:border-[#1e2434] text-[#1e2434]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${under30Only ? 'fill-[#ff3f6c]' : 'text-[#7e818c]'}`} />
            <div className="text-xs font-black">
              ⚡ 30-Min Fast Express
            </div>
          </div>
          <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
            under30Only ? 'bg-[#ff3f6c] border-[#ff3f6c] text-white' : 'border-[#d4d5d9] bg-white'
          }`}>
            {under30Only && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>
      </div>

      {/* 2. Categories Radio Filter */}
      <div className="space-y-2.5 border-t border-[#f5f5f7] pt-4">
        <span className="text-[11px] font-black uppercase text-[#7e818c] tracking-wider block">
          Categories
        </span>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <label
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex items-center justify-between cursor-pointer text-xs text-[#535766] hover:text-[#1e2434] group py-0.5"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat.id}
                  onChange={() => {}}
                  className="w-3.5 h-3.5 text-[#ff3f6c] focus:ring-[#ff3f6c] accent-[#ff3f6c] cursor-pointer"
                />
                <span className={selectedCategory === cat.id ? 'font-black text-[#1e2434]' : 'group-hover:text-[#1e2434]'}>
                  {cat.label}
                </span>
              </div>
              <span className="text-[10px] text-[#7e818c] font-normal">({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Brands In-Filter Search & List */}
      <div className="space-y-2.5 border-t border-[#f5f5f7] pt-4">
        <span className="text-[11px] font-black uppercase text-[#7e818c] tracking-wider block">
          Brands
        </span>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#7e818c] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full bg-[#f5f5f7] border border-[#eaeaec] rounded-lg pl-8 pr-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-[#1e2434]"
          />
        </div>

        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {filteredBrands.map((b) => (
            <label
              key={b.id}
              onClick={() => onSelectBrand(b.id)}
              className="flex items-center gap-2.5 cursor-pointer text-xs text-[#535766] hover:text-[#1e2434] py-0.5"
            >
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === b.id}
                onChange={() => {}}
                className="w-3.5 h-3.5 text-[#ff3f6c] focus:ring-[#ff3f6c] accent-[#ff3f6c] cursor-pointer"
              />
              <span className={selectedBrand === b.id ? 'font-black text-[#1e2434]' : ''}>
                {b.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Color Swatches Palette */}
      <div className="space-y-2.5 border-t border-[#f5f5f7] pt-4">
        <span className="text-[11px] font-black uppercase text-[#7e818c] tracking-wider block">
          Color Palette
        </span>
        <div className="flex flex-wrap gap-2">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedColor(selectedColor === c.id ? null : c.id)}
              title={c.name}
              className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer relative shadow-2xs ${
                selectedColor === c.id
                  ? 'border-[#ff3f6c] scale-110 ring-2 ring-[#ff3f6c]/30'
                  : 'border-slate-300 hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {selectedColor === c.id && (
                <Check className={`w-3 h-3 absolute inset-0 m-auto ${c.id === 'white' ? 'text-black' : 'text-white'} stroke-[3]`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Discount Range Radios */}
      <div className="space-y-2.5 border-t border-[#f5f5f7] pt-4">
        <span className="text-[11px] font-black uppercase text-[#7e818c] tracking-wider block">
          Discount Range
        </span>
        <div className="space-y-1.5 text-xs text-[#535766]">
          {['10% and above', '30% and above', '50% and above', '70% and above'].map((d) => (
            <label
              key={d}
              onClick={() => setSelectedDiscount(selectedDiscount === d ? 'all' : d)}
              className="flex items-center gap-2.5 cursor-pointer hover:text-[#1e2434] py-0.5"
            >
              <input
                type="radio"
                name="discount"
                checked={selectedDiscount === d}
                onChange={() => {}}
                className="w-3.5 h-3.5 text-[#ff3f6c] focus:ring-[#ff3f6c] accent-[#ff3f6c] cursor-pointer"
              />
              <span className={selectedDiscount === d ? 'font-black text-[#1e2434]' : ''}>
                {d}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
