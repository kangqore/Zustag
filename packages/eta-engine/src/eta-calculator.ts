import { GeoCoordinate, ETABreakdown, calculateHaversineDistanceKm } from '@zustag/domain-core';

export interface ETACalculatorOptions {
  trafficMultiplier?: number; // 1.0 = normal, 1.3 = peak Sakchi/Bistupur rush hour
  riderAvailabilityIndex?: number; // 1.0 = abundant riders, 1.5 = high demand
}

/**
 * ZUSTAG Hyperlocal 30-Minute ETA & Delivery SLA Engine
 * 
 * Formula:
 * ETA = Store Preparation + Rider Assignment + Store Pickup + Transit Time + Buffer
 */
export class ETACalculator {
  private defaultStorePrepMinutes = 6;
  private defaultRiderAssignmentMinutes = 3;
  private defaultPickupMinutes = 2;
  private avgUrbanRiderSpeedKmh = 22; // Average bike speed in Jamshedpur urban zones

  /**
   * Computes precise ETA breakdown between a Showroom and Customer location
   */
  public calculateETA(
    storeLocation: GeoCoordinate,
    customerLocation: GeoCoordinate,
    storePrepOverrideMinutes?: number,
    options: ETACalculatorOptions = {}
  ): ETABreakdown {
    const distanceKm = calculateHaversineDistanceKm(storeLocation, customerLocation);
    const trafficMultiplier = options.trafficMultiplier ?? 1.0;
    const riderAvailability = options.riderAvailabilityIndex ?? 1.0;

    const storePrepMinutes = storePrepOverrideMinutes ?? this.defaultStorePrepMinutes;
    const riderAssignmentMinutes = Math.round(this.defaultRiderAssignmentMinutes * riderAvailability);
    const pickupTimeMinutes = this.defaultPickupMinutes;

    // Transit time calculation: (distance / speed) * 60 minutes * traffic
    const transitHours = distanceKm / this.avgUrbanRiderSpeedKmh;
    const rawTransitMinutes = transitHours * 60 * trafficMultiplier;
    const transitMinutes = Math.max(3, Math.round(rawTransitMinutes));

    // Dynamic buffer based on distance and traffic
    const bufferMinutes = Math.max(2, Math.round(distanceKm * 0.8 * trafficMultiplier));

    const totalETAMinutes = 
      storePrepMinutes + 
      riderAssignmentMinutes + 
      pickupTimeMinutes + 
      transitMinutes + 
      bufferMinutes;

    const isWithin30MinSLA = totalETAMinutes <= 30;

    return {
      storePrepMinutes,
      riderAssignmentMinutes,
      pickupTimeMinutes,
      transitMinutes,
      bufferMinutes,
      totalETAMinutes,
      distanceKm,
      isWithin30MinSLA
    };
  }

  /**
   * Filters and ranks showroom candidate items based on 30-minute delivery promise and proximity
   */
  public isEligibleForFastDelivery(eta: ETABreakdown, maxSlaMinutes: number = 30): boolean {
    return eta.totalETAMinutes <= maxSlaMinutes;
  }
}

export const globalETACalculator = new ETACalculator();
