import { NextResponse } from 'next/server';
import { zustagService } from '@/lib/zustag-service';
import { JAMSHEDPUR_ZONES } from '@zustag/domain-core';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zoneKey = searchParams.get('zone') || 'BISTUPUR_MAIN';
  const category = searchParams.get('category') || 'all';
  const brand = searchParams.get('brand') || 'all';
  const query = searchParams.get('q') || '';
  const under30 = searchParams.get('under30') === 'true';

  const userLocation = JAMSHEDPUR_ZONES[zoneKey] || JAMSHEDPUR_ZONES.BISTUPUR_MAIN;

  const items = zustagService.getNearbyProducts(userLocation, {
    category,
    brand,
    searchQuery: query,
    under30MinOnly: under30
  });

  return NextResponse.json({
    userLocation,
    totalItems: items.length,
    items
  });
}
