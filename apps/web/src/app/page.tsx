'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  Sparkles, 
  ArrowUpDown, 
  Zap, 
  SlidersHorizontal,
  RotateCcw,
  Store as StoreIcon,
  X,
  Tag,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
  Compass,
  Flame,
  Bot
} from 'lucide-react';
import { LocalAvailabilityItem, ProductVariant, JAMSHEDPUR_ZONES, Store as StoreType } from '@zustag/domain-core';
import { ZustagHeader } from '@/components/ZustagHeader';
import { ZustagHeroBanners } from '@/components/ZustagHeroBanners';
import { ZustagQuickCategoryTray } from '@/components/ZustagQuickCategoryTray';
import { ZustagSmartDiscoveryTabs } from '@/components/ZustagSmartDiscoveryTabs';
import { ZustagStyleFinder } from '@/components/ZustagStyleFinder';
import { ZustagBrandLanes } from '@/components/ZustagBrandLanes';
import { ZustagOccasionLanes } from '@/components/ZustagOccasionLanes';
import { ZustagOutfitBundler } from '@/components/ZustagOutfitBundler';
import { ZustagShowroomDiscovery } from '@/components/ZustagShowroomDiscovery';
import { ZustagStorefrontModal } from '@/components/ZustagStorefrontModal';
import { ZustagStoreLocatorModal } from '@/components/ZustagStoreLocatorModal';
import { ZustagAIStylistDrawer } from '@/components/ZustagAIStylistDrawer';
import { ZustagVisualSearchModal } from '@/components/ZustagVisualSearchModal';
import { ZustagAIPredictiveFeed } from '@/components/ZustagAIPredictiveFeed';
import { ZustagTryAtHomeBanner } from '@/components/ZustagTryAtHomeBanner';
import { ZustagFilterSidebar } from '@/components/ZustagFilterSidebar';
import { ZustagProductCard } from '@/components/ZustagProductCard';
import { ZustagPDPModal } from '@/components/ZustagPDPModal';
import { ZustagCartDrawer, CartItem } from '@/components/ZustagCartDrawer';
import { ZustagFloatingCartBar } from '@/components/ZustagFloatingCartBar';
import { ZustagLiveTrackingModal } from '@/components/ZustagLiveTrackingModal';
import { ZustagMobileBottomNav } from '@/components/ZustagMobileBottomNav';
import { ZustagFooter } from '@/components/ZustagFooter';
import { LiveOrderTicker } from '@/components/LiveOrderTicker';
import { MerchantIntelligenceGraph } from '@/components/MerchantIntelligenceGraph';
import { MerchantTerminal } from '@/components/MerchantTerminal';
import { RiderSimulator } from '@/components/RiderSimulator';
import { OpsGraphDashboard } from '@/components/OpsGraphDashboard';

