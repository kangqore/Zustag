'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Zap, 
  ShoppingBag, 
  Send, 
  PartyPopper, 
  Briefcase, 
  Crown, 
  Sun, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  Tag, 
  ArrowRight,
  Store as StoreIcon,
  Coins,
  Bot
} from 'lucide-react';
import { JAMSHEDPUR_ZONES, Product, ProductVariant, Store } from '@zustag/domain-core';

interface AIStylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedZone: string;
  onAddLookToCart: (lookItems: { product: Product; variant: ProductVariant; store: Store; price: number }[]) => void;
  initialPrompt?: string;
}

export const ZustagAIStylistDrawer: React.FC<AIStylistDrawerProps> = ({
  isOpen,
  onClose,
  selectedZone,
  onAddLookToCart,
  initialPrompt = ''
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [stylistResult, setStylistResult] = useState<any>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const currentZone = JAMSHEDPUR_ZONES[selectedZone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;

  const quickPrompts = [
    { label: '🍸 Party Tonight under ₹3,500', prompt: 'Style me for an upscale party tonight at Wave International under ₹3,500' },
    { label: '💼 Tata Steel Office Formals', prompt: 'Crisp corporate meeting look for Tata Steel presentation arriving in 20 mins' },
    { label: '👑 Royal Wedding Guest', prompt: 'Traditional royal wedding guest outfit with sherwani or silk saree' },
    { label: '🌦️ 28°C Summer Breathable', prompt: 'Light breathable 100% cotton outfit for 28°C Jamshedpur weather' }
  ];

  const handleGenerateLook = async (customText?: string) => {
    const textToSearch = customText || prompt;
    if (!textToSearch.trim()) return;

    setLoading(true);
    setStylistResult(null);
    setAddedSuccess(false);

    try {
      const res = await fetch('/api/ai/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSearch,
          zone: selectedZone
        })
      });
      const data = await res.json();
      if (data.success) {
        setStylistResult(data);
      }
    } catch (err) {
      console.error('AI Stylist error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAllToBag = () => {
    if (!stylistResult || !stylistResult.lookItems) return;
    const itemsToAdd = stylistResult.lookItems.map((li: any) => ({
      product: li.product,
      variant: li.variant,
      store: li.store,
      price: li.price
    }));
    onAddLookToCart(itemsToAdd);
    setAddedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#fcfcfd] w-full max-w-xl h-full flex flex-col shadow-2xl text-[#1e2434] animate-slide-in-right border-l border-[#eaeaec]">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white flex items-center justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-lg shrink-0">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base tracking-wide font-display">
                  ZUSTAG GEMINI AI STYLIST
                </h2>
                <span className="text-[9px] bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white font-black px-2 py-0.5 rounded-full uppercase">
                  30M CONCIERGE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                AI Occasion Reasoner &bull; Real-Time Showroom Dispatch for <strong>{currentZone.areaName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input & Prompt Bar */}
        <div className="p-4 sm:p-5 border-b border-[#eaeaec] bg-white space-y-3 shadow-2xs">
          <div className="relative flex items-center">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateLook()}
              placeholder="Tell Gemini what occasion you're attending, budget, or preferred vibe..."
              className="w-full pl-4 pr-12 py-3 bg-[#f5f5f7] border border-[#eaeaec] rounded-2xl text-xs font-bold text-[#1e2434] focus:outline-none focus:border-[#ff3f6c] shadow-inner"
            />
            <button
              disabled={loading || !prompt.trim()}
              onClick={() => handleGenerateLook()}
              className="absolute right-2 p-2 bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white rounded-xl hover:opacity-90 transition-all cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompt Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(qp.prompt);
                  handleGenerateLook(qp.prompt);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#fafbfc] hover:bg-[#fff1f4] hover:border-rose-200 text-[#535766] hover:text-[#ff3f6c] border border-[#eaeaec] text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Body / Generated Lookbook */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {loading ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-14 h-14 border-3 border-[#ff3f6c] border-t-transparent rounded-full animate-spin mx-auto shadow-md" />
              <div className="space-y-1">
                <h4 className="text-sm font-black text-[#1e2434]">Gemini Fashion AI is Reasoning...</h4>
                <p className="text-xs text-[#7e818c]">
                  Scanning live inventory across Jamshedpur showrooms for "{prompt || 'Selected Occasion'}"...
                </p>
              </div>
            </div>
          ) : stylistResult ? (
            <div className="space-y-4 animate-slide-in-up">
              {/* Lookbook Header Card */}
              <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-300/60 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600 fill-amber-600" />
                    <span>{stylistResult.occasion}</span>
                  </span>
                  <span className="text-xs font-black text-[#03a685] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ⚡ {stylistResult.deliverySLA}
                  </span>
                </div>

                <h3 className="text-base font-black text-[#1e2434] font-display">
                  {stylistResult.lookTitle}
                </h3>

                <p className="text-xs text-[#535766] leading-relaxed italic">
                  "{stylistResult.stylistRationale}"
                </p>

                <div className="flex items-center gap-3 pt-1 text-[11px] text-[#7e818c] border-t border-amber-200/50">
                  <span>📍 {stylistResult.location}</span>
                  <span>&bull;</span>
                  <span>🌦️ {stylistResult.weatherContext}</span>
                </div>
              </div>

              {/* 3 Coordinated Outfit Cards */}
              <div className="space-y-3">
                <div className="text-xs font-black text-[#7e818c] uppercase tracking-wider">
                  3 Coordinated Showroom Pieces
                </div>

                {stylistResult.lookItems.map((li: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-[#eaeaec] bg-white shadow-xs flex gap-3.5 relative hover:border-[#1e2434] transition-all"
                  >
                    <img
                      src={li.product.images[0]}
                      alt={li.product.title}
                      className="w-20 h-24 object-cover rounded-xl bg-slate-100 shrink-0 border border-[#f0f0f2]"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#ff3f6c] bg-[#fff1f4] px-1.5 py-0.2 rounded">
                        {li.role}
                      </span>

                      <div className="font-black text-xs text-[#1e2434] truncate mt-0.5">
                        {li.product.brand} &bull; {li.product.title}
                      </div>

                      <div className="text-[10px] text-[#2564ea] font-bold flex items-center gap-1">
                        <StoreIcon className="w-3 h-3" />
                        <span>{li.store.name.split('-')[0]} ({li.store.locality})</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <span className="font-black text-xs text-[#1e2434]">
                          ₹{li.price.toLocaleString()}
                        </span>
                        {li.mrp > li.price && (
                          <span className="text-[10px] text-[#7e818c] line-through">
                            ₹{li.mrp.toLocaleString()}
                          </span>
                        )}
                        <span className="text-[10px] font-black text-[#03a685] bg-emerald-50 px-1 rounded">
                          ⚡ {li.etaMinutes}m ETA
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Breakdown */}
              <div className="border border-[#eaeaec] rounded-2xl p-4 bg-white space-y-2 text-xs">
                <div className="flex justify-between text-[#535766]">
                  <span>Total Individual Selling Price</span>
                  <span>₹{stylistResult.totalSellingPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#03a685] font-bold">
                  <span>AI Bundle Combo Savings (15% Off)</span>
                  <span>-₹{stylistResult.comboDiscount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Greencard Points to be Earned</span>
                  <span>+{stylistResult.greencardPointsEarned} PTS</span>
                </div>

                <div className="border-t border-[#eaeaec] pt-2 flex justify-between font-black text-sm text-[#1e2434]">
                  <span>Complete 3-Piece Look Price</span>
                  <span>₹{stylistResult.finalBundlePrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto text-[#ff3f6c] shadow-xs">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
              <h4 className="text-base font-black text-[#1e2434]">Ready to Style You in 30 Seconds</h4>
              <p className="text-xs text-[#7e818c] max-w-xs mx-auto">
                Type your occasion or tap any prompt pill above to assemble in-stock showroom fits with express delivery.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer CTA */}
        {stylistResult && (
          <div className="p-4 border-t border-[#eaeaec] bg-white space-y-2">
            <div className="bg-[#fff1f4] border border-rose-200 rounded-xl p-2 flex items-center gap-2 text-[10px] text-[#ff3f6c] font-bold">
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>10-Minute Doorstep Try-On Guarantee active for all 3 pieces.</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#7e818c]">Bundle Total</div>
                <div className="text-lg font-black text-[#1e2434]">
                  ₹{stylistResult.finalBundlePrice.toLocaleString()}
                </div>
              </div>

              <button
                onClick={handleAddAllToBag}
                disabled={addedSuccess}
                className="flex-1 py-3.5 px-5 bg-gradient-to-r from-[#ff3f6c] via-[#f26a10] to-[#ff3f6c] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added Look to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Entire Look to Bag & Deliver</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
