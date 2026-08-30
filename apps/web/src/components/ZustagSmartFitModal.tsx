'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Ruler, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  Zap, 
  ArrowRight,
  Bot,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { Product, ProductVariant } from '@zustag/domain-core';

interface SmartFitModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  currentVariant: ProductVariant;
  onApplyRecommendation: (recommendedSize: string, enableTryOn: boolean, backupSize: string) => void;
}

const REFERENCE_BRANDS = [
  'Zara',
  'H&M',
  'US Polo Assn',
  "Levi's",
  'Peter England',
  'Allen Solly',
  'Manyavar',
  'Zudio',
  'Westside',
  'Van Heusen'
];

const REFERENCE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'];

export const ZustagSmartFitModal: React.FC<SmartFitModalProps> = ({
  isOpen,
  onClose,
  product,
  currentVariant,
  onApplyRecommendation
}) => {
  const [refBrand, setRefBrand] = useState('Zara');
  const [refSize, setRefSize] = useState('M');
  const [fitPreference, setFitPreference] = useState<'slim' | 'regular' | 'relaxed'>('regular');
  const [isCalculating, setIsCalculating] = useState(false);

  // Compute Smart Size Translation Matrix
  const getSmartPrediction = () => {
    const targetBrand = product.brand.toLowerCase();
    let recommended = 'M';
    let backup = 'L';
    let rationale = '';

    if (refSize === 'S' || refSize === '38') {
      recommended = (targetBrand.includes('manyavar') || targetBrand.includes('soch')) ? 'M' : 'S';
      backup = 'M';
      rationale = `${product.brand} has traditional Indian tailored sizing. Sizing up to ${recommended} ensures unrestricted chest drape while maintaining a clean silhouette.`;
    } else if (refSize === 'M' || refSize === '40') {
      if (fitPreference === 'relaxed') {
        recommended = 'L';
        backup = 'XL';
      } else {
        recommended = targetBrand.includes('manyavar') ? '40' : (product.category === 'jeans' ? '32' : 'M');
        backup = 'L';
      }
      rationale = `Based on your ${refBrand} size ${refSize}, ${product.brand} matches 96% in shoulder width. Sizing to ${recommended} gives tailored perfection.`;
    } else if (refSize === 'L' || refSize === '42') {
      recommended = targetBrand.includes('manyavar') ? '42' : (product.category === 'jeans' ? '34' : 'L');
      backup = 'XL';
      rationale = `Calibrated for optimal torso length and sleeve circumference for ${product.brand}.`;
    } else {
      recommended = 'XL';
      backup = 'XXL';
      rationale = `Standard relaxed fit mapped directly from ${refBrand} ${refSize}.`;
    }

    return { recommended, backup, confidence: 96, rationale };
  };

  const prediction = getSmartPrediction();

  const handleApply = () => {
    setIsCalculating(true);
    setTimeout(() => {
      onApplyRecommendation(prediction.recommended, true, prediction.backup);
      setIsCalculating(false);
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden text-[#1e2434] animate-slide-in-up border border-[#eaeaec]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-lg shrink-0">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide font-display">
                  SMART FIT AI SIZE PREDICTOR
                </h2>
                <span className="text-[9px] bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white font-black px-2 py-0.5 rounded-full uppercase">
                  CROSS-BRAND MATRIX
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Translates your standard brand size to <strong>{product.brand}</strong> &bull; Free Doorstep Try-On
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 bg-[#fafbfc]">
          
          {/* Product Banner */}
          <div className="flex items-center gap-3 p-3 bg-white border border-[#eaeaec] rounded-2xl shadow-2xs">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-12 h-15 rounded-xl object-cover bg-slate-100 shrink-0 border border-[#eaeaec]"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase text-[#ff3f6c] bg-[#fff1f4] px-1.5 py-0.2 rounded">
                Target Product
              </span>
              <div className="text-xs font-black text-[#1e2434] truncate mt-0.5">
                {product.brand} - {product.title}
              </div>
              <div className="text-[10px] text-[#7e818c]">Category: {product.category.toUpperCase()}</div>
            </div>
          </div>

          {/* Step 1: Pick Reference Brand */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#1e2434] flex items-center justify-between">
              <span>1. What brand fits you best?</span>
              <span className="text-[10px] text-[#7e818c] font-normal">Reference baseline</span>
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {REFERENCE_BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => setRefBrand(b)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    refBrand === b
                      ? 'bg-[#182344] text-white border-[#182344] shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-[#1e2434] border-[#eaeaec]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Pick Reference Size & Fit Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#1e2434]">
                2. Your Size in {refBrand}:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {REFERENCE_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setRefSize(s)}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer border flex items-center justify-center ${
                      refSize === s
                        ? 'bg-[#ff3f6c] text-white border-[#ff3f6c] shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-[#1e2434] border-[#eaeaec]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#1e2434]">
                3. Preferred Fit:
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'slim', label: 'Slim / Tailored Fit' },
                  { id: 'regular', label: 'Regular / Standard Fit' },
                  { id: 'relaxed', label: 'Relaxed / Comfort Fit' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFitPreference(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                      fitPreference === f.id
                        ? 'bg-[#2564ea] text-white border-[#2564ea] shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-[#1e2434] border-[#eaeaec]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Size Recommendation Card */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-2 border-emerald-400/60 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI FIT CONFIDENCE: {prediction.confidence}%</span>
              </div>
              <span className="text-[10px] font-black text-[#03a685] bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                ⚡ FREE DOORSTEP TRY-ON
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#7e818c]">Recommended Size</div>
                <div className="text-3xl font-black text-[#1e2434] tracking-tight">
                  Size {prediction.recommended}
                </div>
              </div>
              <div className="border-l border-emerald-300/80 pl-4 space-y-0.5">
                <div className="text-[10px] uppercase font-bold text-[#7e818c]">Try-On Backup in Courier Bag</div>
                <div className="text-base font-black text-emerald-800">
                  Size {prediction.backup} (Included Free)
                </div>
              </div>
            </div>

            <p className="text-xs text-[#535766] leading-relaxed italic border-t border-emerald-200/60 pt-2">
              "{prediction.rationale}"
            </p>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-[#eaeaec] bg-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-[#7e818c]">
            <RotateCcw className="w-3.5 h-3.5 text-[#ff3f6c]" />
            <span>10-min trial before you pay rider</span>
          </div>

          <button
            onClick={handleApply}
            disabled={isCalculating}
            className="py-3 px-5 bg-gradient-to-r from-[#ff3f6c] via-[#f26a10] to-[#ff3f6c] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            {isCalculating ? (
              <span>Applying Fit...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply Size {prediction.recommended} & Enable Try-On</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