export default function HomePage() {
  const [activeView, setActiveView] = useState<'customer' | 'merchant' | 'rider' | 'ops' | 'market_map'>('customer');
  const [selectedZone, setSelectedZone] = useState<string>('BISTUPUR_MAIN');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedShowroom, setSelectedShowroom] = useState<string>('all');
  const [under30Only, setUnder30Only] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'eta' | 'price_low' | 'price_high'>('recommended');
  const [localityTabFilter, setLocalityTabFilter] = useState<'all' | 'priority_local' | 'city_wide'>('all');

  const [items, setItems] = useState<LocalAvailabilityItem[]>([]);
  const [stores, setStores] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Greencard Omnichannel Loyalty Points State
  const [greencardPoints, setGreencardPoints] = useState<number>(450);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Live Tracking Modal State
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<any>(null);

  // Virtual Showroom Storefront Modal State
  const [selectedStorefront, setSelectedStorefront] = useState<StoreType | null>(null);

  // Omnichannel Store Locator Modal State (Pillar 4)
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState<boolean>(false);

  // Gemini AI Stylist Drawer State (Pillar 1)
  const [isAIStylistOpen, setIsAIStylistOpen] = useState<boolean>(false);
  const [aiStylistInitialPrompt, setAiStylistInitialPrompt] = useState<string>('');

  // Multimodal Visual Search Modal State (Pillar 2)
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState<boolean>(false);

  // PDP Modal State
  const [selectedPDPItem, setSelectedPDPItem] = useState<{
    item: LocalAvailabilityItem;
    initialVariant?: ProductVariant;
  } | null>(null);

  const currentZone = JAMSHEDPUR_ZONES[selectedZone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        zone: selectedZone,
        category: selectedCategory,
        brand: selectedBrand,
        under30: under30Only.toString(),
        q: searchQuery
      });
      const res = await fetch(`/api/discovery?${params.toString()}`);
      const data = await res.json();
      
      let fetchedItems: LocalAvailabilityItem[] = data.items || [];
      if (selectedShowroom !== 'all') {
        fetchedItems = fetchedItems.filter(i => i.store.id === selectedShowroom);
      }

      setItems(fetchedItems);

      // Fetch stores
      if (stores.length === 0) {
        const invRes = await fetch('/api/inventory');
        const invData = await invRes.json();
        setStores(invData.stores || []);
      }
    } catch (err) {
      console.error('Failed to fetch catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
    const interval = setInterval(fetchCatalog, 4000);
    return () => clearInterval(interval);
  }, [selectedZone, selectedCategory, selectedBrand, selectedShowroom, under30Only, searchQuery]);

  // Priority Organization:
  // 1. Stores located directly in or adjacent to the user's selected locality
  // 2. All other verified stores delivering across Jamshedpur & Gamharia right now
  const { priorityLocalStores, cityWideStores } = useMemo(() => {
    const zoneAreaName = currentZone.areaName.toLowerCase();
    const local: StoreType[] = [];
    const other: StoreType[] = [];

    stores.forEach((st) => {
      const storeLoc = st.locality.toLowerCase();
      const storeAddr = st.address.toLowerCase();
      const isLocal = 
        zoneAreaName.includes(storeLoc) || 
        storeLoc.includes(zoneAreaName.split(' ')[0]) || 
        storeAddr.includes(zoneAreaName.split(' ')[0]);

      if (isLocal) {
        local.push(st);
      } else {
        other.push(st);
      }
    });

    return { priorityLocalStores: local, cityWideStores: other };
  }, [stores, currentZone]);

  // Ranked & Grouped Products based on Priority Location & Sorting
  const { priorityLocalItems, cityWideItems, displayItems } = useMemo(() => {
    const zoneAreaName = currentZone.areaName.toLowerCase();
    const localItems: LocalAvailabilityItem[] = [];
    const otherItems: LocalAvailabilityItem[] = [];

    items.forEach((it) => {
      const storeLoc = it.store.locality.toLowerCase();
      const isLocal = 
        zoneAreaName.includes(storeLoc) || 
        storeLoc.includes(zoneAreaName.split(' ')[0]) || 
        it.distanceKm <= 3.0;

      if (isLocal) {
        localItems.push(it);
      } else {
        otherItems.push(it);
      }
    });

    // Apply sorting
    const sortFn = (a: LocalAvailabilityItem, b: LocalAvailabilityItem) => {
      if (sortBy === 'eta') return a.etaMinutes - b.etaMinutes;
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return a.etaMinutes - b.etaMinutes; // Default recommended
    };

    localItems.sort(sortFn);
    otherItems.sort(sortFn);

    let combined: LocalAvailabilityItem[] = [];
    if (localityTabFilter === 'priority_local') {
      combined = localItems;
    } else if (localityTabFilter === 'city_wide') {
      combined = otherItems;
    } else {
      // Default: Priority local items first (#1), then city-wide items delivering right now (#2)
      combined = [...localItems, ...otherItems];
    }

    return {
      priorityLocalItems: localItems,
      cityWideItems: otherItems,
      displayItems: combined
    };
  }, [items, currentZone, sortBy, localityTabFilter]);

  const handleToggleWishlist = (item: LocalAvailabilityItem) => {
    setWishlistItems(prev => 
      prev.includes(item.variant.id) 
        ? prev.filter(id => id !== item.variant.id)
        : [...prev, item.variant.id]
    );
  };

  const handleAddToCart = (item: LocalAvailabilityItem, variant: ProductVariant) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.variant.id === variant.id);
      if (existing) {
        return prev.map(i => i.variant.id === variant.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        product: item.product,
        variant: variant,
        store: item.store,
        quantity: 1,
        price: variant.price
      }];
    });
  };

  const handleAddBundleToCart = (bundleItems: any[]) => {
    bundleItems.forEach((bi) => {
      const matching = items.find(i => i.product.brand.toLowerCase() === bi.brand.toLowerCase()) || items[0];
      if (matching) {
        handleAddToCart(matching, matching.variant);
      }
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (variantId: string) => {
    setCartItems(prev => prev.filter(i => i.variant.id !== variantId));
  };

  const handlePlaceOrder = async (pointsRedeemed: number = 0) => {
    if (cartItems.length === 0) return;
    const zone = JAMSHEDPUR_ZONES[selectedZone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;
    const primaryItem = cartItems[0];
    const totalOrderAmt = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);

    const earnedPts = Math.round(totalOrderAmt * 0.05);
    setGreencardPoints(prev => Math.max(0, prev - pointsRedeemed + earnedPts));

    const orderPayload = {
      orderId: `ZSTG-${Math.floor(1000 + Math.random() * 9000)}`,
      storeName: primaryItem.store.name,
      customerName: 'Rohit Sharma (Zustag VIP Customer)',
      areaName: zone.areaName,
      totalAmount: totalOrderAmt,
      itemsCount: cartItems.reduce((acc, i) => acc + i.quantity, 0)
    };

    setLastOrderDetails(orderPayload);

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: orderPayload.customerName,
          customerPhone: '+91 98352 11098',
          deliveryAddress: {
            addressLine: 'Flat 4B, Steel Enclave, Near Jubilee Park',
            area: zone.areaName,
            city: zone.city,
            coordinates: zone
          },
          storeId: primaryItem.store.id,
          items: cartItems.map(i => ({
            productId: i.product.id,
            variantId: i.variant.id,
            quantity: i.quantity
          }))
        })
      });
    } catch (e) {
      console.error(e);
    }

    setCartItems([]);
    setIsCartOpen(false);
    setIsTrackingModalOpen(true);
    fetchCatalog();
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedShowroom('all');
    setUnder30Only(false);
    setSearchQuery('');
    setLocalityTabFilter('all');
  };

  const handleShopSpecificStore = (storeId: string) => {
    const foundStore = stores.find(s => s.id === storeId);
    if (foundStore) {
      setSelectedStorefront(foundStore);
    } else {
      setSelectedShowroom(storeId);
      setActiveView('customer');
      const el = document.getElementById('showroom-products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryNavClick = (cat: string) => {
    if (cat === 'men') setSelectedCategory('shirts');
    else if (cat === 'women') setSelectedCategory('dresses');
    else if (cat === 'kids') setSelectedCategory('t-shirts');
    else if (cat === 'home') setSelectedCategory('accessories');
    else if (cat === 'beauty') setSelectedCategory('accessories');
    else if (cat === 'genz') setSelectedCategory('t-shirts');
    else setSelectedCategory('all');
  };

  const handleFocusSearch = () => {
    const el = document.getElementById('universal-search-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = el.querySelector('input');
      if (input) input.focus();
    }
  };

  const handleTriggerAIStylist = (promptText?: string) => {
    setAiStylistInitialPrompt(promptText || '');
    setIsAIStylistOpen(true);
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'all' || selectedShowroom !== 'all' || under30Only || searchQuery !== '' || localityTabFilter !== 'all';

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#1e2434] selection:bg-[#ff3f6c] selection:text-white flex flex-col justify-between pb-16 md:pb-0">
      {/* 1. Zustag Top Header with Greencard Points Integration */}
      <ZustagHeader
        selectedZone={selectedZone}
        onSelectZone={setSelectedZone}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
        onSelectView={setActiveView}
        onSelectCategoryNav={handleCategoryNavClick}
        onSelectBrand={setSelectedBrand}
        greencardPoints={greencardPoints}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
      />

      {/* Main View Router */}
      {activeView === 'customer' ? (
        <main className="flex-1">
          {/* 2. Hero Promo Banners + Universal Smart Search Tab + "SHOP BY CATEGORY" 30-Category Grid */}
          <ZustagHeroBanners
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            stores={stores}
            items={items}
            onSelectShowroom={(sId) => {
              const st = stores.find(s => s.id === sId);
              if (st) setSelectedStorefront(st);
              else setSelectedShowroom(sId);
            }}
            selectedZone={selectedZone}
            onTriggerAIStylist={handleTriggerAIStylist}
            onTriggerVisualSearch={() => setIsVisualSearchOpen(true)}
          />

          {/* 3. Blinkit-Style Circular Quick-Category Story Trays */}
          <ZustagQuickCategoryTray
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 4. Unified Smart Discovery Suite (Weather Feed, Style Finder, Outfit Bundler) */}
          <ZustagSmartDiscoveryTabs
            selectedZoneAreaName={currentZone.areaName}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onTriggerAIStylist={handleTriggerAIStylist}
            onAddBundleToCart={handleAddBundleToCart}
          />

          {/* 5. Medal Worthy Brands to Bag Showcase */}
          <ZustagBrandLanes
            onSelectBrand={setSelectedBrand}
          />

          {/* 6. 30-Minute Time-Adaptive Occasion Quick-Lanes */}
          <ZustagOccasionLanes
            onSelectCategory={setSelectedCategory}
          />

          {/* 7. Popular Outlets & Flagships Near You Discovery */}
          <ZustagShowroomDiscovery
            stores={stores}
            selectedShowroom={selectedShowroom}
            onSelectShowroom={(sId) => {
              const st = stores.find(s => s.id === sId);
              if (st) setSelectedStorefront(st);
              else setSelectedShowroom(sId);
            }}
            onSelectCategory={setSelectedCategory}
          />

          {/* 8. 10-Minute Doorstep Try-On & Instant Size-Swap Guarantee Banner */}
          <ZustagTryAtHomeBanner />

          {/* 9. Main Product Listing Section */}
          <div id="showroom-products-section" className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 space-y-6">
            {/* Section Divider with Headline & Location Priority Subtitle */}
            <div className="text-left pb-2 border-b border-[#eaeaec]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#03a685] animate-ping" />
                    <h3 className="text-xl sm:text-2xl font-black text-[#1e2434] tracking-wider uppercase font-serif">
                      HYPERLOCAL LIVE SHOWROOM SHOWCASE
                    </h3>
                  </div>
                  <p className="text-xs text-[#535766] mt-1 flex items-center gap-1.5 flex-wrap">
                    <span>Prioritizing showrooms in</span>
                    <strong className="text-[#ff3f6c] bg-[#fff1f4] px-2 py-0.5 rounded-md border border-rose-200">
                      📍 {currentZone.areaName} ({priorityLocalItems.length} styles • 15-20 Mins)
                    </strong>
                    <span>followed by all active showrooms delivering across Jamshedpur & Gamharia.</span>
                  </p>
                </div>

                {selectedShowroom !== 'all' && (
                  <button
                    onClick={() => setSelectedShowroom('all')}
                    className="text-xs font-black text-[#ff3f6c] border border-[#ff3f6c] px-3.5 py-1.5 rounded-xl hover:bg-[#fff1f4] cursor-pointer self-start md:self-auto"
                  >
                    View All Showrooms
                  </button>
                )}
              </div>

              {/* 🏬 Priority Showroom Filter Strip (Shows Selected Locality Showrooms First!) */}
              <div className="mt-4 pt-3 border-t border-[#f5f5f7] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-[11px] font-black uppercase text-[#7e818c] shrink-0 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#ff3f6c]" />
                  <span>Showroom Priority:</span>
                </span>

                {/* All Showrooms Tab */}
                <button
                  onClick={() => { setSelectedShowroom('all'); setLocalityTabFilter('all'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    selectedShowroom === 'all' && localityTabFilter === 'all'
                      ? 'bg-[#1e2434] text-white shadow-xs'
                      : 'bg-[#f5f5f7] hover:bg-[#eaeaec] text-[#1e2434] border border-[#eaeaec]'
                  }`}
                >
                  <span>All Jamshedpur Outlets ({items.length})</span>
                </button>

                {/* Priority Locality Tab */}
                <button
                  onClick={() => { setSelectedShowroom('all'); setLocalityTabFilter('priority_local'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    localityTabFilter === 'priority_local'
                      ? 'bg-[#ff3f6c] text-white shadow-xs'
                      : 'bg-[#fff1f4] hover:bg-rose-100 text-[#ff3f6c] border border-rose-200'
                  }`}
                >
                  <span>⭐ {currentZone.areaName.split(' ')[0]} Showrooms Only ({priorityLocalItems.length})</span>
                </button>

                {/* Priority Showrooms in Selected Zone */}
                {priorityLocalStores.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => { setSelectedShowroom(st.id); setLocalityTabFilter('all'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      selectedShowroom === st.id
                        ? 'bg-[#ff3f6c] text-white shadow-xs'
                        : 'bg-white hover:border-[#ff3f6c] text-[#1e2434] border-2 border-amber-300 shadow-2xs'
                    }`}
                  >
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-black px-1 rounded">
                      LOCAL
                    </span>
                    <span>{st.name.split('-')[0]}</span>
                    <span className="text-[10px] text-[#03a685] font-black">⚡ 15M</span>
                  </button>
                ))}

                {/* Other Jamshedpur Showrooms (Delivering Right Now) */}
                {cityWideStores.slice(0, 6).map((st) => (
                  <button
                    key={st.id}
                    onClick={() => { setSelectedShowroom(st.id); setLocalityTabFilter('all'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      selectedShowroom === st.id
                        ? 'bg-[#2564ea] text-white shadow-xs'
                        : 'bg-[#f5f5f7] hover:bg-[#eaeaec] text-[#535766] border border-[#eaeaec]'
                    }`}
                  >
                    <span>{st.name.split('-')[0]} ({st.locality})</span>
                    <span className="text-[10px] text-[#2564ea] font-semibold">25M</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Breadcrumbs & Sort By Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eaeaec]">
              <div className="text-xs text-[#7e818c] flex items-center flex-wrap gap-1">
                <span className="hover:text-[#1e2434] cursor-pointer">Home</span> /
                <span className="hover:text-[#1e2434] cursor-pointer">Live Showrooms</span> /
                <span className="hover:text-[#1e2434] cursor-pointer"><strong>{currentZone.areaName}</strong></span> /
                <strong className="text-[#1e2434] capitalize">
                  {selectedCategory === 'all' ? 'All Styles' : selectedCategory} ({displayItems.length} live items)
                </strong>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#7e818c] font-black uppercase">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-black text-[#1e2434] border border-[#eaeaec] bg-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#1e2434] cursor-pointer shadow-xs"
                >
                  <option value="recommended">⭐ Locality Priority (Fastest SLA First)</option>
                  <option value="eta">⚡ Fastest Delivery Time</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips Toolbar */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-[#f5f5f7]">
                <span className="text-[11px] font-black uppercase text-[#7e818c] mr-1">Active Filters:</span>
                
                {localityTabFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#fff1f4] border border-rose-200 text-[#ff3f6c] text-xs font-bold px-3 py-1 rounded-full">
                    <span>⭐ {currentZone.areaName} Priority</span>
                    <button onClick={() => setLocalityTabFilter('all')} className="hover:text-rose-800 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#f5f5f7] border border-[#eaeaec] text-[#1e2434] text-xs font-bold px-3 py-1 rounded-full">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-[#ff3f6c] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedBrand !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#f5f5f7] border border-[#eaeaec] text-[#1e2434] text-xs font-bold px-3 py-1 rounded-full">
                    <span>Brand: {selectedBrand}</span>
                    <button onClick={() => setSelectedBrand('all')} className="hover:text-[#ff3f6c] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedShowroom !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#eef2ff] border border-indigo-200 text-[#2564ea] text-xs font-bold px-3 py-1 rounded-full">
                    <span>Showroom: {stores.find(s => s.id === selectedShowroom)?.name.split('-')[0]}</span>
                    <button onClick={() => setSelectedShowroom('all')} className="hover:text-indigo-800 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {under30Only && (
                  <span className="inline-flex items-center gap-1.5 bg-[#fff1f4] border border-rose-200 text-[#ff3f6c] text-xs font-bold px-3 py-1 rounded-full">
                    <span>⚡ 30-Min Express Only</span>
                    <button onClick={() => setUnder30Only(false)} className="hover:text-rose-800 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 bg-[#f5f5f7] border border-[#eaeaec] text-[#1e2434] text-xs font-bold px-3 py-1 rounded-full">
                    <span>Search: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-[#ff3f6c] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleClearAllFilters}
                  className="text-xs font-black text-[#ff3f6c] hover:underline uppercase ml-2 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Layout: Left Filter Rail + Right Product Grid */}
            <div className="flex items-start gap-8">
              {/* Left Sidebar Filters */}
              <ZustagFilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                onSelectBrand={setSelectedBrand}
                under30Only={under30Only}
                onToggleUnder30={() => setUnder30Only(!under30Only)}
                selectedShowroom={selectedShowroom}
                onSelectShowroom={setSelectedShowroom}
                stores={stores}
                onClearAll={handleClearAllFilters}
              />

              {/* Right Product Listing Grid */}
              <div className="flex-1 space-y-8">
                {loading && items.length === 0 ? (
                  <div className="text-center py-24 text-[#7e818c]">
                    <div className="w-8 h-8 border-3 border-[#ff3f6c] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    Checking Showroom Inventory across Jamshedpur & Gamharia...
                  </div>
                ) : displayItems.length === 0 ? (
                  <div className="border border-[#eaeaec] rounded-2xl p-16 text-center text-[#7e818c] space-y-3 bg-[#f5f5f7]">
                    <div className="text-base font-black text-[#1e2434]">No matching items found</div>
                    <p className="text-xs">
                      Try resetting filters or expanding to all Jamshedpur showroom zones.
                    </p>
                    <button
                      onClick={handleClearAllFilters}
                      className="px-5 py-2.5 bg-[#ff3f6c] text-white text-xs font-black rounded-xl uppercase cursor-pointer shadow-md"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Section 1: Priority Local Showroom Items */}
                    {localityTabFilter !== 'city_wide' && priorityLocalItems.length > 0 && (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black shadow-xs">
                              <MapPin className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-black text-[#1e2434] uppercase tracking-wide">
                                📍 TOP PRIORITY: SHOWROOMS IN {currentZone.areaName}
                              </h4>
                              <p className="text-[11px] text-[#535766]">
                                Fastest doorstep dispatch ({priorityLocalItems[0]?.etaMinutes || 15}–20 mins) with 10-minute doorstep try-on
                              </p>
                            </div>
                          </div>
                          <span className="hidden sm:inline-block text-[10px] bg-amber-500 text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                            ⚡ NEAREST TO YOU
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                          {priorityLocalItems.map((item, idx) => (
                            <ZustagProductCard
                              key={`priority_${item.store.id}_${item.variant.id}_${idx}`}
                              item={item}
                              onOpenPDP={(it, initialVar) => setSelectedPDPItem({ item: it, initialVariant: initialVar })}
                              isWishlisted={wishlistItems.includes(item.variant.id)}
                              onToggleWishlist={handleToggleWishlist}
                              onQuickAddToCart={handleAddToCart}
                              onFindSimilar={(it) => setSelectedPDPItem({ item: it })}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 2: City-Wide Showrooms Delivering Right Now */}
                    {localityTabFilter !== 'priority_local' && cityWideItems.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-[#eaeaec]">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#2564ea] text-white flex items-center justify-center font-black shadow-xs">
                              <Zap className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-black text-[#1e2434] uppercase tracking-wide">
                                🛵 DELIVERING RIGHT NOW ACROSS JAMSHEDPUR & GAMHARIA
                              </h4>
                              <p className="text-[11px] text-[#535766]">
                                Certified showroom outlets active and packing orders right now (22–30 mins SLA)
                              </p>
                            </div>
                          </div>
                          <span className="hidden sm:inline-block text-[10px] bg-[#2564ea] text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                            ⚡ CITY-WIDE ACTIVE
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                          {cityWideItems.map((item, idx) => (
                            <ZustagProductCard
                              key={`citywide_${item.store.id}_${item.variant.id}_${idx}`}
                              item={item}
                              onOpenPDP={(it, initialVar) => setSelectedPDPItem({ item: it, initialVariant: initialVar })}
                              isWishlisted={wishlistItems.includes(item.variant.id)}
                              onToggleWishlist={handleToggleWishlist}
                              onQuickAddToCart={handleAddToCart}
                              onFindSimilar={(it) => setSelectedPDPItem({ item: it })}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      ) : activeView === 'market_map' ? (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 flex-1">
          <MerchantIntelligenceGraph onSelectStoreToShop={handleShopSpecificStore} />
        </main>
      ) : activeView === 'merchant' ? (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 flex-1">
          <MerchantTerminal />
        </main>
      ) : activeView === 'rider' ? (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 flex-1">
          <RiderSimulator />
        </main>
      ) : (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 flex-1">
          <OpsGraphDashboard />
        </main>
      )}

      {/* 10. Omnichannel Showroom Locator Modal (Pillar 4) */}
      <ZustagStoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
        stores={stores}
        onSelectStoreToShop={handleShopSpecificStore}
        selectedZone={selectedZone}
      />

      {/* 11. Virtual Showroom Storefront Modal */}
      {selectedStorefront && (
        <ZustagStorefrontModal
          store={selectedStorefront}
          isOpen={!!selectedStorefront}
          onClose={() => setSelectedStorefront(null)}
          items={items}
          onOpenPDP={(it, initialVar) => setSelectedPDPItem({ item: it, initialVariant: initialVar })}
          onQuickAddToCart={handleAddToCart}
        />
      )}

      {/* 11. Product Details Modal (Zustag PDP with Size Chart & Specs) */}
      {selectedPDPItem && (
        <ZustagPDPModal
          item={selectedPDPItem.item}
          initialVariant={selectedPDPItem.initialVariant}
          onClose={() => setSelectedPDPItem(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistItems.includes(selectedPDPItem.item.variant.id)}
        />
      )}

      {/* 12. Cart / Bag Slide-out Drawer with Greencard Points Redemption */}
      <ZustagCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
        selectedZone={selectedZone}
        greencardBalance={greencardPoints}
      />

      {/* 13. Blinkit-Style Floating Quick-Cart Bar */}
      <ZustagFloatingCartBar
        items={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        areaName={currentZone.areaName}
      />

      {/* 14. Gemini AI Stylist Sliding Drawer (Pillar 1) */}
      <ZustagAIStylistDrawer
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        selectedZone={selectedZone}
        onAddLookToCart={handleAddBundleToCart}
        initialPrompt={aiStylistInitialPrompt}
      />

      {/* 15. Multimodal Snap & Match Visual Search Modal (Pillar 2) */}
      <ZustagVisualSearchModal
        isOpen={isVisualSearchOpen}
        onClose={() => setIsVisualSearchOpen(false)}
        selectedZone={selectedZone}
        onOpenPDP={(item, variant) => {
          setSelectedPDPItem({ item, initialVariant: variant });
        }}
        onQuickAddToCart={(item, variant) => {
          handleAddToCart(item, variant);
        }}
      />

      {/* Floating AI Stylist Trigger Button */}
      <div className="fixed bottom-24 right-5 z-40 hidden sm:block">
        <button
          onClick={() => handleTriggerAIStylist()}
          className="bg-gradient-to-r from-[#182344] via-[#1e2d5a] to-[#2564ea] text-white px-4 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 border border-blue-400/40 cursor-pointer group animate-bounce hover:animate-none"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ff3f6c] to-[#f26a10] flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-black tracking-wide">✨ Ask Gemini AI Stylist</span>
          <span className="text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full">
            30M
          </span>
        </button>
      </div>

      {/* 15. Live Interactive GPS Vector Route Tracking Modal */}
      <ZustagLiveTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        orderData={lastOrderDetails || undefined}
      />

      {/* 16. Persistent Mobile Bottom Navigation Bar */}
      <ZustagMobileBottomNav
        activeView={activeView}
        onSelectView={setActiveView}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      {/* 17. Live Hyperlocal Social Proof & Order Ticker */}
      <LiveOrderTicker />

      {/* 18. Authentic Zustag Footer */}
      <ZustagFooter onSelectCategory={setSelectedCategory} />
    </div>
  );
}
