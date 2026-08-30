import { NextResponse } from 'next/server';
import { zustagService } from '@/lib/zustag-service';
import { JAMSHEDPUR_ZONES, LocalAvailabilityItem, Product, ProductVariant, Store } from '@zustag/domain-core';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, zone = 'BISTUPUR_MAIN', budget = 5000 } = body;

    const userLocation = JAMSHEDPUR_ZONES[zone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;
    const allAvailableItems = zustagService.getNearbyProducts(userLocation);

    const lowerPrompt = (prompt || '').toLowerCase();

    // 1. Detect Occasion & Vibe
    let occasion = 'Casual & Everyday';
    let lookTitle = 'Effortless Smart Look';
    let stylistRationale = 'Curated for relaxed comfort with premium tailored aesthetics.';
    let primaryCategories = { top: 'shirts', bottom: 'jeans', shoes: 'footwear' };

    if (lowerPrompt.includes('wedding') || lowerPrompt.includes('reception') || lowerPrompt.includes('marriage') || lowerPrompt.includes('shaadi')) {
      occasion = 'Royal Wedding & Festive';
      lookTitle = 'Imperial Wedding Guest Ensemble';
      stylistRationale = `Hand-selected rich ethnic pieces from Manyavar & Soch showrooms in ${userLocation.areaName}. Crafted with breathable festive silks to stay elegant and comfortable in Jamshedpur's 28°C evening humidity.`;
      primaryCategories = { top: 'ethnic', bottom: 'ethnic', shoes: 'footwear' };
    } else if (lowerPrompt.includes('party') || lowerPrompt.includes('club') || lowerPrompt.includes('night') || lowerPrompt.includes('cocktail')) {
      occasion = 'Party & Nightlife';
      lookTitle = 'Midnight Glam Statement Look';
      stylistRationale = `High-contrast luxury textures with clean modern silhouettes. Ready to dispatch within 18 minutes from Bistupur flagships.`;
      primaryCategories = { top: 'dresses', bottom: 'jeans', shoes: 'accessories' };
    } else if (lowerPrompt.includes('work') || lowerPrompt.includes('meeting') || lowerPrompt.includes('office') || lowerPrompt.includes('corporate') || lowerPrompt.includes('tata steel')) {
      occasion = 'Executive Workplace Formals';
      lookTitle = 'Tata Steel Corporate Executive Fit';
      stylistRationale = `Crisp, boardroom-ready tailored shirt paired with structured trousers and formal loafers from Peter England & Westside. Designed for long-day poise and sharp presentation impact.`;
      primaryCategories = { top: 'shirts', bottom: 'jeans', shoes: 'footwear' };
    } else if (lowerPrompt.includes('weather') || lowerPrompt.includes('summer') || lowerPrompt.includes('hot') || lowerPrompt.includes('breathable') || lowerPrompt.includes('light')) {
      occasion = 'Breathable Summer Comfort';
      lookTitle = 'Air-Linen 28°C Climate Co-ord';
      stylistRationale = `100% lightweight organic cotton and breathable linen weave specifically calibrated for Jamshedpur's warm daytime temperatures.`;
      primaryCategories = { top: 't-shirts', bottom: 'jeans', shoes: 'footwear' };
    }

    // 2. Select 3 Coordinated In-Stock Items from Showrooms
    const topCandidates = allAvailableItems.filter(i => 
      i.product.category === primaryCategories.top || 
      i.product.category === 'shirts' || 
      i.product.category === 'dresses' || 
      i.product.category === 'ethnic'
    );
    const bottomCandidates = allAvailableItems.filter(i => 
      i.product.category === primaryCategories.bottom || 
      i.product.category === 'jeans' || 
      i.product.category === 'ethnic'
    );
    const accessoryCandidates = allAvailableItems.filter(i => 
      i.product.category === primaryCategories.shoes || 
      i.product.category === 'footwear' || 
      i.product.category === 'accessories'
    );

    const selectedTop = topCandidates[0] || allAvailableItems[0];
    const selectedBottom = bottomCandidates.find(i => i.product.id !== selectedTop.product.id) || allAvailableItems[1] || allAvailableItems[0];
    const selectedAccessory = accessoryCandidates.find(i => i.product.id !== selectedTop.product.id && i.product.id !== selectedBottom.product.id) || allAvailableItems[2] || allAvailableItems[0];

    const lookItems = [
      { role: 'Topwear Layer', item: selectedTop },
      { role: 'Bottomwear / Drapes', item: selectedBottom },
      { role: 'Footwear & Accent', item: selectedAccessory }
    ];

    const totalMRP = lookItems.reduce((acc, curr) => acc + (curr.item.variant.mrp || curr.item.price * 1.4), 0);
    const totalSellingPrice = lookItems.reduce((acc, curr) => acc + curr.item.price, 0);
    const comboDiscount = Math.round(totalSellingPrice * 0.15); // 15% instant combo bundle savings
    const finalBundlePrice = totalSellingPrice - comboDiscount;
    const fastestETA = Math.min(...lookItems.map(i => i.item.etaMinutes));

    return NextResponse.json({
      success: true,
      query: prompt,
      occasion,
      lookTitle,
      stylistRationale,
      location: userLocation.areaName,
      weatherContext: '28°C • Humid Evening • Jamshedpur',
      deliverySLA: `${fastestETA}–${fastestETA + 8} Minutes (Single Courier Bag)`,
      totalMRP: Math.round(totalMRP),
      totalSellingPrice,
      comboDiscount,
      finalBundlePrice,
      greencardPointsEarned: Math.round(finalBundlePrice * 0.05),
      lookItems: lookItems.map(li => ({
        role: li.role,
        product: li.item.product,
        variant: li.item.variant,
        store: li.item.store,
        price: li.item.price,
        mrp: li.item.variant.mrp,
        etaMinutes: li.item.etaMinutes,
        distanceKm: li.item.distanceKm
      }))
    });
  } catch (error) {
    console.error('AI Stylist error:', error);
    return NextResponse.json({ success: false, message: 'Failed to generate AI styling' }, { status: 500 });
  }
}
