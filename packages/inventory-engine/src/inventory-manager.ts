import { StoreInventoryItem, ProductVariant, DomainEvent } from '@zustag/domain-core';

export interface ReservationLock {
  reservationId: string;
  storeId: string;
  variantId: string;
  quantity: number;
  expiresAt: number; // timestamp
  status: 'ACTIVE' | 'COMMITTED' | 'RELEASED' | 'EXPIRED';
}

export type EventListener = (event: DomainEvent) => void;

/**
 * ZUSTAG High-Throughput Variant Inventory Engine
 * 
 * Separates Source-of-Truth transactional operations from the Fast Serving Layer (Redis-compatible).
 * Implements 2-phase reservation locks to prevent overselling on concurrent 30-minute orders.
 */
export class InventoryEngine {
  // Authoritative Source of Truth (Database representation)
  private inventoryStore: Map<string, StoreInventoryItem> = new Map();
  
  // Fast Serving Cache (Key: store:{storeId}:variant:{variantId})
  private servingCache: Map<string, { available: number; price: number; lastSync: number }> = new Map();
  
  // Active Reservation Locks (Key: reservationId)
  private activeLocks: Map<string, ReservationLock> = new Map();

  // Event bus listeners
  private eventListeners: Set<EventListener> = new Set();

  constructor() {
    this.startTtlCleanupTimer();
  }

  public addEventListener(listener: EventListener): () => void {
    this.eventListeners.add(listener);
    return () => this.eventListeners.delete(listener);
  }

