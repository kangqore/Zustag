'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Star, 
  ShieldCheck, 
  Phone, 
  Zap, 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  Radio,
  Clock,
  Sparkles,
  ExternalLink,
  BookOpen,
  Footprints,
  Briefcase,
  Gem,
  GraduationCap
} from 'lucide-react';
import { Store, SEED_STORES, AcquisitionPriority, BusinessType, PriceBand, POSCapability } from '@zustag/domain-core';

const FALLBACK_STORE_IMAGE = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80';

// Complete Working Master Census for Gamharia
interface GamhariaCensusItem {
  id: string;
  name: string;
  category: string;
  subCategory: 'Clothing' | 'Ladies Boutique' | 'Men\'s Wear' | 'Footwear' | 'Bags & Accessories' | 'Jewellery' | 'Uniforms & Institutional';
  address: string;
  landmark: string;
  priority: '🔴 Priority A (Anchor)' | '🟠 Priority B (Specialist)' | '🟡 Priority C (Local)';
  rating?: number;
  reviewCount?: number;
  tags: string[];
}

export const GAMHARIA_MASTER_CENSUS: GamhariaCensusItem[] = [
  // 1. Clothing / Readymade / Anchors
  { id: 'gam_01', name: 'CITI STYLE - GAMHARIA', category: 'Multi-Brand Family Fashion', subCategory: 'Clothing', address: 'Tata-Kandra Main Rd, Near Lal Building', landmark: 'Lal Building Chowk', priority: '🔴 Priority A (Anchor)', rating: 4.6, reviewCount: 7180, tags: ['Mega Store', 'Mass Fashion', '7k+ Reviews'] },
  { id: 'gam_02', name: 'Zudio - Gamharia Tata Trent', category: 'Youth & Mass Fashion', subCategory: 'Clothing', address: 'Identity, Tata-Kandra Rd, Near Auto Cluster Phase VII', landmark: 'Auto Cluster', priority: '🔴 Priority A (Anchor)', rating: 4.7, reviewCount: 2450, tags: ['Tata Trent', 'GenZ Value', 'Fast-30-Min'] },
  { id: 'gam_03', name: 'ICONIC MEN\'S WEAR', category: 'Dedicated Men\'s Fashion', subCategory: 'Men\'s Wear', address: 'Mahabir Trade Center, Near Teachers Training School', landmark: 'Tata-Kandra Main Rd', priority: '🔴 Priority A (Anchor)', rating: 5.0, reviewCount: 57, tags: ['5.0 Star Rating', 'Premium Menswear'] },
  { id: 'gam_04', name: 'Peter England Showroom Gamharia', category: 'Branded Men\'s Formals & Casuals', subCategory: 'Men\'s Wear', address: 'Main Road, Gamharia', landmark: 'Near Sabji Market', priority: '🔴 Priority A (Anchor)', rating: 4.5, reviewCount: 280, tags: ['Aditya Birla', 'Formals'] },
  { id: 'gam_05', name: 'Spykar Exclusive Gamharia', category: 'Denims & Youth Casuals', subCategory: 'Clothing', address: 'Tata-Kandra Highway, Gamharia', landmark: 'Opp. Bico More', priority: '🔴 Priority A (Anchor)', rating: 4.6, reviewCount: 160, tags: ['Denim Specialist', 'Casuals'] },
  { id: 'gam_06', name: 'Brands Heaven — Your Fashion Destination', category: 'Multi-Brand Casuals', subCategory: 'Clothing', address: 'Lal Building Chowk, Main Road', landmark: 'Lal Building', priority: '🔴 Priority A (Anchor)', rating: 4.8, reviewCount: 190, tags: ['Multi-Brand', 'Youth Fits'] },
  { id: 'gam_07', name: 'Laxmi Narayan Fashions', category: 'Family & Traditional Apparel', subCategory: 'Clothing', address: 'Lal Building Area, Gamharia', landmark: 'Lal Building', priority: '🔴 Priority A (Anchor)', rating: 4.4, reviewCount: 95, tags: ['Family Store', 'Daily Wear'] },
  { id: 'gam_08', name: 'Fashion Your Choice — A Unit by Usha Enterprises', category: 'Readymade Garments', subCategory: 'Clothing', address: 'Gamharia Market Complex', landmark: 'Sabji Mandi Rd', priority: '🟠 Priority B (Specialist)', rating: 4.3, reviewCount: 48, tags: ['Readymade', 'Value'] },
  { id: 'gam_09', name: 'The Men\'s Gallery', category: 'Smart Men\'s Wear', subCategory: 'Men\'s Wear', address: 'Tata-Kandra Rd, Gamharia', landmark: 'Near Bico More', priority: '🟠 Priority B (Specialist)', rating: 4.5, reviewCount: 62, tags: ['Shirts', 'Trousers'] },
  { id: 'gam_10', name: 'Brand Of Youth (BOY)', category: 'Streetwear & Denim', subCategory: 'Men\'s Wear', address: 'Gamharia Station Rd', landmark: 'Near Overbridge', priority: '🟠 Priority B (Specialist)', rating: 4.4, reviewCount: 38, tags: ['Streetwear', 'Tees'] },
  { id: 'gam_11', name: 'Satyam Vastralaya Ladies & Children', category: 'Ethnic & Kids Apparel', subCategory: 'Clothing', address: 'Sabji Market Road, Gamharia', landmark: 'Sabji Market', priority: '🟠 Priority B (Specialist)', rating: 4.5, reviewCount: 110, tags: ['Kids Wear', 'Ladies Sarees'] },
  { id: 'gam_12', name: 'Maa Parvati Vastralaya', category: 'Traditional Sarees & Suiting', subCategory: 'Clothing', address: 'Gamharia Main Market', landmark: 'Central Chowk', priority: '🟠 Priority B (Specialist)', rating: 4.3, reviewCount: 75, tags: ['Sarees', 'Suiting'] },
  { id: 'gam_13', name: 'Poddar Vastralaya', category: 'Readymade & Dress Material', subCategory: 'Clothing', address: 'Station Road, Gamharia', landmark: 'Station Road', priority: '🟡 Priority C (Local)', rating: 4.2, reviewCount: 30, tags: ['Fabrics', 'Dresses'] },
  { id: 'gam_14', name: 'Mansi Readymade Store', category: 'Kids & Family Wear', subCategory: 'Clothing', address: 'Dhirajganj, Gamharia', landmark: 'Dhirajganj Sabji Market', priority: '🟡 Priority C (Local)', rating: 4.3, reviewCount: 52, tags: ['Family', 'Budget'] },
  { id: 'gam_15', name: 'Attraction Readymade Garments', category: 'Daily Casuals', subCategory: 'Clothing', address: 'Gamharia Market Shop 14', landmark: 'Market Square', priority: '🟡 Priority C (Local)', rating: 4.1, reviewCount: 22, tags: ['Readymade', 'Casuals'] },
  { id: 'gam_16', name: 'Utsav Vastralay', category: 'Festive & Saree Collection', subCategory: 'Clothing', address: 'Sabji Market Road, Gamharia', landmark: 'Sabji Market', priority: '🟠 Priority B (Specialist)', rating: 4.4, reviewCount: 42, tags: ['Festive', 'Sarees'] },

  // 2. Ladies & Boutiques
  { id: 'gam_17', name: 'Aanchal Boutique', category: 'Designer Blouses & Suits', subCategory: 'Ladies Boutique', address: 'Tata-Kandra Highway near Mangalam City', landmark: 'Bico More / Mangalam City', priority: '🟠 Priority B (Specialist)', rating: 4.7, reviewCount: 88, tags: ['Custom Stitching', 'Designer Kurtis'] },
  { id: 'gam_18', name: 'Poonam Boutique & Ladies Tailor', category: 'Custom Tailoring & Fabrics', subCategory: 'Ladies Boutique', address: 'Dhirajganj Sabji Market, Gamharia', landmark: 'Sabji Market', priority: '🟠 Priority B (Specialist)', rating: 4.6, reviewCount: 64, tags: ['Boutique', 'Ladies Corner'] },
  { id: 'gam_19', name: 'Nibha Ladies Corner', category: 'Ethnic Wear & Cosmetics', subCategory: 'Ladies Boutique', address: 'Gamharia Market Complex', landmark: 'Market Gate', priority: '🟡 Priority C (Local)', rating: 4.3, reviewCount: 35, tags: ['Ladies Fashion', 'Accessories'] },
  { id: 'gam_20', name: 'The Lady Style', category: 'Modern Western & Ethnic', subCategory: 'Ladies Boutique', address: 'Near Lal Building, Gamharia', landmark: 'Lal Building', priority: '🟠 Priority B (Specialist)', rating: 4.5, reviewCount: 40, tags: ['Western Kurtis', 'Dresses'] },
  { id: 'gam_21', name: 'Soni Tailor & Boutique', category: 'Ladies Bespoke Fits', subCategory: 'Ladies Boutique', address: 'Dhirajganj Sabji Market area', landmark: 'Dhirajganj', priority: '🟡 Priority C (Local)', rating: 4.2, reviewCount: 28, tags: ['Tailoring', 'Bespoke'] },

  // 3. Footwear & Shoes
  { id: 'gam_22', name: 'Sen Shoes Gamharia', category: 'Branded Footwear & Sneakers', subCategory: 'Footwear', address: 'Manglam Tower, Tata-Kandra Main Rd', landmark: 'Manglam Tower', priority: '🟠 Priority B (Specialist)', rating: 4.7, reviewCount: 310, tags: ['Campus', 'Sparx', 'Sneakers'] },
  { id: 'gam_23', name: 'Iconic Footwear', category: 'Men\'s & Women\'s Shoes', subCategory: 'Footwear', address: 'Mahabir Trade Center, Teachers Training Rd', landmark: 'Mahabir Trade Center', priority: '🟠 Priority B (Specialist)', rating: 4.8, reviewCount: 140, tags: ['Formal Shoes', 'Casual Loafers'] },
  { id: 'gam_24', name: 'Rohit Shoes Gamharia', category: 'Daily Footwear & Sandals', subCategory: 'Footwear', address: 'Gamharia Sabji Mandi Rd', landmark: 'Sabji Mandi', priority: '🟡 Priority C (Local)', rating: 4.3, reviewCount: 85, tags: ['Sandals', 'Slippers'] },
  { id: 'gam_25', name: 'Dhane Footwear & Bags', category: 'Footwear & Luggage Combo', subCategory: 'Footwear', address: 'Shop No. 36, Gamharia Main Market', landmark: 'Gamharia Market', priority: '🟠 Priority B (Specialist)', rating: 4.6, reviewCount: 145, tags: ['Shoes', 'Bags', 'Travel'] },
  { id: 'gam_26', name: 'P.K. Shoes & Fashion Feet', category: 'Sports & Casual Shoes', subCategory: 'Footwear', address: 'Main Road, Gamharia', landmark: 'Opp. Police Station', priority: '🟡 Priority C (Local)', rating: 4.2, reviewCount: 45, tags: ['Sports Shoes', 'Value'] },

  // 4. Bags & Accessories
  { id: 'gam_27', name: 'HAPPY BAG STORY', category: 'Handbags & Backpacks', subCategory: 'Bags & Accessories', address: 'Tata-Kandra Rd, Gamharia', landmark: 'Near Identity Complex', priority: '🟠 Priority B (Specialist)', rating: 4.5, reviewCount: 50, tags: ['Handbags', 'College Bags'] },
  { id: 'gam_28', name: 'Gungun Bag Store', category: 'Luggage & School Bags', subCategory: 'Bags & Accessories', address: 'Sabji Market Road, Gamharia', landmark: 'Sabji Market', priority: '🟡 Priority C (Local)', rating: 4.2, reviewCount: 32, tags: ['Trolley', 'School Bags'] },
  { id: 'gam_29', name: 'Himanshu Bag Store', category: 'Travel Gear & Bags', subCategory: 'Bags & Accessories', address: 'Gamharia Market Shop 12', landmark: 'Market Square', priority: '🟡 Priority C (Local)', rating: 4.3, reviewCount: 29, tags: ['Duffel Bags', 'Backpacks'] },

  // 5. Jewellery & Fashion Jewellery
  { id: 'gam_30', name: 'Shree Mahabir Jewellers', category: 'Gold & Silver Jewellery', subCategory: 'Jewellery', address: 'Behind Gamharia Lal Building', landmark: 'Behind Lal Building', priority: '🟠 Priority B (Specialist)', rating: 4.8, reviewCount: 210, tags: ['Bridal Jewellery', 'Ornaments'] },
  { id: 'gam_31', name: 'Narayani Jewellers Gamharia', category: 'Traditional & Fashion Jewellery', subCategory: 'Jewellery', address: 'Main Road, Gamharia', landmark: 'Near Lal Building', priority: '🟠 Priority B (Specialist)', rating: 4.7, reviewCount: 175, tags: ['Gold', 'Fashion Ornaments'] },
  { id: 'gam_32', name: 'Maa Ambika Jewellers', category: 'Silver & Fashion Jewellery', subCategory: 'Jewellery', address: 'Sabji Market Road, Gamharia', landmark: 'Sabji Market', priority: '🟡 Priority C (Local)', rating: 4.4, reviewCount: 65, tags: ['Silver Ornaments', 'Gifts'] },
  { id: 'gam_33', name: 'Ishwar Lal Jewellers', category: 'Hallmarked Ornaments', subCategory: 'Jewellery', address: 'Station Road, Gamharia', landmark: 'Station Chowk', priority: '🟡 Priority C (Local)', rating: 4.5, reviewCount: 55, tags: ['Hallmark', 'Traditional'] },

  // 6. School & Institutional Uniforms
  { id: 'gam_34', name: 'Agarwal Uniforms', category: 'School Uniforms & Institutional Apparel', subCategory: 'Uniforms & Institutional', address: 'Sabji Market Road, Dhirajganj, Gamharia', landmark: 'Dhirajganj Sabji Market', priority: '🟠 Priority B (Specialist)', rating: 4.7, reviewCount: 380, tags: ['School Uniforms', 'Belts & Ties', 'Institutional'] },
  { id: 'gam_35', name: 'School Bazar Gamharia', category: 'School Dress & Accessories', subCategory: 'Uniforms & Institutional', address: 'Near Teachers Training School Rd', landmark: 'Mahabir Trade Center', priority: '🟠 Priority B (Specialist)', rating: 4.5, reviewCount: 140, tags: ['School Blazers', 'Uniform Sets'] },
  { id: 'gam_36', name: 'Laxmi Narayan Cloth Store Uniforms', category: 'Institutional Fabrics & Silai', subCategory: 'Uniforms & Institutional', address: 'Lal Building Area, Gamharia', landmark: 'Lal Building', priority: '🟡 Priority C (Local)', rating: 4.3, reviewCount: 88, tags: ['Uniform Fabrics', 'Bulk Stitching'] }
];

