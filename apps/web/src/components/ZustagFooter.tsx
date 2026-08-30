'use client';

import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Zap, 
  Smartphone, 
  MapPin, 
  Award,
  Sparkles
} from 'lucide-react';

interface ZustagFooterProps {
  onSelectCategory?: (cat: string) => void;
}

export const ZustagFooter: React.FC<ZustagFooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#fafbfc] border-t border-[#eaeaec] pt-12 pb-8 text-[#282c3f] text-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10 space-y-10">
        {/* Top 4-Column Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* 1. ONLINE SHOPPING */}
          <div className="space-y-3">
            <div className="font-extrabold text-xs uppercase text-[#282c3f] tracking-wider">
              ONLINE SHOPPING
            </div>
            <ul className="space-y-2 text-[#696b79] font-normal text-xs">
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('shirts')}
                  className="hover:text-[#282c3f] hover:font-bold transition-all text-left cursor-pointer"
                >
                  Men
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('dresses')}
                  className="hover:text-[#282c3f] hover:font-bold transition-all text-left cursor-pointer"
                >
                  Women
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('t-shirts')}
                  className="hover:text-[#282c3f] hover:font-bold transition-all text-left cursor-pointer"
                >
                  Kids
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('accessories')}
                  className="hover:text-[#282c3f] hover:font-bold transition-all text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('accessories')}
                  className="hover:text-[#282c3f] hover:font-bold transition-all text-left cursor-pointer"
                >
                  Beauty
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('t-shirts')}
                  className="hover:text-[#282c3f] hover:font-bold transition-all text-left cursor-pointer"
                >
                  Genz
                </button>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Gift Cards
                </span>
              </li>
              <li>
                <span className="hover:text-[#ff3f6c] hover:font-bold text-[#ff3f6c] transition-all cursor-pointer flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Zustag Insider
                </span>
              </li>
            </ul>

            {/* USEFUL LINKS */}
            <div className="pt-4 space-y-3">
              <div className="font-extrabold text-xs uppercase text-[#282c3f] tracking-wider">
                USEFUL LINKS
              </div>
              <ul className="space-y-2 text-[#696b79] font-normal text-xs">
                <li>
                  <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                    Blog
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                    Careers
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                    Site Map
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                    Corporate Information
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                    Whitehat
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                    Cleartrip
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. CUSTOMER POLICIES */}
          <div className="space-y-3">
            <div className="font-extrabold text-xs uppercase text-[#282c3f] tracking-wider">
              CUSTOMER POLICIES
            </div>
            <ul className="space-y-2 text-[#696b79] font-normal text-xs">
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  FAQ
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  T&C
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Terms Of Use
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Track Orders
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Shipping & 30-Min SLA
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Cancellation
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Returns
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#282c3f] hover:font-bold transition-all cursor-pointer">
                  Grievance Redressal
                </span>
              </li>
            </ul>
          </div>

          {/* 3. EXPERIENCE ZUSTAG APP ON MOBILE */}
          <div className="space-y-4">
            <div className="font-extrabold text-xs uppercase text-[#282c3f] tracking-wider">
              EXPERIENCE ZUSTAG APP ON MOBILE
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="bg-black text-white px-3.5 py-1.5 rounded-md flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-colors shadow-sm">
                <Smartphone className="w-5 h-5 text-white shrink-0" />
                <div className="text-left">
                  <div className="text-[8px] uppercase tracking-wider text-slate-300 leading-none">GET IT ON</div>
                  <div className="text-xs font-bold font-sans leading-tight">Google Play</div>
                </div>
              </div>

              <div className="bg-black text-white px-3.5 py-1.5 rounded-md flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-colors shadow-sm">
                <Award className="w-5 h-5 text-white shrink-0" />
                <div className="text-left">
                  <div className="text-[8px] uppercase tracking-wider text-slate-300 leading-none">Download on the</div>
                  <div className="text-xs font-bold font-sans leading-tight">App Store</div>
                </div>
              </div>
            </div>

            <div className="pt-3 space-y-2">
              <div className="font-extrabold text-xs uppercase text-[#282c3f] tracking-wider">
                KEEP IN TOUCH
              </div>
              <div className="flex items-center gap-3 text-[#696b79]">
                {['Facebook', 'Twitter', 'YouTube', 'Instagram'].map((s) => (
                  <span key={s} className="w-8 h-8 rounded-full bg-[#f5f5f6] hover:bg-[#eaeaec] flex items-center justify-center font-bold text-[10px] text-[#282c3f] cursor-pointer transition-colors shadow-xs">
                    {s[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. GUARANTEE & SERVICE ASSURANCES */}
          <div className="space-y-5 lg:col-span-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-[#eaeaec]">
                <ShieldCheck className="w-6 h-6 text-[#03a685]" />
              </div>
              <div>
                <div className="font-black text-xs text-[#282c3f]">
                  100% ORIGINAL guarantee
                </div>
                <p className="text-[11px] text-[#696b79] mt-0.5">
                  for all clothing, footwear and accessories at zustag.com directly verified from authorized brand showrooms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-[#eaeaec]">
                <RotateCcw className="w-6 h-6 text-[#2564ea]" />
              </div>
              <div>
                <div className="font-black text-xs text-[#282c3f]">
                  Return within 14days
                </div>
                <p className="text-[11px] text-[#696b79] mt-0.5">
                  of receiving your order. Easy doorstep pickup by our hyperlocal express fleet.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-[#eaeaec]">
                <Zap className="w-6 h-6 text-[#ff3f6c]" />
              </div>
              <div>
                <div className="font-black text-xs text-[#282c3f]">
                  30-Minute Guaranteed Express Delivery
                </div>
                <p className="text-[11px] text-[#696b79] mt-0.5">
                  Live showroom packing across Jamshedpur (Bistupur, Sakchi, Jugsalai, Sonari, Mango, Adityapur) & Gamharia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* POPULAR SEARCHES */}
        <div className="border-t border-[#eaeaec] pt-6 space-y-3 text-[11px] text-[#7e818c]">
          <div className="font-bold text-xs uppercase text-[#282c3f] tracking-wider">
            POPULAR SEARCHES
          </div>
          <p className="leading-relaxed">
            Makeup | Dresses For Girls | T-Shirts | Sandals | Headphones | Babydolls | Blazers For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes | Puma Shoes | Boxers | Wallets | Tops | Earrings | Fastrack Watches | Kurtis | Nike | Smart Watches | Titan Watches | Designer Blouse | Gowns | Rings | Cricket Shoes | Forever 21 | Eye Makeup | Photo Frames | Punjabi Suits | Bikini | Zustag Fashion Show | Lipstick | Saree | Watches | Dresses | Lehenga | Nike Shoes | Goggles | Bras | Suit | Chinos | Shoes | Adidas Shoes | Woodland Shoes | Jewellery | Designers Sarees
          </p>
        </div>

        {/* Copyright & Company Line */}
        <div className="border-t border-[#eaeaec] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7e818c]">
          <div className="flex items-center gap-2">
            <span>In case of any concern,</span>
            <strong className="text-[#282c3f] hover:underline cursor-pointer">Contact Us</strong>
          </div>
          <div>© 2026 www.zustag.com. All rights reserved.</div>
          <div className="font-semibold text-[#535766]">A Kangqore company</div>
        </div>
      </div>
    </footer>
  );
};