  private emitEvent(eventType: DomainEvent['eventType'], payload: any) {
    const event: DomainEvent = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      eventType,
      timestamp: new Date().toISOString(),
      payload
    };
    for (const listener of this.eventListeners) {
      try {
        listener(event);
      } catch (err) {
        console.error('Error in event listener:', err);
      }
    }
  }

  private getCacheKey(storeId: string, variantId: string): string {
    return `store:${storeId}:variant:${variantId}`;
  }

  /**
   * Initializes or updates stock for a specific SKU variant in a store
   */
  public setStock(storeId: string, variant: ProductVariant, totalQty: number, price?: number): StoreInventoryItem {
    const key = `${storeId}_${variant.id}`;
    const existing = this.inventoryStore.get(key);
    const reserved = existing ? existing.reservedQuantity : 0;
    const finalPrice = price ?? variant.price;

    const item: StoreInventoryItem = {
      id: key,
      storeId,
      productId: variant.productId,
      variantId: variant.id,
      totalQuantity: Math.max(0, totalQty),
      reservedQuantity: reserved,
      availableQuantity: Math.max(0, totalQty - reserved),
      price: finalPrice,
      lastUpdated: new Date().toISOString()
    };

    this.inventoryStore.set(key, item);
    
    // Propagate instantly to Fast Serving Layer
    this.syncToServingCache(storeId, variant.id, item.availableQuantity, item.price);

    this.emitEvent('INVENTORY_UPDATED', {
      storeId,
      productId: variant.productId,
      variantId: variant.id,
      availableQuantity: item.availableQuantity,
      totalQuantity: item.totalQuantity,
      price: item.price
    });

    return item;
  }

  /**
   * Fast serving cache read (Redis-like O(1) latency)
   */
  public getServingAvailability(storeId: string, variantId: string): { available: number; price: number } {
    const cacheKey = this.getCacheKey(storeId, variantId);
    const cached = this.servingCache.get(cacheKey);
    if (cached) {
      return { available: cached.available, price: cached.price };
    }
    return { available: 0, price: 0 };
  }

  /**
   * Reserves stock atomically for a checkout window (default: 10 minutes)
   */
  public reserveVariantStock(
    storeId: string,
    variantId: string,
    quantity: number,
    ttlMinutes: number = 10
  ): { success: boolean; reservationId?: string; error?: string } {
    const key = `${storeId}_${variantId}`;
    const item = this.inventoryStore.get(key);

    if (!item) {
      return { success: false, error: 'SKU not stocked in this showroom' };
    }

    if (item.availableQuantity < quantity) {
      return { 
        success: false, 
        error: `Insufficient stock. Only ${item.availableQuantity} units available.` 
      };
    }

    // Atomic reservation
    item.reservedQuantity += quantity;
    item.availableQuantity = item.totalQuantity - item.reservedQuantity;
    item.lastUpdated = new Date().toISOString();

    const reservationId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiresAt = Date.now() + ttlMinutes * 60 * 1000;

    this.activeLocks.set(reservationId, {
      reservationId,
      storeId,
      variantId,
      quantity,
      expiresAt,
      status: 'ACTIVE'
    });

    // Update serving cache immediately
    this.syncToServingCache(storeId, variantId, item.availableQuantity, item.price);

    this.emitEvent('INVENTORY_RESERVED', {
      reservationId,
      storeId,
      variantId,
      reservedQuantity: quantity,
      remainingAvailable: item.availableQuantity,
      expiresAt: new Date(expiresAt).toISOString()
    });

    return { success: true, reservationId };
  }

  /**
   * Confirms/commits reservation upon successful payment & order placement
   */
  public commitReservation(reservationId: string): boolean {
    const lock = this.activeLocks.get(reservationId);
    if (!lock || lock.status !== 'ACTIVE') {
      return false;
    }

    const key = `${lock.storeId}_${lock.variantId}`;
    const item = this.inventoryStore.get(key);
    if (!item) return false;

    // Deduct from total inventory permanently
    item.totalQuantity = Math.max(0, item.totalQuantity - lock.quantity);
    item.reservedQuantity = Math.max(0, item.reservedQuantity - lock.quantity);
    item.availableQuantity = Math.max(0, item.totalQuantity - item.reservedQuantity);
    item.lastUpdated = new Date().toISOString();

    lock.status = 'COMMITTED';
    this.activeLocks.delete(reservationId);

    this.syncToServingCache(lock.storeId, lock.variantId, item.availableQuantity, item.price);

    this.emitEvent('INVENTORY_UPDATED', {
      storeId: lock.storeId,
      variantId: lock.variantId,
      availableQuantity: item.availableQuantity,
      totalQuantity: item.totalQuantity,
      price: item.price
    });

    return true;
  }

  /**
   * Releases an unconfirmed or cancelled reservation
   */
  public releaseReservation(reservationId: string): boolean {
    const lock = this.activeLocks.get(reservationId);
    if (!lock || lock.status !== 'ACTIVE') {
      return false;
    }

    const key = `${lock.storeId}_${lock.variantId}`;
    const item = this.inventoryStore.get(key);
    if (item) {
      item.reservedQuantity = Math.max(0, item.reservedQuantity - lock.quantity);
      item.availableQuantity = Math.max(0, item.totalQuantity - item.reservedQuantity);
      item.lastUpdated = new Date().toISOString();

      this.syncToServingCache(lock.storeId, lock.variantId, item.availableQuantity, item.price);

      this.emitEvent('INVENTORY_RELEASED', {
        reservationId,
        storeId: lock.storeId,
        variantId: lock.variantId,
        releasedQuantity: lock.quantity,
        newAvailable: item.availableQuantity
      });
    }

    lock.status = 'RELEASED';
    this.activeLocks.delete(reservationId);
    return true;
  }

  private syncToServingCache(storeId: string, variantId: string, available: number, price: number) {
    const cacheKey = this.getCacheKey(storeId, variantId);
    this.servingCache.set(cacheKey, {
      available,
      price,
      lastSync: Date.now()
    });
  }

  public getAllStoreInventory(storeId: string): StoreInventoryItem[] {
    return Array.from(this.inventoryStore.values()).filter(item => item.storeId === storeId);
  }

  public getAllInventory(): StoreInventoryItem[] {
    return Array.from(this.inventoryStore.values());
  }

  /**
   * Periodic TTL cleanup for abandoned cart reservations
   */
  private startTtlCleanupTimer() {
    setInterval(() => {
      const now = Date.now();
      for (const [resId, lock] of this.activeLocks.entries()) {
        if (lock.status === 'ACTIVE' && now > lock.expiresAt) {
          console.log(`[InventoryEngine] Reservation ${resId} expired. Releasing stock.`);
          this.releaseReservation(resId);
        }
      }
    }, 15000);
  }
}

// Global Singleton Instance
export const globalInventoryEngine = new InventoryEngine();