interface MerchantIntelligenceGraphProps {
  onSelectStoreToShop?: (storeId: string) => void;
}

export const MerchantIntelligenceGraph: React.FC<MerchantIntelligenceGraphProps> = ({
  onSelectStoreToShop
}) => {
  const [activeTab, setActiveTab] = useState<'network_map' | 'gamharia_census'>('network_map');
  
  // Network Map Filters
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedLocality, setSelectedLocality] = useState<string>('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('all');
  const [selectedPosReady, setSelectedPosReady] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Gamharia Census Subcategory Filter
  const [gamhariaSubcat, setGamhariaSubcat] = useState<string>('all');
  const [gamhariaSearch, setGamhariaSearch] = useState<string>('');
  const [gamhariaPriority, setGamhariaPriority] = useState<string>('all');

  const localities = [
    { id: 'all', label: 'All Jamshedpur Clusters' },
    { id: 'Bistupur', label: 'Bistupur & P&M Mall (🔴 Tier 1)' },
    { id: 'Sakchi', label: 'Sakchi High St & Market (🔴 Tier 1)' },
    { id: 'Gamharia', label: 'Gamharia Industrial Corridor (🔴 Tier 1)' },
    { id: 'Jugsalai', label: 'Jugsalai Wholesale Hub (🔴 Tier 1)' },
    { id: 'Sonari', label: 'Sonari Boutique District (🟠 Tier 2)' },
    { id: 'Mango', label: 'Mango & Dimna Rd (🟠 Tier 2)' },
    { id: 'Adityapur', label: 'Adityapur Mall Corridor (🟠 Tier 2)' },
    { id: 'Golmuri', label: 'Golmuri Heritage Hub (🟡 Tier 3)' }
  ];

  const filteredStores = SEED_STORES.filter(store => {
    if (selectedTier !== 'all' && store.acquisitionTier !== selectedTier) return false;
    if (selectedLocality !== 'all' && store.locality !== selectedLocality) return false;
    if (selectedBusinessType !== 'all' && store.businessType !== selectedBusinessType) return false;
    if (selectedPosReady !== 'all' && store.posCapability !== selectedPosReady) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = 
        store.name.toLowerCase().includes(q) ||
        store.brand.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.mallOrMarket.toLowerCase().includes(q) ||
        store.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const filteredGamhariaCensus = GAMHARIA_MASTER_CENSUS.filter(item => {
    if (gamhariaSubcat !== 'all' && item.subCategory !== gamhariaSubcat) return false;
    if (gamhariaPriority !== 'all' && !item.priority.includes(gamhariaPriority)) return false;
    if (gamhariaSearch) {
      const q = gamhariaSearch.toLowerCase();
      const match = 
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.landmark.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const totalSqFt = SEED_STORES.reduce((acc, s) => acc + (s.approxStoreSqFt || 3000), 0);

  return (
    <div className="space-y-8 pb-16 text-[#282c3f]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#182344] via-[#2564ea] to-[#4ab6d4] text-white p-6 sm:p-8 rounded-xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-[#ff3f6c] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider">
                MERCHANT GRAPH OS
              </span>
              <span className="text-cyan-200 text-xs font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 text-cyan-300 animate-ping" />
                Live Jamshedpur & Gamharia Showroom Mesh
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Jamshedpur & Gamharia Fashion Market Map
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
              Mapping 150+ verified fashion showrooms across P&M Mall, Bistupur, Sakchi, Jugsalai, Sonari, Mango, and the deep Gamharia Industrial Retail Corridor.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md p-3 px-5 rounded-xl border border-white/20">
            <div>
              <div className="text-[10px] text-cyan-200 uppercase font-bold">Mapped Retail Floor</div>
              <div className="text-lg font-black text-white font-mono">{totalSqFt.toLocaleString()} Sq. Ft</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-[10px] text-cyan-200 uppercase font-bold">Census Database</div>
              <div className="text-lg font-black text-cyan-300 font-mono">{GAMHARIA_MASTER_CENSUS.length + SEED_STORES.length} Hubs</div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs: Jamshedpur Network vs Gamharia Deep Census */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/20 relative z-10">
          <button
            onClick={() => setActiveTab('network_map')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'network_map'
                ? 'bg-white text-[#282c3f] shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Jamshedpur Live Showroom Grid ({SEED_STORES.length} Active Hubs)
          </button>

          <button
            onClick={() => setActiveTab('gamharia_census')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'gamharia_census'
                ? 'bg-[#ff3f6c] text-white shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            ⚡ Gamharia Master Census ({GAMHARIA_MASTER_CENSUS.length} Mapped Stores)
          </button>
        </div>
      </div>

      {activeTab === 'network_map' ? (
        /* Tab 1: Full Jamshedpur Network Map */
        <div className="space-y-6">
          {/* Intelligence Filter Controls */}
          <div className="bg-white border border-[#eaeaec] p-4 rounded-xl shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-[#7e818c] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by store name, Citi Style, Zudio, P&M Mall, Sakchi, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f5f5f6] border border-transparent focus:border-[#282c3f] focus:bg-white rounded-md pl-9 pr-3 py-2 text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="text-xs font-bold bg-[#f5f5f6] border border-[#eaeaec] px-3 py-2 rounded-md focus:outline-none cursor-pointer"
                >
                  {localities.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.label}</option>
                  ))}
                </select>

                <select
                  value={selectedBusinessType}
                  onChange={(e) => setSelectedBusinessType(e.target.value)}
                  className="text-xs font-bold bg-[#f5f5f6] border border-[#eaeaec] px-3 py-2 rounded-md focus:outline-none cursor-pointer"
                >
                  <option value="all">All Business Formats</option>
                  <option value="ORGANIZED_CHAIN">Organized Brand Chains</option>
                  <option value="INDEPENDENT_BOUTIQUE">Independent Boutiques & Studios</option>
                  <option value="WHOLESALE_VALUE">Wholesale & Mass Retail</option>
                  <option value="ACCESSORY_SPECIALIST">Footwear, Watches & Bags</option>
                </select>
              </div>
            </div>

            {/* Locality Quick Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-[#f5f5f6]">
              <span className="text-[10px] font-bold text-[#7e818c] uppercase whitespace-nowrap">Clusters:</span>
              {localities.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocality(loc.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedLocality === loc.id
                      ? 'bg-[#282c3f] text-white shadow-sm'
                      : 'bg-[#f5f5f6] text-[#535766] hover:bg-[#eaeaec]'
                  }`}
                >
                  {loc.label.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Showrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStores.map((store) => {
              const tierBadge = 
                store.acquisitionTier === 'TIER_1_CRITICAL' 
                  ? { label: 'TIER 1 CRITICAL', color: 'bg-rose-100 text-rose-700 border-rose-200' }
                  : store.acquisitionTier === 'TIER_2_HIGH'
                  ? { label: 'TIER 2 HIGH', color: 'bg-amber-100 text-amber-700 border-amber-200' }
                  : { label: 'TIER 3 MEDIUM', color: 'bg-teal-100 text-teal-700 border-teal-200' };

              return (
                <div 
                  key={store.id}
                  className="bg-white border border-[#eaeaec] hover:border-[#282c3f] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-40 bg-[#f5f5f6] overflow-hidden">
                    <img 
                      src={store.imageUrl} 
                      alt={store.name} 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_STORE_IMAGE;
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border shadow-sm ${tierBadge.color}`}>
                        {tierBadge.label}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="zustag-rating-pill text-[11px]">
                        <span>{store.rating}</span>
                        <Star className="w-3 h-3 fill-[#ff905a] text-[#ff905a]" />
                        <span className="text-[#7e818c] font-normal">({store.totalRatings})</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <div className="text-[10px] font-bold uppercase text-cyan-300 tracking-wider">
                        {store.mallOrMarket}
                      </div>
                      <div className="font-extrabold text-sm leading-tight truncate">
                        {store.name}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#535766]">
                        <MapPin className="w-3.5 h-3.5 text-[#ff3f6c] shrink-0" />
                        <span className="truncate">{store.address}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        {store.fashionSegments.map((seg, idx) => (
                          <span 
                            key={idx}
                            className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#f5f5f6] text-[#282c3f] border border-[#eaeaec]"
                          >
                            {seg}
                          </span>
                        ))}
                      </div>

                      <div className="bg-[#fafbfc] border border-[#eaeaec] p-2.5 rounded-lg space-y-1.5 text-[11px] text-[#535766]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#7e818c]">Format:</span>
                          <span className="font-bold text-[#282c3f]">{store.businessType.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#7e818c]">POS Sync:</span>
                          <span className="font-mono font-bold text-[#03a685]">{store.posCapability.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#7e818c]">Est. Store Size:</span>
                          <span className="font-bold text-[#282c3f]">{store.approxStoreSqFt?.toLocaleString() || '3,000'} Sq. Ft</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#7e818c]">Prep SLA:</span>
                          <span className="font-bold text-[#2564ea]">{store.averagePrepTimeMinutes} Mins Target</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#f5f5f6] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#535766]">
                        <Phone className="w-3.5 h-3.5 text-[#7e818c]" />
                        <span className="font-mono">{store.contactNumber}</span>
                      </div>

                      {onSelectStoreToShop && (
                        <button
                          onClick={() => onSelectStoreToShop(store.id)}
                          className="px-3 py-1.5 rounded bg-[#282c3f] hover:bg-[#ff3f6c] text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Shop Store</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Tab 2: Gamharia Deep Fashion Census */
        <div className="space-y-6">
          {/* Subcategory Filter Bar */}
          <div className="bg-white border border-[#eaeaec] p-4 rounded-xl shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-[#7e818c] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Gamharia stores, Citi Style, Zudio, Sen Shoes, Agarwal Uniforms..."
                  value={gamhariaSearch}
                  onChange={(e) => setGamhariaSearch(e.target.value)}
                  className="w-full bg-[#f5f5f6] border border-transparent focus:border-[#282c3f] focus:bg-white rounded-md pl-9 pr-3 py-2 text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={gamhariaPriority}
                  onChange={(e) => setGamhariaPriority(e.target.value)}
                  className="text-xs font-bold bg-[#f5f5f6] border border-[#eaeaec] px-3 py-2 rounded-md focus:outline-none cursor-pointer"
                >
                  <option value="all">All Priorities</option>
                  <option value="Priority A">🔴 Priority A (Key Anchors)</option>
                  <option value="Priority B">🟠 Priority B (Specialists)</option>
                  <option value="Priority C">🟡 Priority C (Local Neighborhood)</option>
                </select>
              </div>
            </div>

            {/* Subcategory Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-[#f5f5f6]">
              {[
                { id: 'all', label: 'All Segments', icon: Layers },
                { id: 'Clothing', label: 'Clothing & Readymade', icon: ShoppingBag },
                { id: 'Men\'s Wear', label: 'Men\'s Exclusive', icon: Users },
                { id: 'Ladies Boutique', label: 'Ladies & Boutiques', icon: Sparkles },
                { id: 'Footwear', label: 'Footwear & Shoes', icon: Footprints },
                { id: 'Bags & Accessories', label: 'Bags & Luggage', icon: Briefcase },
                { id: 'Jewellery', label: 'Jewellery Ornaments', icon: Gem },
                { id: 'Uniforms & Institutional', label: 'School & Institutional Uniforms', icon: GraduationCap }
              ].map(sub => {
                const Icon = sub.icon;
                const isSelected = gamhariaSubcat === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setGamhariaSubcat(sub.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#ff3f6c] text-white shadow-md'
                        : 'bg-[#f5f5f6] text-[#535766] hover:bg-[#eaeaec]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gamharia Census Table / Cards */}
          <div className="bg-white border border-[#eaeaec] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-[#fafbfc] border-b border-[#eaeaec] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#282c3f]">
                  Gamharia Working Fashion Master Census
                </h3>
                <p className="text-xs text-[#7e818c]">
                  Showing {filteredGamhariaCensus.length} mapped merchants in Gamharia Tata-Kandra Industrial Corridor
                </p>
              </div>
              <span className="text-[10px] font-bold bg-cyan-100 text-cyan-800 px-2.5 py-1 rounded-full border border-cyan-200">
                Seraikela-Kharsawan Cluster
              </span>
            </div>

            <div className="divide-y divide-[#eaeaec]">
              {filteredGamhariaCensus.map((merchant) => (
                <div 
                  key={merchant.id}
                  className="p-4 hover:bg-[#f5f5f6]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#282c3f]">
                        {merchant.name}
                      </span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {merchant.priority}
                      </span>
                      {merchant.rating && (
                        <span className="zustag-rating-pill text-[10px]">
                          <span>{merchant.rating}</span>
                          <Star className="w-2.5 h-2.5 fill-[#ff905a] text-[#ff905a]" />
                          <span className="text-[#7e818c]">({merchant.reviewCount})</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#535766] font-medium">
                      {merchant.category} • <strong className="text-[#2564ea]">{merchant.subCategory}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#7e818c]">
                      <MapPin className="w-3.5 h-3.5 text-[#ff3f6c] shrink-0" />
                      <span>{merchant.address} ({merchant.landmark})</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      {merchant.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-white text-[#7e818c] border border-[#eaeaec]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-[#03a685] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      ● Ready for Onboarding
                    </span>
                    <button
                      onClick={() => {
                        const existingStore = SEED_STORES.find(s => s.locality === 'Gamharia');
                        if (existingStore && onSelectStoreToShop) {
                          onSelectStoreToShop(existingStore.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded bg-[#282c3f] hover:bg-[#ff3f6c] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <span>Shop Corridor</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
