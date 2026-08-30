import { NextResponse } from 'next/server';
import { zustagService } from '@/lib/zustag-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storeId = searchParams.get('storeId');

  const engine = zustagService.getInventoryEngine();
  const stores = zustagService.getStores();
  const products = zustagService.getProducts();

  if (storeId) {
    const inventory = engine.getAllStoreInventory(storeId);
    return NextResponse.json({ storeId, inventory });
  }

  return NextResponse.json({
    stores,
    products,
    inventory: engine.getAllInventory()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeId, variantId, totalQuantity, price } = body;

    if (!storeId || !variantId || typeof totalQuantity !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const products = zustagService.getProducts();
    let targetVariant;
    for (const p of products) {
      const v = p.variants.find(item => item.id === variantId);
      if (v) {
        targetVariant = v;
        break;
      }
    }

    if (!targetVariant) {
      return NextResponse.json({ error: 'Variant not found' }, { status: 404 });
    }

    const updated = zustagService.getInventoryEngine().setStock(
      storeId,
      targetVariant,
      totalQuantity,
      price
    );

    return NextResponse.json({ success: true, item: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
