'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Zap, ArrowRight, ShieldCheck, Copy, Check, Store } from 'lucide-react';
import { Store as StoreType, LocalAvailabilityItem } from '@zustag/domain-core';
import { ZustagUniversalSearch } from './ZustagUniversalSearch';

interface CategoryGridItem {
  id: string;
  name: string;
  discount: string;
  categoryFilter: string;
  imageUrl: string;
  badge: string;
  badgeColor?: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80';

export const ZUSTAG_CATEGORIES: CategoryGridItem[] = [
  // Row 1: Traditional, Festive & Formal Highlights (6 Items)
  {
    id: 'cat_ethnic',
    name: 'Ethnic Wear',
    discount: '50-80% OFF',
    categoryFilter: 'ethnic',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ 14 Bistupur Stores',
    badgeColor: 'bg-rose-100/90 text-rose-800 border-rose-200'
  },
  {
    id: 'cat_saree',
    name: 'Saree Wear',
    discount: '40-80% OFF',
    categoryFilter: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    badge: '✨ Soch & Kalamandir',
    badgeColor: 'bg-pink-100/90 text-pink-800 border-pink-200'
  },
  {
    id: 'cat_wedding',
    name: 'Wedding Wear',
    discount: '40-70% OFF',
    categoryFilter: 'ethnic',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    badge: '👑 Manyavar Mohey',
    badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },
  {
    id: 'cat_festival',
    name: 'Festival Wear',
    discount: '50-80% OFF',
    categoryFilter: 'ethnic',
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    badge: '🪔 Sakchi High Street',
    badgeColor: 'bg-orange-100/90 text-orange-900 border-orange-200'
  },
  {
    id: 'cat_casual',
    name: 'Casual Wear',
    discount: '40-80% OFF',
    categoryFilter: 'shirts',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    badge: '🔥 18M Avg Delivery',
    badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },
  {
    id: 'cat_western',
    name: 'Western Wear',
    discount: '40-80% OFF',
    categoryFilter: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    badge: '✨ Sonari Boutiques',
    badgeColor: 'bg-purple-100/90 text-purple-900 border-purple-200'
  },

  // Row 2: Active, Sportswear & Office Fits (6 Items)
  {
    id: 'cat_m_active',
    name: "Men's Activewear",
    discount: '30-70% OFF',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    badge: '● 10 Showrooms Active',
    badgeColor: 'bg-emerald-100/90 text-emerald-900 border-emerald-200'
  },
  {
    id: 'cat_w_active',
    name: "Women's Activewear",
    discount: '30-70% OFF',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ P&M Mall Flagships',
    badgeColor: 'bg-cyan-100/90 text-cyan-900 border-cyan-200'
  },
  {
    id: 'cat_jeans',
    name: 'Jeans & Denims',
    discount: '40-80% OFF',
    categoryFilter: 'jeans',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    badge: "⚡ Levi's & Spykar",
    badgeColor: 'bg-blue-100/90 text-blue-900 border-blue-200'
  },
  {
    id: 'cat_sportswear',
    name: 'Sportswear',
    discount: '30-80% OFF',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ HRX & Puma',
    badgeColor: 'bg-indigo-100/90 text-indigo-900 border-indigo-200'
  },
  {
    id: 'cat_lounge',
    name: 'Loungewear',
    discount: '30-60% OFF',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Zudio Gamharia',
    badgeColor: 'bg-emerald-100/90 text-emerald-900 border-emerald-200'
  },
  {
    id: 'cat_office',
    name: 'Office Wear',
    discount: '40-70% OFF',
    categoryFilter: 'shirts',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Blackberrys & Raymond',
    badgeColor: 'bg-slate-100/90 text-slate-900 border-slate-200'
  },

  // Row 3: Essentials, Kids, Footwear (6 Items)
  {
    id: 'cat_innerwear',
    name: 'Innerwear',
    discount: 'UP TO 70% OFF',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    badge: '● Express Dispatch',
    badgeColor: 'bg-slate-100/90 text-slate-900 border-slate-200'
  },
  {
    id: 'cat_lingerie',
    name: 'Lingerie',
    discount: 'UP TO 70% OFF',
    categoryFilter: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80',
    badge: '✨ Premium Lace',
    badgeColor: 'bg-pink-100/90 text-pink-900 border-pink-200'
  },
  {
    id: 'cat_kids',
    name: 'Kids Wear',
    discount: '50-70% OFF',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ V-Mart & Pantaloons',
    badgeColor: 'bg-cyan-100/90 text-cyan-900 border-cyan-200'
  },
  {
    id: 'cat_m_shoes',
    name: "Men's Footwear",
    discount: '50-70% OFF',
    categoryFilter: 'footwear',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Sen Shoes Manglam',
    badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },
  {
    id: 'cat_w_shoes',
    name: "Women's Footwear",
    discount: '40-80% OFF',
    categoryFilter: 'footwear',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    badge: '● 30M Doorstep Pick',
    badgeColor: 'bg-purple-100/90 text-purple-900 border-purple-200'
  },
  {
    id: 'cat_m_ethnic',
    name: "Men's Ethnic Sets",
    discount: 'UP TO 60% OFF',
    categoryFilter: 'ethnic',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
    badge: '✨ Kurta Pyjama Hub',
    badgeColor: 'bg-rose-100/90 text-rose-900 border-rose-200'
  },

  // Row 4: Bags, Luxury & Jewellery (6 Items)
  {
    id: 'cat_wallets',
    name: 'Bags, Belts & Wallets',
    discount: '40-70% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Dhane Bags Gamharia',
    badgeColor: 'bg-emerald-100/90 text-emerald-900 border-emerald-200'
  },
  {
    id: 'cat_handbags',
    name: 'Handbags & Clutches',
    discount: '40-80% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ HAPPY BAG STORY',
    badgeColor: 'bg-cyan-100/90 text-cyan-900 border-cyan-200'
  },
  {
    id: 'cat_backpacks',
    name: 'Bags & Backpacks',
    discount: '30-80% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Wildcraft & Skybags',
    badgeColor: 'bg-emerald-100/90 text-emerald-900 border-emerald-200'
  },
  {
    id: 'cat_trolleys',
    name: 'Trolleys & Luggage',
    discount: '30-70% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80',
    badge: '● 30M Direct Delivery',
    badgeColor: 'bg-purple-100/90 text-purple-900 border-purple-200'
  },
  {
    id: 'cat_watches',
    name: 'Watches',
    discount: 'UP TO 80% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Helios Luxury',
    badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },
  {
    id: 'cat_jewellery',
    name: 'Jewellery & Ornaments',
    discount: 'UP TO 80% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    badge: '✨ Shree Mahabir Gamharia',
    badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },

  // Row 5: Beauty, Home & Lifestyle Accessories (6 Items)
  {
    id: 'cat_beauty',
    name: 'Beauty & Makeup',
    discount: 'UP TO 60% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    badge: '🔥 Sakchi Lifestyle',
    badgeColor: 'bg-rose-100/90 text-rose-900 border-rose-200'
  },
  {
    id: 'cat_grooming',
    name: 'Grooming & Perfumes',
    discount: 'UP TO 60% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=600&q=80',
    badge: '● 100% Original',
    badgeColor: 'bg-teal-100/90 text-teal-900 border-teal-200'
  },
  {
    id: 'cat_home',
    name: 'Home Decor & Living',
    discount: '40-70% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    badge: '● Fabindia Kadma',
    badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200'
  },
  {
    id: 'cat_headphones',
    name: 'Headphones & Audio',
    discount: 'UP TO 70% OFF',
    categoryFilter: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    badge: '● Fast Tech SLA',
    badgeColor: 'bg-slate-100/90 text-slate-900 border-slate-200'
  },
  {
    id: 'cat_workwear',
    name: 'Workwear Essentials',
    discount: '40-80% OFF',
    categoryFilter: 'shirts',
    imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Van Heusen Sakchi',
    badgeColor: 'bg-blue-100/90 text-blue-900 border-blue-200'
  },
  {
    id: 'cat_flipflops',
    name: 'Flip-Flops & Slides',
    discount: '30-70% OFF',
    categoryFilter: 'footwear',
    imageUrl: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ Daily Comfort',
    badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200'
  }
];

const HERO_SLIDES = [
  {
    id: 1,
    leftImage: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1200&q=80',
    title: 'Activewear Edition',
    subtitle: 'High-performance quick-dry fabrics from P&M Mall & Bistupur',
    discount: '40-70% Off',
    brands: ['HRX', 'Nike & Puma'],
    categoryKey: 't-shirts'
  },
  {
    id: 2,
    leftImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
    title: 'Trending Denims',
    subtitle: 'Classic straight, slim & relaxed fits with 30-min courier dispatch',
    discount: '40-80% Off',
    brands: ["Levi's", 'Spykar Exclusive'],
    categoryKey: 'jeans'
  },
  {
    id: 3,
    leftImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    title: 'Festive & Bridal Silk',
    subtitle: 'Handcrafted kurtas, sherwanis & sarees from Manyavar & Soch',
    discount: '50-80% Off',
    brands: ['Manyavar', 'Soch Silk Studio'],
    categoryKey: 'ethnic'
  }
];

interface ZustagHeroBannersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  stores?: StoreType[];
  items?: LocalAvailabilityItem[];
  onSelectShowroom?: (storeId: string) => void;
  selectedZone?: string;
  onTriggerAIStylist?: (prompt?: string) => void;
  onTriggerVisualSearch?: () => void;
}

