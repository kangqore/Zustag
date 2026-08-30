'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Star, Zap, Check, Flame, Layers, Sparkles } from 'lucide-react';
import { LocalAvailabilityItem, ProductVariant } from '@zustag/domain-core';

interface ZustagProductCardProps {
  item: LocalAvailabilityItem;
  onOpenPDP: (item: LocalAvailabilityItem, initialVariant?: ProductVariant) => void;
  isWishlisted: boolean;
  onToggleWishlist: (item: LocalAvailabilityItem) => void;
  onQuickAddToCart?: (item: LocalAvailabilityItem, variant: ProductVariant) => void;
  onFindSimilar?: (item: LocalAvailabilityItem) => void;
}

const FALLBACK_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

export const ZustagProductCard: React.FC<ZustagProductCardProps> = ({
  item,
  onOpenPDP,
  isWishlisted,
  onToggleWishlist,
  onQuickAddToCart,
  onFindSimilar
}) => {
  const { product, variant, store, etaMinutes, price } = item;
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quickAddedSize, setQuickAddedSize] = useState<string | null>(null);

  const images = product.images.length > 0 ? product.images : [FALLBACK_PRODUCT_IMAGE];
  const mrp = variant.mrp || price;
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const isExpressEligible = etaMinutes <= 30;

  // Multi-image cycling on hover
  useEffect(() => {
    let interval: any;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setActiveImageIdx((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setActiveImageIdx(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handleQuickAdd = (e: React.MouseEvent, v: ProductVariant) => {
    e.stopPropagation();
    if (onQuickAddToCart) {
      onQuickAddToCart(item, v);
    }
    setQuickAddedSize(v.size);
    setTimeout(() => setQuickAddedSize(null), 1800);
  };

  const handleSimilarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFindSimilar) {
      onFindSimilar(item);
    } else {
      onOpenPDP(item);
    }
  };

  return (
    <div 
      onClick={() => onOpenPDP(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="luxury-card-hover group relative bg-white flex flex-col justify-between cursor-pointer border border-[#eaeaec] hover:border-[#1e2434] rounded-2xl p-0 transition-all duration-300 select-none overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      {/* 1. Image Container with Multi-Image Hover Carousel & Slide Dots */}
      <div className="relative aspect-[3/4] w-full bg-[#f5f5f7] overflow-hidden">
        <img
          src={images[activeImageIdx] || FALLBACK_PRODUCT_IMAGE}
          alt={product.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = FALLBACK_PRODUCT_IMAGE;
          }}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Carousel Slide Dots Indicator */}
        {isHovered && images.length > 1 && (
          <div className="absolute top-2 inset-x-0 flex items-center justify-center gap-1 z-20">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  activeImageIdx === idx ? 'w-4 bg-[#ff3f6c]' : 'w-1 bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Rating Pill */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <div className="zustag-rating-pill bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-black flex items-center gap-1 border border-black/5 shadow-xs">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
            <span className="text-[#7e818c] font-normal">| {product.reviewCount > 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount}</span>
          </div>
        </div>

        {/* Floating Heart Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white hover:scale-110 shadow-sm transition-all z-20 cursor-pointer"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#ff3f6c] text-[#ff3f6c] scale-110' : 'text-[#1e2434] hover:text-[#ff3f6c]'
            }`} 
          />
        </button>

        {/* Hyperlocal ETA Pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm backdrop-blur-md ${
            isExpressEligible 
              ? 'bg-[#ff3f6c] text-white' 
              : 'bg-[#1e2434] text-white'
          }`}>
            <Zap className="w-2.5 h-2.5 fill-current" />
            <span>⚡ {etaMinutes} MINS</span>
          </div>
        </div>

        {/* Floating "Find Similar" Trigger on Hover */}
        {isHovered && (
          <button
            onClick={handleSimilarClick}
            className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md hover:bg-white text-[#1e2434] p-1.5 rounded-full shadow-md z-20 transition-all hover:scale-110 cursor-pointer"
            title="Find Similar Showroom Items"
          >
            <Layers className="w-3.5 h-3.5 text-[#ff3f6c]" />
          </button>
        )}

        {/* Slide-up Quick Size Bar on Hover */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-[#eaeaec] flex items-center justify-between text-xs font-bold text-[#1e2434] z-20 shadow-md">
          <span className="text-[10px] text-[#7e818c] uppercase tracking-wider">Quick Size:</span>
          <div className="flex items-center gap-1.5">
            {product.variants.map((v) => {
              const isAdded = quickAddedSize === v.size;
              return (
                <button
                  key={v.id}
                  onClick={(e) => handleQuickAdd(e, v)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border font-black transition-all cursor-pointer flex items-center gap-0.5 ${
                    isAdded
                      ? 'border-[#03a685] bg-[#03a685] text-white scale-105'
                      : 'border-[#d4d5d9] hover:border-[#ff3f6c] hover:text-[#ff3f6c] bg-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{v.size}</span>
                    </>
                  ) : (
                    v.size
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Product Meta Info & Real-Time Stock Urgency */}
      <div className="p-3.5 space-y-1.5 bg-white">
        <div className="flex items-center justify-between">
          <span className="font-black text-sm text-[#1e2434] truncate">
            {product.brand}
          </span>
          <span className="text-[9px] font-black text-[#f26a10] flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
            <Flame className="w-2.5 h-2.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>2 left in {store.locality.split(' ')[0]}</span>
          </span>
        </div>

        <div className="text-xs text-[#535766] truncate font-medium">
          {product.title}
        </div>

        <div className="text-[10px] text-[#7e818c] font-medium truncate flex items-center gap-1">
          <span>From <strong>{store.name.split('-')[0]}</strong></span>
          <span>•</span>
          <span className="text-[#03a685] font-bold">● CCTV Packed</span>
        </div>

        {/* Price & Discounts */}
        <div className="flex items-center gap-2 pt-0.5 text-xs">
          <span className="font-black text-[#1e2434] text-sm">
            ₹{price.toLocaleString()}
          </span>
          {mrp > price && (
            <>
              <span className="text-[11px] text-[#7e818c] line-through">
                ₹{mrp.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#ff905a] font-black">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
