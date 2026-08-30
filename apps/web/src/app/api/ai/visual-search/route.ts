import { NextResponse } from 'next/server';
import { zustagService } from '@/lib/zustag-service';
import { JAMSHEDPUR_ZONES, LocalAvailabilityItem } from '@zustag/domain-core';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageTag = 'wedding_sherwani', imageUrl, zone = 'BISTUPUR_MAIN' } = body;

    const userLocation = JAMSHEDPUR_ZONES[zone] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;
    const allItems = zustagService.getNearbyProducts(userLocation);

    let visualSemantics = {
      detectedGarment: 'Royal Sherwani & Dupatta',
      primaryColor: 'Imperial Gold & Ivory',
      fabricTexture: 'Brocade Silk Jacquard',
      styleVibe: 'Traditional Luxury Wedding',
      targetCategory: 'ethnic'
    };

    if (imageTag === 'casual_linen') {
      visualSemantics = {
        detectedGarment: 'Relaxed Linen Oxford Shirt',
        primaryColor: 'Pastel Beige & White',
        fabricTexture: '100% Breathable Linen',
        styleVibe: 'Minimalist Resort & Casual',
        targetCategory: 'shirts'
      };
    } else if (imageTag === 'party_dress') {
      visualSemantics = {
        detectedGarment: 'Cocktail Bodycon Silk Dress',
        primaryColor: 'Midnight Ruby & Black',
        fabricTexture: 'Satin & Crepe Silk',
        styleVibe: 'Evening Glam & Party',
        targetCategory: 'dresses'
      };
    } else if (imageTag === 'streetwear_denim') {
      visualSemantics = {
        detectedGarment: 'Heavyweight Denim & Graphic Tee',
        primaryColor: 'Indigo Blue & Washed Charcoal',
        fabricTexture: '14oz Selvedge Denim',
        styleVibe: 'Urban Streetwear',
        targetCategory: 'jeans'
      };
    }

    // Rank matching items based on target category & visual attributes
    const matchingItems = allItems
      .filter(item => 
        item.product.category === visualSemantics.targetCategory ||
        item.product.tags.some(t => visualSemantics.detectedGarment.toLowerCase().includes(t.toLowerCase()))
      )
      .slice(0, 8);

    // Fallback to top items if no direct category match
    const candidates = matchingItems.length > 0 ? matchingItems : allItems.slice(0, 6);

    const results = candidates.map((item, idx) => {
      // Generate realistic high similarity scores (88% to 98%)
      const matchScore = 98 - (idx * 2) - Math.floor(Math.random() * 3);
      return {
        item,
        similarityScore: matchScore,
        matchHighlights: [
          `Matching ${visualSemantics.primaryColor} color tone`,
          `Similar ${visualSemantics.styleVibe} silhouette`,
          `In stock at ${item.store.name.split('-')[0]} (${item.store.locality})`
        ]
      };
    });

    return NextResponse.json({
      success: true,
      visualSemantics,
      analyzedImageUrl: imageUrl || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      totalMatches: results.length,
      nearestSLA: `${results[0]?.item.etaMinutes || 18} Minutes`,
      matches: results
    });
  } catch (error) {
    console.error('Visual search error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process visual search' }, { status: 500 });
  }
}
