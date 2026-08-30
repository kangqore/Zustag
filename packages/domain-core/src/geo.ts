import { GeoCoordinate } from './types';

/**
 * Jamshedpur & Greater Industrial Corridor Fashion Market Zones
 * Covering Bistupur, Sakchi, Jugsalai, Sonari, Mango, Golmuri, Adityapur, and Gamharia
 */
export const JAMSHEDPUR_ZONES: Record<string, GeoCoordinate> = {
  PNM_MALL_BISTUPUR: {
    latitude: 22.7965,
    longitude: 86.1798,
    areaName: 'P&M Hi-Tech City Centre Mall, Bistupur',
    city: 'Jamshedpur',
    landmark: 'Outer Circle Road, Bistupur'
  },
  BISTUPUR_MAIN: {
    latitude: 22.7926,
    longitude: 86.1855,
    areaName: 'Bistupur Main Road & Market',
    city: 'Jamshedpur',
    landmark: 'Near Regal Ground & Bombay Tower'
  },
  SAKCHI_AMBAGAN: {
    latitude: 22.8082,
    longitude: 86.2051,
    areaName: 'Sakchi Ambagan & High Street',
    city: 'Jamshedpur',
    landmark: 'Near V-Mart & Lifestyle'
  },
  SAKCHI_MARKET: {
    latitude: 22.8056,
    longitude: 86.2029,
    areaName: 'Sakchi Central Commercial Hub (Basant Talkies)',
    city: 'Jamshedpur',
    landmark: 'Thakur Bari Road Roundabout'
  },
  JUGSALAI_STATION_RD: {
    latitude: 22.7712,
    longitude: 86.1914,
    areaName: 'Jugsalai Station Road & Wholesale Market',
    city: 'Jamshedpur',
    landmark: 'Near Jugsalai Railway Overbridge'
  },
  GAMHARIA_TATA_KANDRA: {
    latitude: 22.8051,
    longitude: 86.0963,
    areaName: 'Gamharia Commercial Hub & Tata-Kandra Road',
    city: 'Jamshedpur (Seraikela Kharsawan)',
    landmark: 'Near Lal Building, Manglam Tower & Auto Cluster'
  },
  MANGO_DIMNA_RD: {
    latitude: 22.8291,
    longitude: 86.2114,
    areaName: 'Mango / Zakir Nagar & Dimna Road',
    city: 'Jamshedpur',
    landmark: 'Near Old Purulia Road'
  },
  SONARI_AIRPORT: {
    latitude: 22.8123,
    longitude: 86.1689,
    areaName: 'Sonari West Boutique District',
    city: 'Jamshedpur',
    landmark: 'Sonari Aerodrome & Kagalnagar Road'
  },
  GOLMURI_CHOWK: {
    latitude: 22.7981,
    longitude: 86.2234,
    areaName: 'Golmuri Market & Clock Tower',
    city: 'Jamshedpur',
    landmark: 'Golmuri Roundabout'
  },
  ADITYAPUR_HUB: {
    latitude: 22.7885,
    longitude: 86.1492,
    areaName: 'Adityapur Commercial Hub',
    city: 'Jamshedpur',
    landmark: 'Tata-Kandra Main Road & PNM Mall'
  },
  KADMA_FARM_AREA: {
    latitude: 22.7842,
    longitude: 86.1624,
    areaName: 'Kadma Main Road',
    city: 'Jamshedpur',
    landmark: 'Near Kadma Market Post Office'
  },
  CIRCUIT_HOUSE: {
    latitude: 22.8021,
    longitude: 86.1794,
    areaName: 'Circuit House Area (CH Area)',
    city: 'Jamshedpur',
    landmark: 'Northern Town'
  },
  TELCO_PLAZA: {
    latitude: 22.7758,
    longitude: 86.2482,
    areaName: 'Telco Plaza & Community Centre',
    city: 'Jamshedpur',
    landmark: 'Telco Club Road'
  }
};

/**
 * Calculates straight-line distance in Kilometers between two coordinates using Haversine formula
 */
export function calculateHaversineDistanceKm(
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number }
): number {
  const R = 6371; // Earth radius in KM
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
  const lat1 = (coord1.latitude * Math.PI) / 180;
  const lat2 = (coord2.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistance = R * c;

  // Hyperlocal road winding factor in urban & industrial Jamshedpur-Gamharia corridor
  const ROAD_WINDING_FACTOR = 1.25;
  return Math.round(straightDistance * ROAD_WINDING_FACTOR * 10) / 10;
}
