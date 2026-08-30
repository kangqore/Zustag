'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Wand2, 
  ShoppingBag, 
  ExternalLink, 
  Layers, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Maximize2,
  X,
  Bot
} from 'lucide-react';
import { ZustagAIPredictiveFeed } from './ZustagAIPredictiveFeed';
import { ZustagStyleFinder } from './ZustagStyleFinder';
import { ZustagOutfitBundler } from './ZustagOutfitBundler';
import { Product, ProductVariant, Store } from '@zustag/domain-core';

interface SmartDiscoveryTabsProps {
  selectedZoneAreaName: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onTriggerAIStylist?: (prompt?: string) => void;
  onAddBundleToCart: (items: { product: Product; variant: ProductVariant; store: Store; price: number }[]) => void;
}

type TabKey = 'weather_feed' | 'style_finder' | 'outfit_bundler';

export const ZustagSmartDiscoveryTabs: React.FC<SmartDiscoveryTabsProps> = ({
  selectedZoneAreaName,
  selectedCategory,
  onSelectCategory,
  onTriggerAIStylist,
  onAddBundleToCart
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('weather_feed');
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const TABS = [
    {
      id: 'weather_feed' as TabKey,
      label: 'Smart Weather & Occasion Feed',
      icon: '🌦️',
      badge: 'LIVE 28°C',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
    },
    {
      id: 'style_finder' as TabKey,
      label: '3-Click Style Finder Wizard',
      icon: '🪄',
      badge: 'AI WIZARD',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/30'
    },
    {
      id: 'outfit_bundler' as TabKey,
      label: '25-Min Outfit Bundler',
      icon: '👔',
      badge: '1-CLICK LOOKS',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
    }
  ];

  const currentTabObj = TABS.find(t => t.id === activeTab) || TABS[0];

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'weather_feed':
        return (
          <div className="animate-fade-in">
            <ZustagAIPredictiveFeed
              selectedZoneAreaName={selectedZoneAreaName}
              onSelectCategory={onSelectCategory}
              onTriggerAIStylist={onTriggerAIStylist}
            />
          </div>
        );
      case 'style_finder':
        return (
          <div className="animate-fade-in">
            <ZustagStyleFinder
              selectedZoneAreaName={selectedZoneAreaName}
              onApplyStyleMatch={(filters) => {
                if (filters.category) onSelectCategory(filters.category);
                if (filters.occasion === 'wedding') onSelectCategory('wedding');
                else if (filters.occasion === 'party') onSelectCategory('dresses');
                else if (filters.occasion === 'work') onSelectCategory('shirts');
                else if (filters.occasion === 'casual') onSelectCategory('t-shirts');
              }}
            />
          </div>
        );
      case 'outfit_bundler':
        return (
          <div className="animate-fade-in">
            <ZustagOutfitBundler
              onAddBundleToCart={onAddBundleToCart}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 my-5">
      {/* Container Card with Luxury Header */}
      <div className="bg-[#ffffff] border-2 border-[#eaeaec] rounded-3xl p-3 sm:p-5 shadow-lg space-y-4">
        
        {/* Top Control Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#f0f0f2]">
          
          {/* Section Brand Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black uppercase text-[#1e2434] tracking-wider font-display">
                  ZUSTAG AI OCCASION & DISCOVERY SUITE
                </h3>
                <span className="text-[9px] bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white font-black px-2 py-0.5 rounded-full uppercase">
                  3-IN-1 HUB
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#7e818c]">
                Switch between live city weather edits, 3-click style matching & instant 25-min outfit bundles
              </p>
            </div>
          </div>

          {/* Action to Open Full Dedicated Page View */}
          <button
            onClick={() => setIsFullScreenOpen(true)}
            className="self-start md:self-auto px-3.5 py-1.5 bg-[#f5f5f7] hover:bg-[#182344] hover:text-white text-[#1e2434] text-xs font-bold rounded-xl border border-[#eaeaec] transition-all flex items-center gap-1.5 cursor-pointer group shadow-2xs"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#ff3f6c] group-hover:text-white" />
            <span>Open Dedicated Full Page</span>
            <ExternalLink className="w-3 h-3 text-[#7e818c] group-hover:text-white" />
          </button>
        </div>

        {/* 3-Tab Pill Switcher Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 border select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white border-[#182344] shadow-md scale-102'
                    : 'bg-[#fafbfc] hover:bg-[#f2f4f8] text-[#535766] border-[#eaeaec]'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="font-bold">{tab.label}</span>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                  isActive ? 'bg-white/20 text-white border-white/30' : tab.badgeBg
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Render Active Tab's Component */}
        <div className="pt-1">
          {renderActiveContent()}
        </div>

      </div>

      {/* Dedicated Immersive Full Page Modal */}
      {isFullScreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#fcfcfd] w-full max-w-6xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1e2434] animate-slide-in-up border border-[#eaeaec]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white p-5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-lg shrink-0">
                  <span className="text-lg">{currentTabObj.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black tracking-wide font-display uppercase">
                      {currentTabObj.label} &bull; FULL DEDICATED VIEW
                    </h2>
                    <span className="text-[9px] bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white font-black px-2 py-0.5 rounded-full uppercase">
                      STANDALONE PAGE
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Interactive standalone experience for <strong>{selectedZoneAreaName}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFullScreenOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="p-4 bg-white border-b border-[#eaeaec] flex items-center gap-2 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    activeTab === tab.id
                      ? 'bg-[#182344] text-white border-[#182344] shadow-xs'
                      : 'bg-[#fafbfc] text-[#535766] border-[#eaeaec]'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {renderActiveContent()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#eaeaec] bg-white flex items-center justify-between text-xs text-[#7e818c]">
              <span>Zustag Hyperlocal Intelligence Suite &bull; 30-Min Showroom Delivery</span>
              <button
                onClick={() => setIsFullScreenOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#1e2434] font-bold rounded-xl cursor-pointer"
              >
                Back to Main Store
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
