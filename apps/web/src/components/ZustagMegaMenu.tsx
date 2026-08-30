'use client';

import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Store, 
  PartyPopper, 
  Briefcase, 
  Crown, 
  Dumbbell, 
  Palmtree, 
  ShieldCheck,
  Building2,
  ChevronRight,
  Flame
} from 'lucide-react';

interface MegaMenuProps {
  activeCategory: string | null;
  onSelectCategoryFilter: (category: string) => void;
  onSelectView: (view: any) => void;
  onSelectBrand?: (brand: string) => void;
}

export const ZustagMegaMenu: React.FC<MegaMenuProps> = ({
  activeCategory,
  onSelectCategoryFilter,
  onSelectView,
  onSelectBrand
}) => {
  if (!activeCategory) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-[#eaeaec] shadow-2xl z-50 animate-slide-in-up">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 py-7 grid grid-cols-6 gap-6 text-[#1e2434]">
        
        {/* Column 1: Westernwear */}
        <div className="space-y-3 border-r border-[#f0f0f2] pr-4">
          <div className="text-xs font-black uppercase text-[#ff3f6c] tracking-wider flex items-center justify-between">
            <span>Westernwear</span>
            <span className="text-[9px] bg-rose-50 text-[#ff3f6c] px-1.5 py-0.5 rounded font-black">POPULAR</span>
          </div>
          <ul className="space-y-2 text-xs text-[#535766]">
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('shirts')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Casual & Oxford Shirts</span>
                <span className="text-[10px] text-[#7e818c]">120+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('t-shirts')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Drop-Shoulder & Tees</span>
                <span className="text-[10px] text-[#7e818c]">85+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('jeans')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Denims & Slim Fit Jeans</span>
                <span className="text-[10px] text-[#7e818c]">94+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('shirts')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Chinos & Tailored Trousers</span>
                <span className="text-[10px] text-[#7e818c]">60+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('dresses')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Dresses & Jumpsuits</span>
                <span className="text-[10px] text-[#7e818c]">72+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('shirts')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Jackets & Office Blazers</span>
                <span className="text-[10px] text-[#7e818c]">45+</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Ethnicwear & Festive */}
        <div className="space-y-3 border-r border-[#f0f0f2] pr-4">
          <div className="text-xs font-black uppercase text-[#ff3f6c] tracking-wider flex items-center justify-between">
            <span>Ethnic & Festive</span>
            <span className="text-[9px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-black">ROYAL</span>
          </div>
          <ul className="space-y-2 text-xs text-[#535766]">
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('ethnic')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Designer Kurtas & Sets</span>
                <span className="text-[10px] text-[#7e818c]">110+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('sarees')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Chanderi & Silk Sarees</span>
                <span className="text-[10px] text-[#7e818c]">80+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('wedding')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Sherwanis & Bandhgalas</span>
                <span className="text-[10px] text-[#7e818c]">35+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('festival')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Bridal Lehengas & Sets</span>
                <span className="text-[10px] text-[#7e818c]">42+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('ethnic')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Nehru Jackets & Dhotis</span>
                <span className="text-[10px] text-[#7e818c]">28+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('ethnic')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Organic Handloom Kurtis</span>
                <span className="text-[10px] text-[#7e818c]">65+</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Footwear & Accessories */}
        <div className="space-y-3 border-r border-[#f0f0f2] pr-4">
          <div className="text-xs font-black uppercase text-[#ff3f6c] tracking-wider flex items-center justify-between">
            <span>Footwear & Bags</span>
            <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-black">ALL SIZES</span>
          </div>
          <ul className="space-y-2 text-xs text-[#535766]">
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('footwear')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Streetwear Sneakers</span>
                <span className="text-[10px] text-[#7e818c]">95+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('footwear')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Leather Formal Loafers</span>
                <span className="text-[10px] text-[#7e818c]">48+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('accessories')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Designer Handbags & Clutches</span>
                <span className="text-[10px] text-[#7e818c]">52+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('accessories')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Chronograph Watches</span>
                <span className="text-[10px] text-[#7e818c]">30+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('accessories')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Leather Belts & Wallets</span>
                <span className="text-[10px] text-[#7e818c]">40+</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('accessories')}
                className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between"
              >
                <span>Luxury Fragrances & Deos</span>
                <span className="text-[10px] text-[#7e818c]">34+</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: 🍸 SHOP BY OCCASION (Pantaloons Signature Pillar) */}
        <div className="space-y-3 border-r border-[#f0f0f2] pr-4 bg-gradient-to-b from-[#fff1f4]/40 to-transparent p-2.5 rounded-xl">
          <div className="text-xs font-black uppercase text-[#ff3f6c] tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SHOP BY OCCASION</span>
          </div>
          <ul className="space-y-2 text-xs text-[#1e2434] font-bold">
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('dresses')}
                className="hover:text-[#ff3f6c] transition-colors cursor-pointer text-left w-full flex items-center gap-2 p-1 rounded-lg hover:bg-white"
              >
                <PartyPopper className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold">Party & Nightlife</div>
                  <div className="text-[10px] text-[#7e818c] font-normal">Cocktail dresses & silks</div>
                </div>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('shirts')}
                className="hover:text-[#ff3f6c] transition-colors cursor-pointer text-left w-full flex items-center gap-2 p-1 rounded-lg hover:bg-white"
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold">Work & Formals</div>
                  <div className="text-[10px] text-[#7e818c] font-normal">Crisp blazers & chinos</div>
                </div>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('wedding')}
                className="hover:text-[#ff3f6c] transition-colors cursor-pointer text-left w-full flex items-center gap-2 p-1 rounded-lg hover:bg-white"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold">Royal Wedding</div>
                  <div className="text-[10px] text-[#7e818c] font-normal">Sherwanis & bridal sarees</div>
                </div>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('t-shirts')}
                className="hover:text-[#ff3f6c] transition-colors cursor-pointer text-left w-full flex items-center gap-2 p-1 rounded-lg hover:bg-white"
              >
                <Dumbbell className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold">Active & Gym</div>
                  <div className="text-[10px] text-[#7e818c] font-normal">Joggers & dry-fit tees</div>
                </div>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCategoryFilter('jeans')}
                className="hover:text-[#ff3f6c] transition-colors cursor-pointer text-left w-full flex items-center gap-2 p-1 rounded-lg hover:bg-white"
              >
                <Palmtree className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold">Weekend Casuals</div>
                  <div className="text-[10px] text-[#7e818c] font-normal">Relaxed shorts & tees</div>
                </div>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: 🏆 SHOP BY BRAND (Certified Showrooms) */}
        <div className="space-y-3 border-r border-[#f0f0f2] pr-4">
          <div className="text-xs font-black uppercase text-[#1e2434] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#03a685]" />
            <span>SHOP BY BRAND</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#535766]">
            {[
              { name: 'Manyavar', tag: 'Wedding' },
              { name: 'Zudio', tag: 'Value Hub' },
              { name: 'Peter England', tag: 'Formals' },
              { name: "Levi's", tag: 'Denim' },
              { name: 'Soch', tag: 'Silk Sarees' },
              { name: 'Bata', tag: 'Footwear' },
              { name: 'Fabindia', tag: 'Handloom' },
              { name: 'Westside', tag: 'Studio' }
            ].map((br) => (
              <li key={br.name}>
                <button
                  onClick={() => {
                    if (onSelectBrand) onSelectBrand(br.name);
                    else onSelectCategoryFilter('all');
                  }}
                  className="hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer text-left w-full flex items-center justify-between py-0.5"
                >
                  <span className="font-bold text-[#1e2434]">{br.name}</span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold">
                    {br.tag}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 6: 🏬 SHOWROOM CLUSTERS (30M SLA) */}
        <div className="space-y-3 bg-gradient-to-b from-[#eef2ff]/50 to-transparent p-2.5 rounded-xl">
          <div className="text-xs font-black uppercase text-[#2564ea] tracking-wider flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5" />
            <span>SHOWROOM HUBS</span>
          </div>
          <ul className="space-y-2 text-xs text-[#1e2434] font-bold">
            <li>
              <button 
                onClick={() => onSelectView('market_map')}
                className="hover:text-[#2564ea] transition-colors cursor-pointer text-left w-full p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#2564ea]/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">P&M Mall Outlets</span>
                  <span className="text-[10px] text-rose-500 font-black">14 Stores</span>
                </div>
                <div className="text-[10px] text-[#03a685] font-semibold flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  <span>18-Min Express Courier</span>
                </div>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectView('market_map')}
                className="hover:text-[#2564ea] transition-colors cursor-pointer text-left w-full p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#2564ea]/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">Bistupur Boulevard</span>
                  <span className="text-[10px] text-rose-500 font-black">18 Stores</span>
                </div>
                <div className="text-[10px] text-[#03a685] font-semibold flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  <span>15-Min Express Courier</span>
                </div>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectView('market_map')}
                className="hover:text-[#2564ea] transition-colors cursor-pointer text-left w-full p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#2564ea]/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">Sakchi High Street</span>
                  <span className="text-[10px] text-rose-500 font-black">22 Stores</span>
                </div>
                <div className="text-[10px] text-[#03a685] font-semibold flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  <span>20-Min Express Courier</span>
                </div>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectView('market_map')}
                className="hover:text-[#2564ea] transition-colors cursor-pointer text-left w-full p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#2564ea]/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">Gamharia Corridor</span>
                  <span className="text-[10px] text-emerald-600 font-black">36 Stores</span>
                </div>
                <div className="text-[10px] text-[#03a685] font-semibold flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  <span>25-Min Express Courier</span>
                </div>
              </button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
