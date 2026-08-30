import { 
  Product, 
  ProductVariant, 
  Store, 
  StoreInventoryItem, 
  GeoCoordinate, 
  LocalAvailabilityItem, 
  Order, 
  OrderStatus, 
  DomainEvent, 
  JAMSHEDPUR_ZONES,
  SEED_STORES,
  SEED_PRODUCTS
} from '@zustag/domain-core';
import { InventoryEngine } from '@zustag/inventory-engine';
import { ETACalculator } from '@zustag/eta-engine';

class ZustagService {
  private inventoryEngine: InventoryEngine;
  private etaCalculator: ETACalculator;
  private stores: Store[] = [];
  private products: Product[] = [];
  private orders: Order[] = [];
  private eventLog: DomainEvent[] = [];
  private listeners: Set<(event: DomainEvent) => void> = new Set();

  constructor() {
    this.inventoryEngine = new InventoryEngine();
    this.etaCalculator = new ETACalculator();
    this.initializeData();

    // Listen to inventory events and log them to event bus
    this.inventoryEngine.addEventListener((event) => {
      this.broadcastEvent(event);
    });
  }

  private initializeData() {
    this.stores = [...SEED_STORES];
    this.products = [...SEED_PRODUCTS];

    // Seed initial variant stock across Jamshedpur stores
    for (const store of this.stores) {
      for (const prod of this.products) {
        for (const variant of prod.variants) {
          // Generate realistic local stock counts (e.g. 0 to 6 items per store variant)
          let initialQty = 3;
          if (store.locality === 'Bistupur') {
            initialQty = variant.size === 'M' || variant.size === 'L' ? 5 : 2;
          } else if (store.locality === 'Sakchi' && prod.brand === "Levi's") {
            initialQty = 6;
          } else if (store.locality === 'Kadma' && prod.brand === 'Fabindia') {
            initialQty = 4;
          } else {
            initialQty = Math.floor(Math.random() * 4) + 1;
          }
          this.inventoryEngine.setStock(store.id, variant, initialQty, variant.price);
        }
      }
    }
  }

  public subscribeEvents(cb: (event: DomainEvent) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private broadcastEvent(event: DomainEvent) {
    this.eventLog.unshift(event);
    if (this.eventLog.length > 50) this.eventLog.pop();
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  // --- Discovery & Search ---
  public getNearbyProducts(
    userLocation: GeoCoordinate,
    filters?: {
      category?: string;
      under30MinOnly?: boolean;
      searchQuery?: string;
      brand?: string;
    }
  ): LocalAvailabilityItem[] {
    const results: LocalAvailabilityItem[] = [];

    for (const prod of this.products) {
      if (filters?.category && filters.category !== 'all' && prod.category !== filters.category) {
        continue;
      }
      if (filters?.brand && filters.brand !== 'all' && prod.brand !== filters.brand) {
        continue;
      }
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches = 
          prod.title.toLowerCase().includes(q) || 
          prod.brand.toLowerCase().includes(q) ||
          prod.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) continue;
      }

      // Check across all local stores stocking any variant of this product
      for (const variant of prod.variants) {
        for (const store of this.stores) {
          const availability = this.inventoryEngine.getServingAvailability(store.id, variant.id);
          if (availability.available > 0) {
            const eta = this.etaCalculator.calculateETA(
              store.coordinates, 
              userLocation, 
              store.averagePrepTimeMinutes
            );

            if (filters?.under30MinOnly && !eta.isWithin30MinSLA) {
              continue;
            }

            results.push({
              product: prod,
              variant: variant,
              store: store,
              availableQuantity: availability.available,
              distanceKm: eta.distanceKm,
              etaMinutes: eta.totalETAMinutes,
              is30MinDeliveryEligible: eta.isWithin30MinSLA,
              price: availability.price
            });
          }
        }
      }
    }

    // Rank primarily by ETA (fastest delivery first), then by distance
    return results.sort((a, b) => a.etaMinutes - b.etaMinutes);
  }

