'use client';

import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  Zap, 
  ChevronDown, 
  Store, 
  Bike, 
  Activity,
  Layers,
  Sparkles,
  Building2,
  Sun,
  ShieldCheck,
  Clock,
  Package,
  CreditCard,
  Gift,
  PhoneCall,
  Crown,
  Coins,
  Compass
} from 'lucide-react';
import { JAMSHEDPUR_ZONES } from '@zustag/domain-core';
import { ZustagMegaMenu } from './ZustagMegaMenu';

interface ZustagHeaderProps {
  selectedZone: string;
  onSelectZone: (zoneKey: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  activeView: 'customer' | 'merchant' | 'rider' | 'ops' | 'market_map';
  onSelectView: (view: 'customer' | 'merchant' | 'rider' | 'ops' | 'market_map') => void;
  onSelectCategoryNav?: (cat: string) => void;
  onSelectBrand?: (brand: string) => void;
  greencardPoints?: number;
  onOpenStoreLocator?: () => void;
}

export const ZustagHeader: React.FC<ZustagHeaderProps> = ({
  selectedZone,
  onSelectZone,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  activeView,
  onSelectView,
  onSelectCategoryNav,
  onSelectBrand,
  greencardPoints = 450,
  onOpenStoreLocator
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showProfileFlyout, setShowProfileFlyout] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const currentZone = JAMSHEDPUR_ZONES[selectedZone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;

  const navItems = [
    { label: 'MEN', key: 'men', underlineColor: 'border-[#ee5f73]', textColor: 'hover:text-[#ee5f73]' },
    { label: 'WOMEN', key: 'women', underlineColor: 'border-[#fb56c1]', textColor: 'hover:text-[#fb56c1]' },
    { label: 'KIDS', key: 'kids', underlineColor: 'border-[#f26a10]', textColor: 'hover:text-[#f26a10]' },
    { label: 'HOME', key: 'home', underlineColor: 'border-[#f2c210]', textColor: 'hover:text-[#f2c210]' },
    { label: 'BEAUTY', key: 'beauty', underlineColor: 'border-[#0db7af]', textColor: 'hover:text-[#0db7af]' },
    { label: 'GENZ', key: 'genz', underlineColor: 'border-[#ff3f6c]', textColor: 'hover:text-[#ff3f6c]' },
    { label: 'STUDIO', key: 'studio', underlineColor: 'border-[#ff3f6c]', textColor: 'hover:text-[#ff3f6c]', isNew: true },
    { label: 'SHOWROOMS', key: 'showrooms', underlineColor: 'border-[#2564ea]', textColor: 'hover:text-[#2564ea]', isExpress: true }
  ];

  return (
    <header 
      className="sticky top-0 z-50 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] border-b border-[#f0f0f2]"
      onMouseLeave={() => {
        setHoveredCategory(null);
        setShowProfileFlyout(false);
      }}
    >
      {/* 1. Top Hyperlocal Weather, Greencard Loyalty & Dispatch SLA Micro-Bar (Brand Logo Gradient) */}
      <div className="bg-gradient-to-r from-[#ff3f6c] via-[#f26a10] to-[#ff905a] text-white text-[11px] font-medium py-1.5 px-4 sm:px-10 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-black text-white drop-shadow-xs">
            <Sun className="w-3.5 h-3.5 text-amber-200" />
            <span>28°C Jamshedpur</span>
          </div>
          <span className="text-white/40">|</span>
          <div className="flex items-center gap-1.5 text-white font-bold">
            <span className="w-2 h-2 rounded-full bg-white shadow-xs animate-ping" />
            <span>42 Showroom Couriers Active</span>
          </div>
          <span className="text-white/40 hidden md:inline">|</span>
          
          {/* Pantaloons-Style Greencard Loyalty Points Pill */}
          <div 
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 border border-white/40 text-white px-2.5 py-0.5 rounded-full cursor-pointer transition-all select-none shadow-2xs backdrop-blur-xs"
            title="Zustag Greencard Omnichannel Loyalty Balance"
          >
            <Coins className="w-3 h-3 text-amber-200 fill-amber-200 animate-bounce" />
            <span className="font-black text-[10px] tracking-wide text-white">
              GREENCARD: <strong className="text-yellow-100 font-mono">{greencardPoints} PTS</strong> (₹{greencardPoints})
            </span>
          </div>

          <span className="text-white/40 hidden md:inline">|</span>
          <span className="text-white/90 hidden md:inline font-semibold">
            Avg Showroom Dispatch: <strong className="text-white font-black underline decoration-white/40">18 Minutes</strong>
          </span>
        </div>

        {/* Right Micro Bar Links (Store Locator + Platform Switcher) */}
        <div className="flex items-center gap-3">
          {onOpenStoreLocator && (
            <button
              onClick={onOpenStoreLocator}
              className="text-[11px] text-white hover:text-yellow-200 font-black flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>STORE LOCATOR</span>
            </button>
          )}

          {/* Multi-role Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 text-[11px] text-white hover:bg-white/30 bg-white/20 px-2.5 py-0.5 rounded-md border border-white/40 font-black cursor-pointer backdrop-blur-xs transition-colors"
            >
              <span className="text-white/90 font-bold">Platform:</span>
              <span className="uppercase text-white font-black">{activeView.replace('_', ' ')}</span>
              <ChevronDown className="w-3 h-3 text-white" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-[#eaeaec] rounded-xl shadow-2xl py-1 z-50 text-[#1e2434]">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#7e818c] border-b border-[#f5f5f6]">
                  Switch Operating Platform
                </div>
                <button
                  onClick={() => { onSelectView('customer'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#f5f5f7] ${activeView === 'customer' ? 'font-bold text-[#ff3f6c]' : ''}`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#ff3f6c]" />
                  Customer Storefront
                </button>
                <button
                  onClick={() => { onSelectView('market_map'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#f5f5f7] ${activeView === 'market_map' ? 'font-bold text-[#2564ea]' : ''}`}
                >
                  <Building2 className="w-4 h-4 text-[#2564ea]" />
                  Jamshedpur & Gamharia Market Map
                </button>
                <button
                  onClick={() => { onSelectView('merchant'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#f5f5f7] ${activeView === 'merchant' ? 'font-bold text-[#2564ea]' : ''}`}
                >
                  <Store className="w-4 h-4 text-[#2564ea]" />
                  Showroom Merchant POS
                </button>
                <button
                  onClick={() => { onSelectView('rider'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#f5f5f7] ${activeView === 'rider' ? 'font-bold text-[#03a685]' : ''}`}
                >
                  <Bike className="w-4 h-4 text-[#03a685]" />
                  30-Min Rider Dispatch
                </button>
                <button
                  onClick={() => { onSelectView('ops'); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#f5f5f7] ${activeView === 'ops' ? 'font-bold text-[#f26a10]' : ''}`}
                >
                  <Activity className="w-4 h-4 text-[#f26a10]" />
                  Ops Local Fashion Graph
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Top Header */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 h-20 flex items-center justify-between gap-6">
        {/* Left: Brand Logo + Blinkit 18-Min Delivery Badge */}
        <div className="flex items-center gap-4 shrink-0">
          <div 
            onClick={() => onSelectView('customer')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="relative w-11 h-9 flex items-center justify-center">
              <svg viewBox="0 0 54 40" className="w-full h-full fill-none">
                <path d="M6 34C6 34 10 12 18 10C26 8 26 30 32 30C38 30 38 10 46 10C52 10 50 34 50 34" stroke="url(#zustagGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="zustagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff3f6c" />
                    <stop offset="50%" stopColor="#f26a10" />
                    <stop offset="100%" stopColor="#ff905a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-black text-2xl tracking-tighter text-[#1e2434] font-display">
              ZUSTAG
            </span>
          </div>

          {/* Blinkit-Style 18-Min Live Delivery Pill */}
          <div 
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-2 bg-[#fdf2e9] hover:bg-[#fce5d4] border border-[#fbd3b6] px-3 py-1.5 rounded-xl cursor-pointer transition-all select-none shadow-xs group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#f26a10] to-[#ff3f6c] text-white flex items-center justify-center font-black shadow-xs shrink-0">
              <Zap className="w-3.5 h-3.5 fill-white animate-pulse" />
            </div>

            <div className="text-left">
              <div className="text-[9px] font-black text-[#f26a10] uppercase flex items-center gap-1 leading-none">
                <span>⚡ 18-28 MINS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#03a685] animate-ping" />
              </div>
              <div className="text-xs font-extrabold text-[#1e2434] truncate max-w-[100px] sm:max-w-[130px] leading-tight mt-0.5 flex items-center gap-0.5">
                <span>{currentZone.areaName.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#7e818c] group-hover:text-[#1e2434]" />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Full Spacious Desktop Nav Menu with Category-Colored Underlines */}
        <nav className="hidden md:flex items-center h-20 space-x-1 lg:space-x-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onMouseEnter={() => setHoveredCategory(item.key)}
              onClick={() => {
                if (item.key === 'showrooms') {
                  onSelectView('market_map');
                } else {
                  onSelectView('customer');
                  if (onSelectCategoryNav) onSelectCategoryNav(item.key);
                }
              }}
              className={`relative px-3 lg:px-4 py-6 text-[14px] font-extrabold tracking-wider transition-colors border-b-4 h-full flex items-center cursor-pointer ${
                hoveredCategory === item.key
                  ? `text-[#1e2434] ${item.underlineColor}`
                  : `text-[#1e2434] ${item.textColor} border-transparent hover:${item.underlineColor}`
              }`}
            >
              <span>{item.label}</span>
              {item.isNew && (
                <sup className="text-[9px] font-black text-[#ff3f6c] uppercase ml-1">
                  NEW
                </sup>
              )}
              {item.isExpress && (
                <span className="absolute top-4 right-0 text-[8px] bg-[#ff3f6c] text-white px-1 rounded font-black">
                  30M
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right: Deliver To + Profile + Wishlist + Bag */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          {/* Deliver To Location Pin */}
          <div 
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-1.5 bg-[#f5f5f7] hover:bg-[#eaeaec] px-3.5 py-1.5 rounded-xl cursor-pointer border border-[#eaeaec] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#ff3f6c] shrink-0" />
            <div className="text-left">
              <div className="text-[9px] font-bold text-[#7e818c] uppercase leading-none">Deliver To</div>
              <div className="text-xs font-extrabold text-[#1e2434] truncate max-w-[90px] sm:max-w-[120px] leading-tight mt-0.5">
                {currentZone.areaName.split(' ')[0]}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-[#7e818c]" />
          </div>

          {/* Profile with Rich Myntra/Pantaloons-Style Greencard VIP Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowProfileFlyout(true)}
          >
            <div 
              onClick={() => setShowProfileFlyout(!showProfileFlyout)}
              className="flex flex-col items-center cursor-pointer group px-1 select-none"
            >
              <User className="w-5 h-5 text-[#1e2434] group-hover:text-[#ff3f6c] transition-colors stroke-[1.8]" />
              <span className="text-[11px] font-bold text-[#1e2434] mt-1 group-hover:text-[#ff3f6c]">
                Profile
              </span>
            </div>

            {showProfileFlyout && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#eaeaec] p-4 text-[#1e2434] z-50 animate-slide-in-up space-y-3">
                {/* Greencard Platinum VIP Member Banner */}
                <div className="bg-gradient-to-r from-[#182344] to-[#2564ea] rounded-xl p-3.5 text-white space-y-1.5 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="font-black text-xs uppercase tracking-wider flex items-center gap-1 text-cyan-300">
                      <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>GREENCARD PLATINUM VIP</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-400/40">
                      Active
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <div className="text-[10px] text-slate-300">Loyalty Balance:</div>
                      <div className="text-xl font-black font-mono text-amber-300">
                        {greencardPoints} Points
                      </div>
                    </div>
                    <button 
                      onClick={() => { setShowProfileFlyout(false); onOpenCart(); }}
                      className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all"
                    >
                      Redeem ₹{greencardPoints} Off
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-300 pt-0.5">
                    ✨ Earn 5% Cashback on every 30-min showroom order
                  </div>
                </div>

                <div className="space-y-1 text-xs font-bold text-[#535766]">
                  <button 
                    onClick={() => { setShowProfileFlyout(false); onOpenCart(); }}
                    className="w-full text-left py-1.5 px-2 hover:bg-[#f5f5f7] hover:text-[#ff3f6c] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Package className="w-4 h-4 text-[#7e818c]" />
                    <span>Orders & Doorstep Try-Ons</span>
                  </button>
                  <button 
                    onClick={() => { setShowProfileFlyout(false); }}
                    className="w-full text-left py-1.5 px-2 hover:bg-[#f5f5f7] hover:text-[#ff3f6c] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-[#7e818c]" />
                    <span>Wishlist ({wishlistCount})</span>
                  </button>
                  <button 
                    onClick={() => { setShowProfileFlyout(false); setShowLocationModal(true); }}
                    className="w-full text-left py-1.5 px-2 hover:bg-[#f5f5f7] hover:text-[#ff3f6c] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-[#7e818c]" />
                    <span>Saved Addresses ({currentZone.areaName})</span>
                  </button>
                  <button 
                    onClick={() => { setShowProfileFlyout(false); alert('Zustag 24x7 Jamshedpur Concierge: +91 98350 11982'); }}
                    className="w-full text-left py-1.5 px-2 hover:bg-[#f5f5f7] hover:text-[#ff3f6c] rounded-lg transition-colors flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-[#7e818c]" />
                    <span>24x7 Showroom Concierge</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div 
            onClick={() => onSelectCategoryNav && onSelectCategoryNav('wishlist')}
            className="flex flex-col items-center cursor-pointer group px-1 relative select-none"
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-[#1e2434] group-hover:text-[#ff3f6c] transition-colors stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#ff3f6c] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#1e2434] mt-1 group-hover:text-[#ff3f6c]">
              Wishlist
            </span>
          </div>

          {/* Bag */}
          <div 
            onClick={onOpenCart}
            className="flex flex-col items-center cursor-pointer group px-1 relative select-none"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#1e2434] group-hover:text-[#ff3f6c] transition-colors stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#ff3f6c] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#1e2434] mt-1 group-hover:text-[#ff3f6c]">
              Bag
            </span>
          </div>
        </div>
      </div>

      {/* 3. Mega Menu (Opens on Hover) */}
      <ZustagMegaMenu
        activeCategory={hoveredCategory}
        onSelectCategoryFilter={(cat) => {
          if (onSelectCategoryNav) onSelectCategoryNav(cat);
          setHoveredCategory(null);
        }}
        onSelectBrand={(b) => {
          if (onSelectBrand) onSelectBrand(b);
          setHoveredCategory(null);
        }}
        onSelectView={(v) => {
          onSelectView(v);
          setHoveredCategory(null);
        }}
      />

      {/* 4. Location Picker Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-6 space-y-4 text-[#1e2434] animate-slide-in-up">
            <div className="flex items-center justify-between border-b border-[#eaeaec] pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ff3f6c]" />
                <h3 className="text-base font-extrabold">Select Delivery Locality</h3>
              </div>
              <button 
                onClick={() => setShowLocationModal(false)}
                className="text-[#7e818c] hover:text-[#1e2434] text-xs font-bold"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-[#535766]">
              Choose your Jamshedpur or Gamharia neighborhood to view live 30-minute showroom catalog:
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {Object.entries(JAMSHEDPUR_ZONES).map(([key, zone]) => (
                <button
                  key={key}
                  onClick={() => {
                    onSelectZone(key);
                    setShowLocationModal(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    selectedZone === key
                      ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                      : 'border-[#eaeaec] hover:border-[#1e2434] text-[#1e2434]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-extrabold">{zone.areaName}</div>
                    <div className="text-[10px] text-[#7e818c]">{zone.areaName}, Jamshedpur &bull; Express Dispatch</div>
                  </div>
                  <span className="text-[10px] font-black bg-white px-2 py-1 rounded-full border border-current">
                    ⚡ 30M SLA
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
