'use client';

import React from 'react';
import { ShoppingBag, ArrowRight, Zap } from 'lucide-react';
import { CartItem } from './ZustagCartDrawer';

interface FloatingCartBarProps {
  items: CartItem[];
  onOpenCart: () => void;
  areaName: string;
}

export const ZustagFloatingCartBar: React.FC<FloatingCartBarProps> = ({
  items,
  onOpenCart,
  areaName
}) => {
  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:right-8 sm:max-w-md z-40 animate-slide-in-up">
      <div 
        onClick={onOpenCart}
        className="bg-gradient-to-r from-[#03a685] via-[#028b6f] to-[#02755e] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between cursor-pointer hover:scale-102 transition-all border border-emerald-400/40 select-none group"
      >
        {/* Left: Bag Count & Item Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#ff3f6c] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
              {totalCount}
            </span>
          </div>

          <div className="text-left space-y-0.5">
            <div className="text-xs font-black tracking-tight">
              {totalCount} {totalCount === 1 ? 'Item' : 'Items'} &bull; ₹{totalPrice.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-100 font-medium flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
              <span>⚡ 18 Mins to {areaName.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Right: View Bag Button */}
        <div className="flex items-center gap-1 bg-white text-[#03a685] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider group-hover:bg-emerald-50 transition-colors shadow-md">
          <span>View Bag</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
