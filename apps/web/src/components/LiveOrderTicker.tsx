'use client';

import React, { useState, useEffect } from 'react';
import { Zap, ShoppingBag, MapPin, CheckCircle2, X, Sparkles, Store } from 'lucide-react';

interface OrderEvent {
  id: string;
  customerName: string;
  area: string;
  itemTitle: string;
  storeName: string;
  etaMins: number;
  timeAgo: string;
  actionText: string;
}

const SAMPLE_LIVE_ORDERS: OrderEvent[] = [
  {
    id: '1',
    customerName: 'Rahul M.',
    area: 'Circuit House Area',
    itemTitle: 'Levi\'s 511 Slim Fit Jeans',
    storeName: 'P&M Mall Flagship',
    etaMins: 18,
    timeAgo: 'Just now',
    actionText: 'Rider Out for Delivery'
  },
  {
    id: '2',
    customerName: 'Priya S.',
    area: 'Kadma Farm Area',
    itemTitle: 'Soch Chanderi Festive Kurti',
    storeName: 'Bistupur Boulevard',
    etaMins: 22,
    timeAgo: '2m ago',
    actionText: 'Packed at Showroom'
  },
  {
    id: '3',
    customerName: 'Aman K.',
    area: 'Gamharia Auto Cluster',
    itemTitle: 'Zudio Relaxed Cotton Tee',
    storeName: 'Zudio Gamharia',
    etaMins: 14,
    timeAgo: '1m ago',
    actionText: '30-Min Fast Dispatch'
  },
  {
    id: '4',
    customerName: 'Sneha D.',
    area: 'Sakchi Ambagan',
    itemTitle: 'Helios Chronograph Watch',
    storeName: 'Helios Bistupur',
    etaMins: 16,
    timeAgo: '3m ago',
    actionText: 'Assigned to Rider'
  },
  {
    id: '5',
    customerName: 'Vikram J.',
    area: 'Sonari Aerodrome Rd',
    itemTitle: 'needleHat Silk Party Dress',
    storeName: 'Sonari Boutique District',
    etaMins: 19,
    timeAgo: 'Just now',
    actionText: 'Confirmed & Bagged'
  }
];

export const LiveOrderTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SAMPLE_LIVE_ORDERS.length);
        setIsVisible(true);
      }, 400);
    }, 6000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentOrder = SAMPLE_LIVE_ORDERS[currentIndex];

  return (
    <div className="fixed bottom-5 left-5 z-40 w-56 sm:w-60 aspect-square hidden sm:block select-none">
      <div 
        className={`w-full h-full bg-white/95 backdrop-blur-md border border-[#eaeaec] rounded-2xl p-3.5 shadow-2xl transition-all duration-500 transform flex flex-col justify-between ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-black text-[#ff3f6c] tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3f6c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff3f6c]" />
            </span>
            <span>LIVE ORDER</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[9px] text-[#7e818c] font-medium">{currentOrder.timeAgo}</span>
            <button 
              onClick={() => setIsDismissed(true)}
              className="text-[#7e818c] hover:text-[#282c3f] p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Content */}
        <div className="space-y-1.5 my-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff3f6c] to-[#ff905a] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Zap className="w-4 h-4 fill-white animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-[#282c3f] truncate font-display">
                {currentOrder.customerName}
              </div>
              <div className="text-[10px] text-[#2564ea] font-bold truncate flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                <span>{currentOrder.area}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fafbfc] border border-[#eaeaec] rounded-xl p-2 text-left">
            <div className="text-[10px] text-[#7e818c] font-bold uppercase tracking-wider">
              Ordered:
            </div>
            <div className="text-[11px] font-extrabold text-[#282c3f] truncate">
              {currentOrder.itemTitle}
            </div>
            <div className="text-[9px] text-[#7e818c] truncate flex items-center gap-1 mt-0.5">
              <Store className="w-2.5 h-2.5 text-[#ff3f6c]" />
              <span>{currentOrder.storeName}</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#f5f5f6] text-[10px]">
          <span className="bg-emerald-50 text-[#03a685] font-black px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1 truncate">
            <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{currentOrder.actionText}</span>
          </span>
          <span className="font-black text-[#ff3f6c] shrink-0 bg-rose-50 px-1.5 py-0.5 rounded-lg">
            ⚡ {currentOrder.etaMins}m
          </span>
        </div>
      </div>
    </div>
  );
};
