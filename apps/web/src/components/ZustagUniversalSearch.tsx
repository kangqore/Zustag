'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Store, 
  MapPin, 
  Building2, 
  Zap, 
  Flame, 
  ArrowRight, 
  X, 
  Tag, 
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Keyboard,
  Bot,
  PartyPopper,
  Briefcase,
  Crown,
  Camera
} from 'lucide-react';
import { Store as StoreType, LocalAvailabilityItem } from '@zustag/domain-core';

interface UniversalSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  stores: StoreType[];
  items: LocalAvailabilityItem[];
  onSelectShowroom: (storeId: string) => void;
  onSelectCategory: (category: string) => void;
  selectedZone: string;
  onTriggerAIStylist?: (initialPrompt?: string) => void;
  onTriggerVisualSearch?: () => void;
}

const SEARCH_PLACEHOLDERS = [
  "Ask AI: 'Style me for an upscale party tonight'...",
  "Search 'Zudio in Gamharia'...",
  "Ask AI: 'Tata Steel office meeting formals'...",
  "Search 'P&M Mall Showrooms'...",
  "Ask AI: 'Wedding guest sherwanis in Bistupur'...",
  "Search 'Levi's Denims with 30-Min SLA'..."
];

const AI_OCCASION_PROMPTS = [
  { label: '🍸 Party Under ₹3,500', prompt: 'Style me for an upscale party tonight under ₹3,500' },
  { label: '💼 Tata Steel Office Formals', prompt: 'Crisp corporate meeting formals for Tata Steel presentation' },
  { label: '👑 Wedding Guest Ensemble', prompt: 'Traditional royal wedding guest outfit with sherwani or silk saree' },
  { label: '🌦️ 28°C Summer Breathable', prompt: 'Light breathable 100% cotton outfit for 28°C Jamshedpur weather' }
];

const TRENDING_SEARCHES = [
  { label: 'Zudio Gamharia', type: 'store', id: 'store_gamharia_zudio' },
  { label: 'P&M Mall Outlets', type: 'mall', query: 'P&M' },
  { label: 'Manyavar Sherwanis', type: 'category', cat: 'ethnic' },
  { label: 'Formal Shirts', type: 'category', cat: 'shirts' },
  { label: 'Levi\'s 511 Denims', type: 'category', cat: 'jeans' },
  { label: 'Bistupur Boulevard', type: 'locality', query: 'Bistupur' },
  { label: 'Sen Shoes Manglam', type: 'store', id: 'store_gamharia_sen_shoes' }
];