  public getStores(): Store[] {
    return this.stores;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getInventoryEngine(): InventoryEngine {
    return this.inventoryEngine;
  }

  public getETACalculator(): ETACalculator {
    return this.etaCalculator;
  }

  // --- Orders & Checkout ---
  public createOrder(params: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: {
      addressLine: string;
      area: string;
      city: string;
      coordinates: GeoCoordinate;
    };
    storeId: string;
    items: {
      productId: string;
      variantId: string;
      quantity: number;
    }[];
  }): { success: boolean; order?: Order; error?: string } {
    const store = this.stores.find(s => s.id === params.storeId);
    if (!store) return { success: false, error: 'Store not found' };

    // 1. Check & reserve inventory
    const reservations: string[] = [];
    const orderItems = [];
    let subtotal = 0;

    for (const item of params.items) {
      const res = this.inventoryEngine.reserveVariantStock(params.storeId, item.variantId, item.quantity);
      if (!res.success) {
        // Rollback any earlier reservations
        for (const rId of reservations) this.inventoryEngine.releaseReservation(rId);
        return { success: false, error: res.error || 'Failed to reserve stock' };
      }
      if (res.reservationId) reservations.push(res.reservationId);

      const prod = this.products.find(p => p.id === item.productId);
      const variant = prod?.variants.find(v => v.id === item.variantId);
      if (!prod || !variant) continue;

      const itemTotal = variant.price * item.quantity;
      subtotal += itemTotal;
      orderItems.push({
        productId: prod.id,
        variantId: variant.id,
        storeId: store.id,
        productTitle: prod.title,
        brand: prod.brand,
        size: variant.size,
        color: variant.color,
        price: variant.price,
        quantity: item.quantity,
        image: prod.images[0]
      });
    }

    // 2. Compute live ETA
    const eta = this.etaCalculator.calculateETA(
      store.coordinates,
      params.deliveryAddress.coordinates,
      store.averagePrepTimeMinutes
    );

    // 3. Commit reservations as order is created
    for (const rId of reservations) {
      this.inventoryEngine.commitReservation(rId);
    }

    const orderId = `ord_${Date.now()}`;
    const orderNumber = `ZG-${Math.floor(100000 + Math.random() * 900000)}`;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const order: Order = {
      id: orderId,
      orderNumber,
      customerId: `cust_${Date.now()}`,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      deliveryAddress: params.deliveryAddress,
      storeId: store.id,
      storeName: store.name,
      storeAddress: store.address,
      storeCoordinates: store.coordinates,
      items: orderItems,
      subtotal,
      deliveryFee: 29,
      platformFee: 9,
      totalAmount: subtotal + 29 + 9,
      status: 'STORE_ACCEPTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta,
      otp,
      rider: {
        id: 'rider_jamshedpur_07',
        name: 'Amitabh Soren',
        phone: '+91 98351 04419',
        vehicleNumber: 'JH 05 CD 8821 (Electric Scooter)',
        currentLocation: JAMSHEDPUR_ZONES.BISTUPUR_MAIN
      }
    };

    this.orders.unshift(order);

    this.broadcastEvent({
      eventId: `evt_${Date.now()}`,
      eventType: 'ORDER_CREATED',
      timestamp: new Date().toISOString(),
      payload: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        storeName: order.storeName,
        totalAmount: order.totalAmount,
        etaMinutes: order.eta.totalETAMinutes
      }
    });

    return { success: true, order };
  }

  public getOrders(): Order[] {
    return this.orders;
  }

  public getOrderById(orderId: string): Order | undefined {
    return this.orders.find(o => o.id === orderId);
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): boolean {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return false;
    order.status = status;
    order.updatedAt = new Date().toISOString();

    this.broadcastEvent({
      eventId: `evt_${Date.now()}`,
      eventType: 'DELIVERY_DISPATCHED',
      timestamp: new Date().toISOString(),
      payload: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        newStatus: status
      }
    });

    return true;
  }

  public getRecentEvents(): DomainEvent[] {
    return this.eventLog;
  }
}

// Global Singleton for server-side state in Next.js
declare global {
  var __zustagServiceInstance: ZustagService | undefined;
}

export const zustagService = global.__zustagServiceInstance || (global.__zustagServiceInstance = new ZustagService());