export const ZustagHeroBanners: React.FC<ZustagHeroBannersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery = '',
  onSearchChange = () => {},
  stores = [],
  items = [],
  onSelectShowroom = () => {},
  selectedZone = 'BISTUPUR_MAIN',
  onTriggerAIStylist,
  onTriggerVisualSearch
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('ZUSTAGJSR');
    }
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="w-full bg-transparent space-y-6 sm:space-y-8 pt-3 pb-3">
      {/* 1. Interactive 3D Luxury Coupon Card with 1-Click Copy */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        <div className="relative bg-gradient-to-r from-[#fff6ed] via-[#fff9f5] to-[#fef0e4] border-2 border-dashed border-[#fbc9a4] rounded-3xl p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(242,106,16,0.08)] overflow-hidden group">
          <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-40" />

          {/* Left Headline */}
          <div className="space-y-1 text-center md:text-left z-10">
            <div className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-[#ff3f6c] via-[#f26a10] to-[#ff905a] bg-clip-text text-transparent font-display">
              Get 25% Off
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1e2434] tracking-tight">
              Up To ₹200 Off*
            </div>
          </div>

          {/* Center Interactive Coupon Pill */}
          <div 
            onClick={handleCopyCoupon}
            className="flex flex-col items-center justify-center bg-white px-8 py-3.5 rounded-full border-2 border-[#1e2434] shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer z-10 select-none group/coupon"
          >
            <div className="text-[10px] uppercase tracking-widest text-[#7e818c] font-black flex items-center gap-1">
              <span>COUPON CODE</span>
              <span className="text-[9px] text-[#ff3f6c] font-extrabold">(TAP TO COPY)</span>
            </div>
            <div className="flex items-center gap-2.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-[#1e2434] tracking-wider font-mono">
                ZUSTAGJSR
              </span>
              {copiedCoupon ? (
                <span className="bg-[#03a685] text-white p-1 rounded-full text-xs animate-bounce">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              ) : (
                <span className="text-[#7e818c] group-hover/coupon:text-[#ff3f6c] transition-colors">
                  <Copy className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>

          {/* Right % Badge */}
          <div className="flex items-center gap-4 z-10 text-center md:text-right">
            <div className="text-5xl sm:text-6xl font-black text-[#ff905a]/80 select-none animate-pulse font-display">
              %
            </div>
            <div className="text-xs text-[#535766] font-semibold leading-tight">
              <div className="font-bold text-[#1e2434]">On Your First Showroom Order</div>
              <div className="text-[10px] text-[#7e818c] mt-0.5">T&C Apply &bull; ⚡ 30-Min Jamshedpur Dispatch</div>
            </div>
          </div>
        </div>

        {copiedCoupon && (
          <div className="fixed top-24 right-8 z-50 bg-[#1e2434] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-slide-in-up border border-white/20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#03a685] animate-ping" />
            <span>🎉 Coupon <strong>ZUSTAGJSR</strong> copied! ₹200 Instant Discount unlocked.</span>
          </div>
        )}
      </div>

      {/* 2. Split Hero Slider (Editorial Photo on Left + Brand Card on Right) */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-[#eaeaec] flex flex-col md:flex-row h-[320px] sm:h-[420px]">
          {/* Photo Side with Ken Burns subtle animation */}
          <div className="w-full md:w-2/3 h-full relative overflow-hidden bg-slate-900">
            <img
              src={slide.leftImage}
              alt={slide.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
            
            <div className="absolute bottom-6 left-6 text-white md:hidden space-y-1">
              <span className="bg-[#ff3f6c] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                ⚡ 30-Min Fast Track
              </span>
              <h2 className="text-2xl font-black">{slide.title}</h2>
              <p className="text-lg font-bold text-cyan-300">{slide.discount}</p>
            </div>
          </div>

          {/* Right Card Side */}
          <div className="hidden md:flex md:w-1/3 bg-white flex-col justify-center p-8 sm:p-10 space-y-4 border-l border-[#eaeaec]">
            <div className="flex items-center gap-2">
              {slide.brands.map((b) => (
                <div key={b} className="border border-[#eaeaec] bg-[#fafbfc] px-3 py-1 rounded-lg font-black text-xs tracking-wider text-[#1e2434]">
                  {b}
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1e2434] leading-tight">
                {slide.title}
              </h2>
              <p className="text-xs text-[#7e818c]">
                {slide.subtitle}
              </p>
              <div className="text-2xl font-serif font-bold text-[#ff3f6c] pt-1">
                {slide.discount}
              </div>
            </div>

            <button
              onClick={() => onSelectCategory(slide.categoryKey)}
              className="text-xs font-bold text-[#1e2434] hover:text-[#ff3f6c] transition-colors flex items-center gap-1 cursor-pointer pt-2 group"
            >
              <span>+ Explore 30-Min Collections</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Slider Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-[#ff3f6c]' : 'w-2 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Universal Smart & Intelligent Search Tab */}
      <ZustagUniversalSearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        stores={stores}
        items={items}
        onSelectShowroom={onSelectShowroom}
        onSelectCategory={onSelectCategory}
        selectedZone={selectedZone}
        onTriggerAIStylist={onTriggerAIStylist}
        onTriggerVisualSearch={onTriggerVisualSearch}
      />

      {/* 4. Ultra-Premium 6-Column "SHOP BY CATEGORY" Section (30 Categories) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#ff3f6c] tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDCRAFTED LOCAL COLLECTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e2434] tracking-wider uppercase font-serif mt-0.5">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xs text-[#7e818c] mt-0.5">
              Curated fashion showrooms across Jamshedpur & Gamharia with 30-Minute Fast Track Delivery
            </p>
          </div>
          <span className="text-xs font-bold text-[#ff3f6c]">
            30 Handcrafted Collections
          </span>
        </div>

        {/* 6-Column Framed Category Grid (5 rows x 6 columns = 30 categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
          {ZUSTAG_CATEGORIES.map((item) => {
            const isSelected = selectedCategory === item.categoryFilter;
            return (
              <div
                key={item.id}
                onClick={() => onSelectCategory(item.categoryFilter)}
                className={`category-card-glow group cursor-pointer rounded-2xl border border-[#fbd3b6] bg-gradient-to-b from-white to-[#fefaf7] p-2 shadow-xs transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isSelected ? 'ring-2 ring-[#ff3f6c] border-[#ff3f6c]' : ''
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#f5f5f6]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-2 left-2 z-10">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs backdrop-blur-md border ${item.badgeColor || 'bg-white/90 text-[#1e2434] border-white/50'}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="pt-2.5 pb-1 px-1 text-center space-y-0.5">
                  <div className="text-xs sm:text-[13px] font-bold text-[#1e2434] truncate">
                    {item.name}
                  </div>
                  <div className="text-xs sm:text-sm font-black text-[#1e2434] tracking-tight">
                    {item.discount}
                  </div>
                  <div className="text-[11px] font-bold text-[#7e818c] group-hover:text-[#ff3f6c] transition-colors pt-0.5 flex items-center justify-center gap-1">
                    <span>Shop Now</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Bank Cashback Banner */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 pt-4">
        <div className="bg-gradient-to-r from-[#fae7d4] via-[#fcefe3] to-[#fae7d4] border border-[#f3d2b5] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 text-[#1e2434] shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 rounded-lg bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 flex items-center justify-center text-white text-[9px] font-black shadow-sm shrink-0">
              AXIS / SBI
            </div>
            <div className="text-xs sm:text-base font-extrabold tracking-tight">
              7.5% Cashback + Extra 5% Instant Discount*
              <span className="font-normal text-xs text-[#7e818c] ml-2 hidden md:inline">
                ON FLIPKART AXIS BANK & SBI CREDIT CARDS
              </span>
            </div>
          </div>
          <span className="text-[10px] text-[#7e818c] font-bold uppercase shrink-0">
            *T&C Apply
          </span>
        </div>
      </div>
    </div>
  );
};
