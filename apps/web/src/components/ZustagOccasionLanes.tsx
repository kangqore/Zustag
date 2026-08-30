'use client';

import React, { useState } from 'react';
import { Clock, ArrowRight, Sparkles, Heart, Briefcase, Zap, PartyPopper, Sun, Moon, Flame } from 'lucide-react';

interface OccasionLane {
  id: string;
  title: string;
  subtitle: string;
  eta: string;
  categoryFilter: string;
  imageUrl: string;
  bgGradient: string;
  badge: string;
  badgeColor: string;
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'all';
}

const OCCASION_LANES: OccasionLane[] = [
  {
    id: 'occ_datenight',
    title: 'Date Night in 1 Hour',
    subtitle: 'Silk party dresses, chic heels & slim shirts',
    eta: '⚡ 18 MINS',
    categoryFilter: 'dresses',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-[#ff3f6c]/90 via-[#8a1c3c]/90 to-black/90',
    badge: 'Urgent Party Fit',
    badgeColor: 'bg-rose-500 text-white',
    timeSlot: 'evening'
  },
  {
    id: 'occ_meeting',
    title: 'Client Meeting Today',
    subtitle: 'Crisp Oxford shirts, formal trousers & belts',
    eta: '⚡ 15 MINS',
    categoryFilter: 'shirts',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-[#1e3a8a]/90 via-[#172554]/90 to-black/90',
    badge: 'Express Office Prep',
    badgeColor: 'bg-blue-600 text-white',
    timeSlot: 'morning'
  },
  {
    id: 'occ_wedding',
    title: 'Last-Minute Wedding / Puja',
    subtitle: 'Manyavar sherwanis, Soch sarees & kurtas',
    eta: '⚡ 22 MINS',
    categoryFilter: 'ethnic',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-[#b45309]/90 via-[#78350f]/90 to-black/90',
    badge: 'Silk & Heritage',
    badgeColor: 'bg-amber-600 text-white',
    timeSlot: 'all'
  },
  {
    id: 'occ_gym',
    title: 'Morning Gym & Run',
    subtitle: 'Breathable dry-fit tees, track pants & shoes',
    eta: '⚡ 14 MINS',
    categoryFilter: 't-shirts',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-[#065f46]/90 via-[#022c22]/90 to-black/90',
    badge: 'High Performance',
    badgeColor: 'bg-emerald-600 text-white',
    timeSlot: 'morning'
  }
];

interface OccasionLanesProps {
  onSelectCategory: (cat: string) => void;
}

export const ZustagOccasionLanes: React.FC<OccasionLanesProps> = ({ onSelectCategory }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'evening' | 'morning'>('all');

  const handleOccasionClick = (cat: string) => {
    onSelectCategory(cat);
    const el = document.getElementById('showroom-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredLanes = OCCASION_LANES.filter(l => 
    activeTab === 'all' || l.timeSlot === 'all' || l.timeSlot === activeTab
  );

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 space-y-4">
        {/* Section Title with Time-of-Day Curation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#2564ea] tracking-wider">
              <Clock className="w-4 h-4" />
              <span>30-MINUTE FASHION EMERGENCIES &bull; TIME-ADAPTIVE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#282c3f] tracking-wide uppercase font-serif mt-0.5">
              Curated Occasion Quick-Lanes
            </h2>
          </div>

          {/* Time Slot Filter Pills */}
          <div className="flex items-center gap-1 bg-[#f5f5f6] p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'all' ? 'bg-white text-[#282c3f] shadow-xs' : 'text-[#7e818c] hover:text-[#282c3f]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>All Occasions</span>
            </button>
            <button
              onClick={() => setActiveTab('evening')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'evening' ? 'bg-white text-[#ff3f6c] shadow-xs' : 'text-[#7e818c] hover:text-[#282c3f]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>Evening Party (Now Active)</span>
            </button>
            <button
              onClick={() => setActiveTab('morning')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'morning' ? 'bg-white text-[#2564ea] shadow-xs' : 'text-[#7e818c] hover:text-[#282c3f]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Office & Gym</span>
            </button>
          </div>
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredLanes.map((occ) => (
            <div
              key={occ.id}
              onClick={() => handleOccasionClick(occ.categoryFilter)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer h-60 flex flex-col justify-between p-5 border border-[#eaeaec] hover:border-transparent hover:-translate-y-1"
            >
              {/* Background Image with Ambient Gradient */}
              <img
                src={occ.imageUrl}
                alt={occ.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80';
                }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${occ.bgGradient}`} />

              {/* Top Header Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs ${occ.badgeColor}`}>
                  {occ.badge}
                </span>

                <span className="bg-white/95 backdrop-blur-xs text-[#282c3f] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Zap className="w-3 h-3 fill-[#ff3f6c] text-[#ff3f6c]" />
                  <span>{occ.eta}</span>
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 space-y-1 text-white">
                <h3 className="text-lg font-black leading-tight drop-shadow-xs">
                  {occ.title}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                  {occ.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-cyan-300 group-hover:text-white transition-colors">
                  <span>Explore 30-Min Fits</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
