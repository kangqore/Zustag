'use client';

import React from 'react';
import { Sparkles, RotateCcw, Clock, ShieldCheck, Bike, CheckCircle2 } from 'lucide-react';

export const ZustagTryAtHomeBanner: React.FC = () => {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 my-6">
      <div className="relative rounded-2xl bg-gradient-to-r from-[#182344] via-[#223567] to-[#182344] border border-[#2d437d] p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#4ab6d4]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#ff3f6c]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Highlight Pitch */}
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-[#4ab6d4]/20 border border-[#4ab6d4]/40 text-[#4ab6d4] text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>HYPERLOCAL FASHION INNOVATION</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
              10-Minute Doorstep "Try & Swap" Guarantee
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Never worry about size or fit again. Our delivery rider waits at your doorstep for <strong>10 minutes</strong> while you try on your clothes. If the fit isn't right, hand it back immediately for an instant size swap or refund!
            </p>
          </div>

          {/* Right: 3 Key Assurance Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-white">10-Min Wait</div>
                <div className="text-[10px] text-slate-300">Rider waits at door</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-white">Instant Size Swap</div>
                <div className="text-[10px] text-slate-300">Zero return hassle</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-400/20 text-rose-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-white">100% Original</div>
                <div className="text-[10px] text-slate-300">Direct from showroom</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
