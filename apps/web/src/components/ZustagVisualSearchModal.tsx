'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ShoppingBag, 
  Store as StoreIcon, 
  ArrowRight, 
  Tag, 
  Eye, 
  RotateCcw,
  Layers,
  Flame,
  Search
} from 'lucide-react';
import { LocalAvailabilityItem, ProductVariant } from '@zustag/domain-core';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedZone: string;
  onOpenPDP: (item: LocalAvailabilityItem, initialVariant?: ProductVariant) => void;
  onQuickAddToCart: (item: LocalAvailabilityItem, variant: ProductVariant) => void;
}

const SAMPLE_INSPIRATIONS = [
  {
    id: 'wedding_sherwani',
    title: 'Royal Wedding Sherwani',
    vibe: 'Bollywood Festive Look',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'casual_linen',
    title: 'Casual Linen Resort Shirt',
    vibe: 'Pinterest Summer Fit',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'party_dress',
    title: 'Silk Cocktail Evening Dress',
    vibe: 'Instagram Nightlife Edit',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'streetwear_denim',
    title: 'Streetwear Denim & Tee',
    vibe: 'Urban Street Style',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80'
  }
];

export const ZustagVisualSearchModal: React.FC<VisualSearchModalProps> = ({
  isOpen,
  onClose,
  selectedZone,
  onOpenPDP,
  onQuickAddToCart
}) => {
  const [selectedInspiration, setSelectedInspiration] = useState(SAMPLE_INSPIRATIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [visualResult, setVisualResult] = useState<any>(null);

  const runVisualMatch = async (tag: string, imgUrl: string) => {
    setIsScanning(true);
    setVisualResult(null);

    try {
      const res = await fetch('/api/ai/visual-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageTag: tag,
          imageUrl: imgUrl,
          zone: selectedZone
        })
      });
      const data = await res.json();
      if (data.success) {
        setVisualResult(data);
      }
    } catch (err) {
      console.error('Visual search error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runVisualMatch(selectedInspiration.id, selectedInspiration.imageUrl);
    }
  }, [isOpen, selectedInspiration]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1e2434] animate-slide-in-up border border-[#eaeaec]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white p-5 sm:p-6 flex items-center justify-between shadow-md relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-lg shrink-0">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-wide font-display">
                  "SNAP & MATCH" MULTIMODAL VISUAL AI
                </h2>
                <span className="text-[10px] bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white font-black px-2 py-0.5 rounded-full uppercase">
                  VISION REASONER
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Upload or select an outfit from Instagram/Pinterest &bull; Find nearest in-stock showroom dupes in 30 mins
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Grid: Left Image Analyzer + Right Local Showroom Matches */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6 bg-[#fafbfc]">
          
          {/* Left Column (5 Cols): Scanned Image + Visual Semantics */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Scanned Image Box with Scanning Beam */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-[#eaeaec] h-64 sm:h-72">
              <img
                src={selectedInspiration.imageUrl}
                alt={selectedInspiration.title}
                className="w-full h-full object-cover"
              />
              
              {/* Animated AI Scanning Line */}
              {isScanning && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff3f6c]/40 to-transparent animate-pulse flex items-center justify-center">
                  <div className="w-full h-1 bg-[#ff3f6c] shadow-[0_0_15px_#ff3f6c]" />
                </div>
              )}

              {/* Top AI Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/20">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>AI SCANNED INSPIRATION</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 z-10 bg-black/75 backdrop-blur-md text-white p-2.5 rounded-xl border border-white/20">
                <div className="text-xs font-black">{selectedInspiration.title}</div>
                <div className="text-[10px] text-slate-300">{selectedInspiration.vibe}</div>
              </div>
            </div>

            {/* Sample Inspiration Look Switchers */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-black text-[#7e818c] uppercase tracking-wider">
                Or Try Sample Inspiration Looks:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_INSPIRATIONS.map((samp) => (
                  <button
                    key={samp.id}
                    onClick={() => {
                      setSelectedInspiration(samp);
                      runVisualMatch(samp.id, samp.imageUrl);
                    }}
                    className={`p-2 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      selectedInspiration.id === samp.id
                        ? 'bg-white text-[#ff3f6c] border-[#ff3f6c] shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-[#1e2434] border-[#eaeaec]'
                    }`}
                  >
                    <img
                      src={samp.imageUrl}
                      alt={samp.title}
                      className="w-8 h-8 rounded-lg object-cover bg-slate-200 shrink-0"
                    />
                    <div className="truncate">
                      <div className="truncate text-[11px] font-extrabold">{samp.title.split(' ')[0]} Look</div>
                      <div className="text-[9px] text-[#7e818c] truncate">{samp.vibe}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extracted Visual Semantics Card */}
            {visualResult?.visualSemantics && (
              <div className="bg-white border border-[#eaeaec] rounded-2xl p-3.5 space-y-2 text-xs shadow-2xs">
                <div className="text-[10px] font-black uppercase text-[#2564ea] tracking-wider flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Detected Garment Attributes</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-[#f5f5f7] p-2 rounded-lg">
                    <span className="text-[#7e818c] block text-[9px] uppercase font-bold">Garment Type</span>
                    <strong className="text-[#1e2434] truncate block">{visualResult.visualSemantics.detectedGarment}</strong>
                  </div>
                  <div className="bg-[#f5f5f7] p-2 rounded-lg">
                    <span className="text-[#7e818c] block text-[9px] uppercase font-bold">Color Palette</span>
                    <strong className="text-[#1e2434] truncate block">{visualResult.visualSemantics.primaryColor}</strong>
                  </div>
                  <div className="bg-[#f5f5f7] p-2 rounded-lg">
                    <span className="text-[#7e818c] block text-[9px] uppercase font-bold">Fabric Texture</span>
                    <strong className="text-[#1e2434] truncate block">{visualResult.visualSemantics.fabricTexture}</strong>
                  </div>
                  <div className="bg-[#f5f5f7] p-2 rounded-lg">
                    <span className="text-[#7e818c] block text-[9px] uppercase font-bold">Style Vibe</span>
                    <strong className="text-[#1e2434] truncate block">{visualResult.visualSemantics.styleVibe}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (7 Cols): Ranked Local Showroom Matches */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#eaeaec]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff3f6c]" />
                <h3 className="text-xs sm:text-sm font-black uppercase text-[#1e2434] tracking-wider">
                  In-Stock Showroom Matches in Jamshedpur
                </h3>
              </div>
              <span className="text-xs font-black text-[#03a685] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ⚡ 15–25 Mins SLA
              </span>
            </div>

            {isScanning ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-12 h-12 border-3 border-[#ff3f6c] border-t-transparent rounded-full animate-spin mx-auto shadow-md" />
                <p className="text-xs text-[#7e818c] font-bold">
                  Extracting visual features & matching against Jamshedpur showroom stock...
                </p>
              </div>
            ) : visualResult?.matches?.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {visualResult.matches.map((m: any, idx: number) => {
                  const item = m.item;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-[#eaeaec] bg-white shadow-xs hover:shadow-md hover:border-[#1e2434] transition-all flex flex-col sm:flex-row gap-3.5 items-start sm:items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-16 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-[#eaeaec]"
                        />

                        <div className="space-y-1 min-w-0">
                          {/* Similarity Badge */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                              {m.similarityScore}% VISUAL MATCH
                            </span>
                            <span className="text-[10px] font-bold text-[#03a685] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              ⚡ {item.etaMinutes}m ETA
                            </span>
                          </div>

                          <div className="font-black text-xs text-[#1e2434] truncate">
                            {item.product.brand} - {item.product.title}
                          </div>

                          <div className="text-[10px] text-[#2564ea] font-bold flex items-center gap-1">
                            <StoreIcon className="w-3 h-3" />
                            <span>{item.store.name.split('-')[0]} ({item.store.locality})</span>
                          </div>

                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="font-black text-xs text-[#1e2434]">
                              ₹{item.price.toLocaleString()}
                            </span>
                            {item.variant.mrp > item.price && (
                              <span className="text-[10px] text-[#7e818c] line-through">
                                ₹{item.variant.mrp.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                        <button
                          onClick={() => {
                            onQuickAddToCart(item, item.variant);
                            onClose();
                          }}
                          className="flex-1 sm:flex-none py-2 px-3 bg-gradient-to-r from-[#ff3f6c] to-[#f26a10] text-white text-[11px] font-black uppercase rounded-xl flex items-center justify-center gap-1 shadow-xs cursor-pointer hover:opacity-95"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Quick Bag</span>
                        </button>
                        <button
                          onClick={() => {
                            onOpenPDP(item, item.variant);
                            onClose();
                          }}
                          className="flex-1 sm:flex-none py-2 px-3 bg-[#f5f5f7] hover:bg-[#eaeaec] text-[#1e2434] text-[11px] font-bold uppercase rounded-xl flex items-center justify-center gap-1 border border-[#eaeaec] cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View PDP</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-[#7e818c]">
                No visual matches found. Try selecting another inspiration style.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#eaeaec] bg-white flex items-center justify-between text-xs text-[#7e818c]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#ff3f6c]" />
            <span>Zustag Neural Vision AI &bull; Instant Local Dupe Finder</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#1e2434] font-bold rounded-lg cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
