/**
 * ZUSTAG Core Domain Types & Geolocation Models
 * Kangqore Group - Hyperlocal Fashion Commerce Network
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  areaName: string;
  city: string;
  landmark?: string;
}

export type FashionCategory = 
  | 'shirts'
  | 't-shirts'
  | 'jeans'
  | 'trousers'
  | 'dresses'
  | 'ethnic'
  | 'footwear'
  | 'jackets'
  | 'accessories'
  | 'watches'
  | 'bags-luggage'
  | 'kids-wear';

export type ProductGender = 'men' | 'women' | 'unisex' | 'kids';

export type VariantSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '28' | '30' | '32' | '34' | '36' | '38' | '7' | '8' | '9' | '10' | '11';

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size: VariantSize;
  color: string;
  colorHex: string;
  mrp: number;
  price: number;
  barcode?: string;
}

export type AcquisitionPriority = 'TIER_1_CRITICAL' | 'TIER_2_HIGH' | 'TIER_3_MEDIUM';
export type BusinessType = 'ORGANIZED_CHAIN' | 'INDEPENDENT_BOUTIQUE' | 'TRADITIONAL_RETAIL' | 'WHOLESALE_VALUE' | 'ACCESSORY_SPECIALIST';
export type PriceBand = 'PREMIUM_LUXURY' | 'MID_PREMIUM' | 'MASS_VALUE' | 'BUDGET_FRIENDLY';
export type OnboardingStatus = 'LIVE_30M_ACTIVE' | 'ONBOARDING' | 'PIPELINE_PRIORITY' | 'CONTACTED';
export type POSCapability = 'API_CONNECTED' | 'EXCEL_BARCODE_SYNC' | 'MANUAL_APP_POS' | 'ASSISTED_ZUSTAG';

export interface Store {
  id: string;
  merchantId: string;
  name: string;
  brand: string;
  address: string;
  locality: string;
  city: string;
  mallOrMarket: string;
  coordinates: GeoCoordinate;
  rating: number;
  totalRatings: number;
  isOpen: boolean;
  averagePrepTimeMinutes: number;
  contactNumber: string;
  imageUrl: string;
  tags: string[];
  
  // ZUSTAG Merchant Graph Intelligence Attributes
  acquisitionTier: AcquisitionPriority;
  businessType: BusinessType;
  priceBand: PriceBand;
  onboardingStatus: OnboardingStatus;
  posCapability: POSCapability;
  fashionSegments: string[];
  approxStoreSqFt?: number;
  googleRating?: number;
  googleReviewCount?: number;
  instagramHandle?: string;
}

export interface StoreInventoryItem {
  id: string;
  storeId: string;
  productId: string;
  variantId: string;
  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number; // totalQuantity - reservedQuantity
  price: number;
  lastUpdated: string;
}

export interface Product {
  id: string;
  brand: string;
  title: string;
  description: string;
  category: FashionCategory;
  gender: ProductGender;
  mrp: number;
  basePrice: number;
  images: string[];
  fabric: string;
  pattern: string;
  occasion: 'casual' | 'formal' | 'party' | 'festive' | 'sports';
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  tags: string[];
}

export interface LocalAvailabilityItem {
  product: Product;
  variant: ProductVariant;
  store: Store;
  availableQuantity: number;
  distanceKm: number;
  etaMinutes: number;
  is30MinDeliveryEligible: boolean;
  price: number;
}

export type OrderStatus = 
  | 'CREATED'
  | 'INVENTORY_RESERVED'
  | 'PAYMENT_CONFIRMED'
  | 'STORE_ACCEPTED'
  | 'PACKED_READY'
  | 'RIDER_ASSIGNED'
  | 'RIDER_AT_STORE'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  productId: string;
  variantId: string;
  storeId: string;
  productTitle: string;
  brand: string;
  size: VariantSize;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ETABreakdown {
  storePrepMinutes: number;
  riderAssignmentMinutes: number;
  pickupTimeMinutes: number;
  transitMinutes: number;
  bufferMinutes: number;
  totalETAMinutes: number;
  distanceKm: number;
  isWithin30MinSLA: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: {
    addressLine: string;
    area: string;
    city: string;
    coordinates: GeoCoordinate;
    instructions?: string;
  };
  storeId: string;
  storeName: string;
  storeAddress: string;
  storeCoordinates: GeoCoordinate;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  eta: ETABreakdown;
  rider?: {
    id: string;
    name: string;
    phone: string;
    currentLocation: GeoCoordinate;
    vehicleNumber: string;
  };
  otp: string;
}

export interface DomainEvent<T = any> {
  eventId: string;
  eventType: 
    | 'INVENTORY_UPDATED'
    | 'INVENTORY_RESERVED'
    | 'INVENTORY_RELEASED'
    | 'ORDER_CREATED'
    | 'ORDER_PREP_STARTED'
    | 'ORDER_PACKED'
    | 'RIDER_ASSIGNED'
    | 'DELIVERY_DISPATCHED'
    | 'DELIVERY_COMPLETED';
  timestamp: string;
  payload: T;
}