export const ZustagUniversalSearch: React.FC<UniversalSearchProps> = ({
  searchQuery,
  onSearchChange,
  stores,
  items,
  onSelectShowroom,
  onSelectCategory,
  selectedZone,
  onTriggerAIStylist,
  onTriggerVisualSearch
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'products' | 'stores'>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle animated placeholders
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching stores, products, malls
  const queryLower = searchQuery.trim().toLowerCase();

  const matchingStores = stores.filter(s => 
    s.name.toLowerCase().includes(queryLower) ||
    s.brand.toLowerCase().includes(queryLower) ||
    s.locality.toLowerCase().includes(queryLower) ||
    (s.mallOrMarket && s.mallOrMarket.toLowerCase().includes(queryLower)) ||
    s.tags.some(t => t.toLowerCase().includes(queryLower))
  );

  const matchingItems = items.filter(i => 
    i.product.title.toLowerCase().includes(queryLower) ||
    i.product.brand.toLowerCase().includes(queryLower) ||
    i.product.category.toLowerCase().includes(queryLower)
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsDropdownOpen(false);
      // Check if prompt is natural language request for AI stylist
      const isAIPrompt = 
        queryLower.includes('style me') || 
        queryLower.includes('outfit') || 
        queryLower.includes('look') || 
        queryLower.includes('wedding') || 
        queryLower.includes('party') ||
        queryLower.includes('wear') ||
        queryLower.includes('dress for');

      if (isAIPrompt && onTriggerAIStylist) {
        onTriggerAIStylist(searchQuery);
        return;
      }

      const el = document.getElementById('showroom-products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTrending = (t: any) => {
    if (t.type === 'store' && t.id) {
      onSelectShowroom(t.id);
    } else if (t.type === 'category' && t.cat) {
      onSelectCategory(t.cat);
    } else if (t.query) {
      onSearchChange(t.query);
    }
    const el = document.getElementById('showroom-products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="universal-search-container" className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 my-3">
      <div 
        ref={searchContainerRef}
        className="relative bg-white border-2 border-[#eaeaec] focus-within:border-[#282c3f] rounded-2xl p-2 sm:p-3 shadow-md transition-all duration-300"
      >
        {/* Big Smart Search Input Bar */}
        <div className="relative">
          <div className="relative flex items-center bg-[#f5f5f6] hover:bg-[#f0f0f2] focus-within:bg-white rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff3f6c] transition-all shadow-inner">
            <Search className="w-5 h-5 text-[#7e818c] shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsDropdownOpen(true);
                setHighlightedIndex(-1);
              }}
              placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
              className="bg-transparent text-sm sm:text-base font-bold text-[#282c3f] placeholder-[#7e818c] w-full focus:outline-none"
            />
            
            {searchQuery && (
              <button
                onClick={() => {
                  onSearchChange('');
                  setIsDropdownOpen(false);
                }}
                className="p-1 rounded-full text-[#7e818c] hover:text-[#282c3f] cursor-pointer mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Visual Search Camera Trigger */}
            {onTriggerVisualSearch && (
              <button
                onClick={onTriggerVisualSearch}
                title="Snap & Match with Visual AI"
                className="p-1.5 rounded-lg text-[#7e818c] hover:text-[#ff3f6c] hover:bg-[#fff1f4] cursor-pointer mr-2 transition-colors flex items-center gap-1"
              >
                <Camera className="w-4 h-4" />
                <span className="text-[10px] font-extrabold hidden md:inline">Snap</span>
              </button>
            )}

            {/* AI Assistant Quick Trigger Inside Input */}
            {onTriggerAIStylist && (
              <button
                onClick={() => onTriggerAIStylist(searchQuery || 'Style an outfit for me')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white text-xs font-black rounded-lg shadow-xs hover:opacity-90 transition-all cursor-pointer mr-3"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Style Look</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-[#d4d5d9] shrink-0 text-xs font-bold text-[#03a685]">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>30M SLA</span>
            </div>
          </div>

          {/* Smart Live Results Popover Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#eaeaec] rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto p-4 space-y-4 animate-slide-in-up">
              
              {/* ✨ Gemini AI Stylist Direct Query Card */}
              {searchQuery.trim().length > 0 && onTriggerAIStylist && (
                <div 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onTriggerAIStylist(searchQuery);
                  }}
                  className="bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:opacity-95 transition-all shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black flex items-center gap-1.5">
                        <span>✨ Generate AI Outfit Lookbook for:</span>
                        <strong className="text-amber-300">"{searchQuery}"</strong>
                      </div>
                      <p className="text-[10px] text-slate-300">
                        Gemini will curate 3 in-stock showroom pieces delivered in 25 mins
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white/20 text-white font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <span>Ask AI</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              )}

              {/* Showroom Matches */}
              {(activeFilterTab === 'all' || activeFilterTab === 'stores') && matchingStores.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase text-[#2564ea] tracking-wider flex items-center gap-1">
                    <Store className="w-3.5 h-3.5" />
                    <span>Matching Showrooms & Retail Outlets ({matchingStores.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingStores.slice(0, 4).map((store) => (
                      <div
                        key={store.id}
                        onClick={() => {
                          onSelectShowroom(store.id);
                          setIsDropdownOpen(false);
                        }}
                        className="p-2.5 rounded-xl border border-[#eaeaec] hover:border-[#2564ea] bg-[#fafbfc] hover:bg-white transition-all cursor-pointer flex items-center gap-2.5"
                      >
                        <img
                          src={store.imageUrl}
                          alt={store.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black text-[#282c3f] truncate">{store.name}</div>
                          <div className="text-[10px] text-[#7e818c] truncate">{store.locality} &bull; {store.mallOrMarket || 'High St'}</div>
                        </div>
                        <span className="text-[9px] font-black bg-emerald-50 text-[#03a685] px-1.5 py-0.5 rounded">
                          ⚡ 15M
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Matches */}
              {(activeFilterTab === 'all' || activeFilterTab === 'products') && matchingItems.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase text-[#ff3f6c] tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Matching Clothing & Styles ({matchingItems.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingItems.slice(0, 4).map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onSearchChange(item.product.title);
                          setIsDropdownOpen(false);
                          const el = document.getElementById('showroom-products-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-2.5 rounded-xl border border-[#eaeaec] hover:border-[#ff3f6c] bg-[#fafbfc] hover:bg-white transition-all cursor-pointer flex items-center gap-2.5"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black text-[#282c3f] truncate">{item.product.brand} - {item.product.title}</div>
                          <div className="text-[10px] text-[#7e818c]">₹{item.price} &bull; {item.store.name.split('-')[0]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompt Suggestions */}
              {matchingStores.length === 0 && matchingItems.length === 0 && searchQuery.trim().length > 0 && (
                <div className="text-center py-6 space-y-2">
                  <p className="text-xs text-[#7e818c]">No direct catalog matches. Let AI style you instead:</p>
                  {onTriggerAIStylist && (
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onTriggerAIStylist(searchQuery);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white rounded-xl text-xs font-black"
                    >
                      ✨ Ask AI Stylist for "{searchQuery}"
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Occasion Prompt Chips & Trending Keywords */}
        <div className="mt-3.5 pt-3 border-t border-[#f5f5f6] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-black uppercase text-[#ff3f6c] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ff3f6c]" />
            <span>AI Prompts:</span>
          </span>

          {AI_OCCASION_PROMPTS.map((ap, idx) => (
            <button
              key={idx}
              onClick={() => onTriggerAIStylist && onTriggerAIStylist(ap.prompt)}
              className="px-2.5 py-1 rounded-lg bg-[#fff1f4] hover:bg-rose-100 text-[#ff3f6c] border border-rose-200 text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0"
            >
              {ap.label}
            </button>
          ))}

          <span className="text-slate-300">|</span>

          {TRENDING_SEARCHES.slice(0, 4).map((t, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectTrending(t)}
              className="px-2.5 py-1 rounded-lg bg-[#f5f5f6] hover:bg-[#eaeaec] text-[#535766] text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer shrink-0"
            >
              {t.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
