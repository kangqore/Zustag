import { InventoryEngine } from './src/inventory-manager';
import { ProductVariant } from '@zustag/domain-core';

console.log('--- Testing ZUSTAG Inventory Engine & 2-Phase Reservation ---');

const engine = new InventoryEngine();

// Sample product variant
const testVariant: ProductVariant = {
  id: 'var_oxford_m_blk',
  productId: 'prod_oxford',
  sku: 'RR-OXF-BLK-M',
  size: 'M',
  color: 'Jet Black',
  colorHex: '#111111',
  mrp: 3299,
  price: 1999
};

const storeId = 'store_bistupur_flagship';

// 1. Set initial stock
const initial = engine.setStock(storeId, testVariant, 5);
console.log('✓ Initial Stock Set:', {
  total: initial.totalQuantity,
  available: initial.availableQuantity,
  reserved: initial.reservedQuantity
});

if (initial.availableQuantity !== 5) throw new Error('Initial available quantity mismatch');

// 2. Read from Fast Serving Cache
const cached = engine.getServingAvailability(storeId, testVariant.id);
console.log('✓ Fast Serving Cache (Redis simulation):', cached);
if (cached.available !== 5) throw new Error('Serving cache mismatch');

// 3. Atomically reserve 2 units
const res = engine.reserveVariantStock(storeId, testVariant.id, 2);
console.log('✓ Reservation Result:', res);
if (!res.success || !res.reservationId) throw new Error('Reservation should succeed');

// 4. Verify reduced available quantity in serving cache
const afterResCached = engine.getServingAvailability(storeId, testVariant.id);
console.log('✓ Post-Reservation Serving Availability (5 - 2 = 3):', afterResCached);
if (afterResCached.available !== 3) throw new Error('Post-reservation available count should be 3');

// 5. Commit reservation (Order confirmed & paid)
const committed = engine.commitReservation(res.reservationId);
console.log('✓ Committed Reservation:', committed);
if (!committed) throw new Error('Commit should succeed');

const postCommitCached = engine.getServingAvailability(storeId, testVariant.id);
console.log('✓ Post-Commit Stock in Serving Cache:', postCommitCached);
if (postCommitCached.available !== 3) throw new Error('Post-commit stock mismatch');

console.log('\n🎉 ALL INVENTORY & ATOMIC RESERVATION TESTS PASSED SUCCESSFULLY!\n');
process.exit(0);
