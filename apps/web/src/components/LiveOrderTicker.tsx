'use client';

import React, { useState, useEffect } from 'react';
import { Zap, ShoppingBag, MapPin, CheckCircle2, X } from 'lucide-react';

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
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-full hidden sm:block">
      <div 
        className={`bg-white/95 backdrop-blur-md border border-[#eaeaec] rounded-xl p-3.5 shadow-2xl transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          {/* Pulse Icon */}
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-[#ff3f6c] to-[#ff905a] flex items-center justify-center text-white shrink-0 shadow-md">
            <Zap className="w-5 h-5 fill-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#03a685] ring-2 ring-white animate-ping" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center justify-between text-[10px] text-[#7e818c]">
              <span className="font-bold text-[#ff3f6c] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3f6c]" />
                LIVE HYPERLOCAL ORDER
              </span>
              <span>{currentOrder.timeAgo}</span>
            </div>

            <div className="text-xs font-black text-[#282c3f] truncate">
              {currentOrder.customerName} in <span className="text-[#2564ea]">{currentOrder.area}</span>
            </div>

            <div className="text-[11px] text-[#535766] truncate font-medium">
              Ordered <strong className="text-[#282c3f]">{currentOrder.itemTitle}</strong>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[10px]">
              <span className="bg-emerald-50 text-[#03a685] font-bold px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                {currentOrder.actionText}
              </span>
              <span className="font-bold text-[#282c3f]">
                ⚡ {currentOrder.etaMins}m ETA
              </span>
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={() => setIsDismissed(true)}
            className="text-[#7e818c] hover:text-[#282c3f] p-1 -mr-1 -mt-1 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
