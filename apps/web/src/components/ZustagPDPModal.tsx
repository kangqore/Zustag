'use client';

import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  MapPin, 
  Check, 
  Store,
  Clock,
  Sparkles,
  Video,
  UserCheck,
  CheckCircle2,
  Ruler,
  Info,
  ChevronRight,
  Bot
} from 'lucide-react';
import { LocalAvailabilityItem, ProductVariant } from '@zustag/domain-core';
import { ZustagSmartFitModal } from './ZustagSmartFitModal';

interface ZustagPDPModalProps {
  item: LocalAvailabilityItem;
  initialVariant?: ProductVariant;
  onClose: () => void;
  onAddToCart: (item: LocalAvailabilityItem, variant: ProductVariant) => void;
  onToggleWishlist: (item: LocalAvailabilityItem) => void;
  isWishlisted: boolean;
}

const FALLBACK_PDP_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

export const ZustagPDPModal: React.FC<ZustagPDPModalProps> = ({
  item,
  initialVariant,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const { product, store, etaMinutes } = item;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    initialVariant || item.variant
  );
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isAddedToBag, setIsAddedToBag] = useState<boolean>(false);
  const [tryOnTwoSizes, setTryOnTwoSizes] = useState<boolean>(false);
  const [secondSize, setSecondSize] = useState<string>('L');
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);
  const [showSmartFitAI, setShowSmartFitAI] = useState<boolean>(false);

  const price = selectedVariant.price;
  const mrp = selectedVariant.mrp;
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);

  const handleAdd = () => {
    onAddToCart(item, selectedVariant);
    setIsAddedToBag(true);
    setTimeout(() => setIsAddedToBag(false), 2200);
  };

  const availableSizes = product.variants.map(v => v.size);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative bg-white max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col md:flex-row text-[#1e2434] animate-slide-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#1e2434] hover:text-[#ff3f6c] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image Gallery + Showroom Provenance */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 bg-[#fbfbfa] border-r border-[#eaeaec] flex flex-col justify-between overflow-y-auto">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#f5f5f7] shadow-sm">
            <img
              src={product.images[activeImageIdx] || product.images[0] || FALLBACK_PDP_IMAGE}
              alt={product.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = FALLBACK_PDP_IMAGE;
              }}
              className="w-full h-full object-cover"
            />

            {/* Showroom Origin Pill */}
            <div className="absolute bottom-3 left-3 bg-[#182344]/95 text-white px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md flex items-center gap-2 border border-white/10 shadow-md">
              <Zap className="w-3.5 h-3.5 fill-[#ff3f6c] text-[#ff3f6c]" />
              <span>Direct from <strong>{store.name.split('-')[0]}</strong></span>
            </div>

            {/* CCTV Security Verified Badge */}
            <div className="absolute top-3 left-3 bg-white/95 text-[#1e2434] px-2.5 py-1 rounded-lg text-[10px] font-black backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-[#eaeaec]">
              <Video className="w-3.5 h-3.5 text-[#03a685]" />
              <span>PACKED UNDER CCTV</span>
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-3.5 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 rounded-xl border-2 overflow-hidden shrink-0 cursor-pointer transition-all ${
                    activeImageIdx === idx ? 'border-[#ff3f6c] scale-102 shadow-xs' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_PDP_IMAGE;
                    }}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}

          {/* Verified Local Neighborhood Reviews snippet */}
          <div className="mt-4 pt-3.5 border-t border-[#eaeaec] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-black text-[#7e818c]">
              <span>VERIFIED LOCAL CUSTOMER FEEDBACK</span>
              <span className="text-[#03a685] flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Jamshedpur Verified
              </span>
            </div>
            <div className="bg-white border border-[#eaeaec] rounded-xl p-3 text-xs space-y-1 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-[#1e2434] text-[11px]">Rahul K. &bull; <span className="text-[#03a685] font-semibold">Bistupur, Jamshedpur</span></div>
                <div className="flex text-amber-500 text-[10px]">★★★★★</div>
              </div>
              <p className="text-[11px] text-[#535766]">
                "Arrived in 21 mins in sealed showroom packaging with hanger. 100% authentic {product.brand}."
              </p>
            </div>
          </div>
        </div>

        {/* Right: Product Details, Size Chart, 2-Size Try-On, Specs */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-5">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#ff3f6c] tracking-wider">
                  ⚡ 30-Min Hyperlocal Dispatch
                </span>
                <span className="text-[11px] font-bold text-[#7e818c]">SKU: ZSTG-{product.id.slice(0, 6)}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#1e2434] uppercase tracking-wide mt-1 font-display">
                {product.brand}
              </h1>
              <p className="text-sm sm:text-base text-[#535766] mt-0.5 font-normal">
                {product.title}
              </p>
              
              <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 border border-[#eaeaec] rounded-lg text-xs font-black text-[#1e2434] bg-slate-50">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-[#03a685] text-[#03a685]" />
                <span className="text-[#7e818c] font-normal">| {product.reviewCount} Showroom Ratings</span>
              </div>
            </div>

            <hr className="border-[#eaeaec]" />

            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#1e2434]">
                  ₹{price.toLocaleString()}
                </span>
                {mrp > price && (
                  <>
                    <span className="text-base text-[#7e818c] line-through font-medium">
                      MRP ₹{mrp.toLocaleString()}
                    </span>
                    <span className="text-base font-black text-[#ff905a]">
                      ({discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] font-bold text-[#03a685] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Inclusive of all taxes &bull; 1-Click Showroom Express Dispatch
              </p>
            </div>

            {/* Size Selector + Size Chart Popover Button */}
            <div className="space-y-2.5 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-black uppercase tracking-wider text-[#1e2434]">
                  Select Primary Size:
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowSmartFitAI(true)}
                    className="bg-gradient-to-r from-[#182344] to-[#2564ea] text-white px-2.5 py-1 rounded-lg font-black flex items-center gap-1 cursor-pointer hover:opacity-90 text-[10px] shadow-2xs border border-blue-400/30"
                  >
                    <Bot className="w-3 h-3 text-cyan-300 animate-pulse" />
                    <span>✨ Find Size with Smart Fit AI</span>
                  </button>

                  <button 
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-[#ff3f6c] font-black flex items-center gap-1 cursor-pointer hover:underline text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>SIZE CHART &gt;</span>
                  </button>
                </div>
              </div>

              {/* Size Chart Modal */}
              {showSizeChart && (
                <div className="p-3 bg-slate-50 border border-[#eaeaec] rounded-xl text-xs space-y-2 animate-slide-in-up">
                  <div className="font-black text-[#1e2434] flex items-center justify-between">
                    <span>Garment Measurements (Inches)</span>
                    <button onClick={() => setShowSizeChart(false)} className="text-[10px] text-[#ff3f6c]">✕ Close</button>
                  </div>
                  <table className="w-full text-center text-[11px] border border-collapse">
                    <thead>
                      <tr className="bg-slate-200 font-bold">
                        <th className="p-1 border">Size</th>
                        <th className="p-1 border">Chest</th>
                        <th className="p-1 border">Shoulder</th>
                        <th className="p-1 border">Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-1 border font-bold">S</td><td className="p-1 border">38"</td><td className="p-1 border">16.5"</td><td className="p-1 border">27.5"</td></tr>
                      <tr><td className="p-1 border font-bold">M</td><td className="p-1 border">40"</td><td className="p-1 border">17.5"</td><td className="p-1 border">28.5"</td></tr>
                      <tr><td className="p-1 border font-bold">L</td><td className="p-1 border">42"</td><td className="p-1 border">18.5"</td><td className="p-1 border">29.5"</td></tr>
                      <tr><td className="p-1 border font-bold">XL</td><td className="p-1 border">44"</td><td className="p-1 border">19.5"</td><td className="p-1 border">30.5"</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = v.id === selectedVariant.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`w-12 h-12 rounded-xl border text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-[#ff3f6c] text-[#ff3f6c] bg-[#fff1f4] shadow-xs scale-105'
                          : 'border-[#d4d5d9] hover:border-[#1e2434] text-[#1e2434]'
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* "Doorstep 2-Size Try-On" Selector */}
            <div className="bg-gradient-to-r from-[#fff5eb] to-[#fef8f0] border-2 border-[#fcd8b8] rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#f26a10] text-white flex items-center justify-center font-black text-xs">
                    🛵
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1e2434] flex items-center gap-1">
                      <span>Doorstep 2-Size Try-On</span>
                      <span className="bg-[#f26a10] text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                        FREE
                      </span>
                    </div>
                    <p className="text-[10px] text-[#7e818c]">
                      Rider brings 2 sizes, waits 10 mins. Keep the best fit, return the other on spot!
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={tryOnTwoSizes} 
                    onChange={(e) => setTryOnTwoSizes(e.target.checked)} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#03a685]"></div>
                </label>
              </div>

              {tryOnTwoSizes && (
                <div className="pt-2 border-t border-[#fbd3b6] flex items-center justify-between text-xs animate-slide-in-up">
                  <span className="font-bold text-[#1e2434]">Select 2nd Size to Try:</span>
                  <div className="flex items-center gap-1.5">
                    {availableSizes.filter(s => s !== selectedVariant.size).map(s => (
                      <button
                        key={s}
                        onClick={() => setSecondSize(s)}
                        className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          secondSize === s 
                            ? 'bg-[#1e2434] text-white' 
                            : 'bg-white border border-[#eaeaec] text-[#1e2434]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Specifications Table (Myntra Standard) */}
            <div className="border border-[#eaeaec] rounded-2xl p-3.5 space-y-2 text-xs bg-white">
              <div className="font-black text-[#1e2434] uppercase tracking-wider text-[11px]">
                Product Specifications
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-[#7e818c] block">Fabric / Material</span>
                  <span className="font-bold text-[#1e2434]">100% Premium Cotton</span>
                </div>
                <div>
                  <span className="text-[#7e818c] block">Fit</span>
                  <span className="font-bold text-[#1e2434]">Tailored Slim Fit</span>
                </div>
                <div>
                  <span className="text-[#7e818c] block">Pattern</span>
                  <span className="font-bold text-[#1e2434]">Solid &bull; Festive Weave</span>
                </div>
                <div>
                  <span className="text-[#7e818c] block">Wash Care</span>
                  <span className="font-bold text-[#1e2434]">Machine Wash Cold</span>
                </div>
              </div>
            </div>

            {/* Showroom & Stock Physical Address */}
            <div className="bg-[#f5f5f7] border border-[#eaeaec] rounded-2xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-[#1e2434] flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-[#ff3f6c]" />
                  {store.name}
                </span>
                <span className="text-[10px] font-black text-[#03a685] bg-emerald-100 px-2 py-0.5 rounded-md">
                  ● 2 LEFT IN STORE
                </span>
              </div>
              <div className="text-[11px] text-[#7e818c]">
                📍 {store.mallOrMarket || store.locality}, Jamshedpur &bull; Phone Verified Store
              </div>
              <div className="flex items-center gap-2 text-[#535766] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#2564ea]" />
                <span>Estimated Delivery: <strong>⚡ {etaMinutes} Minutes</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#eaeaec]">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  isAddedToBag 
                    ? 'bg-[#03a685] text-white scale-102' 
                    : 'bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] hover:opacity-95 text-white'
                }`}
              >
                {isAddedToBag ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{tryOnTwoSizes ? `Add with Try-On (${selectedVariant.size} + ${secondSize})` : 'Add to Bag'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(item)}
                className={`px-5 py-3.5 rounded-xl border font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isWishlisted
                    ? 'border-[#ff3f6c] text-[#ff3f6c] bg-[#fff1f4]'
                    : 'border-[#d4d5d9] text-[#1e2434] hover:border-[#1e2434]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#ff3f6c]' : ''}`} />
                <span className="hidden sm:inline">Wishlist</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#7e818c] pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#03a685]" />
                <span>100% Original Brand Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#2564ea]" />
                <span>10-Min Doorstep Try & Swap</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Fit AI Cross-Brand Predictor Modal */}
      <ZustagSmartFitModal
        isOpen={showSmartFitAI}
        onClose={() => setShowSmartFitAI(false)}
        product={product}
        currentVariant={selectedVariant}
        onApplyRecommendation={(recommendedSize, enableTryOn, backupSize) => {
          const matchedVariant = product.variants.find(v => v.size === recommendedSize) || product.variants[0];
          if (matchedVariant) setSelectedVariant(matchedVariant);
          if (enableTryOn) {
            setTryOnTwoSizes(true);
            setSecondSize(backupSize);
          }
        }}
      />
    </div>
  );
};
