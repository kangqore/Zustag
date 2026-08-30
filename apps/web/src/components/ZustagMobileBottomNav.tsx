'use client';

import React from 'react';
import { Home, Search, Store, Heart, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: 'customer' | 'merchant' | 'rider' | 'ops' | 'market_map';
  onSelectView: (view: 'customer' | 'merchant' | 'rider' | 'ops' | 'market_map') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onFocusSearch: () => void;
}

export const ZustagMobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  onSelectView,
  cartCount,
  wishlistCount,
  onOpenCart,
  onFocusSearch
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#eaeaec] px-3 py-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      {/* Home */}
      <button
        onClick={() => {
          onSelectView('customer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer ${
          activeView === 'customer' ? 'text-[#ff3f6c]' : 'text-[#7e818c] hover:text-[#282c3f]'
        }`}
      >
        <Home className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px] font-black tracking-tight">Home</span>
      </button>

      {/* Universal Search */}
      <button
        onClick={() => {
          onSelectView('customer');
          onFocusSearch();
        }}
        className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[#7e818c] hover:text-[#282c3f] transition-all cursor-pointer"
      >
        <Search className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px] font-bold tracking-tight">Search</span>
      </button>

      {/* Showrooms Hub */}
      <button
        onClick={() => {
          onSelectView('market_map');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-all cursor-pointer relative ${
          activeView === 'market_map' ? 'text-[#2564ea]' : 'text-[#7e818c] hover:text-[#282c3f]'
        }`}
      >
        <Store className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px] font-bold tracking-tight">Stores</span>
        <span className="absolute -top-1 right-1 bg-[#ff3f6c] text-white text-[8px] font-black px-1 rounded-full">
          30M
        </span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => {
          onSelectView('customer');
          const el = document.getElementById('showroom-products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[#7e818c] hover:text-[#282c3f] transition-all cursor-pointer relative"
      >
        <Heart className="w-5 h-5 stroke-[2]" />
        <span className="text-[10px] font-bold tracking-tight">Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-1 right-2 bg-[#ff3f6c] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Bag */}
      <button
        onClick={onOpenCart}
        className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[#03a685] hover:text-[#028b6f] transition-all cursor-pointer relative"
      >
        <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
        <span className="text-[10px] font-black tracking-tight">Bag</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-2 bg-[#ff3f6c] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
