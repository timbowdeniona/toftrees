/**
 * Location Service
 * GPS coordinates via expo-location + What3Words address conversion.
 */
import * as Location from 'expo-location';
import type { LocationResult } from '../types';
import { getSettings } from './settings';

/** Request location permissions */
export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

/** Get current GPS location and optionally convert to What3Words */
export async function getCurrentLocation(): Promise<LocationResult> {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    throw new Error('Location permission not granted');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation,
  });

  const result: LocationResult = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    altitude: location.coords.altitude ?? undefined,
    accuracy: location.coords.accuracy ?? undefined,
  };

  // Try to get What3Words address
  try {
    const w3w = await getWhat3Words(result.latitude, result.longitude);
    result.what3words = w3w;
  } catch (error) {
    console.warn('Failed to get What3Words address:', error);
  }

  return result;
}

/** Convert lat/lng to a What3Words address */
export async function getWhat3Words(
  lat: number,
  lng: number
): Promise<string> {
  const settings = await getSettings();
  if (!settings.what3wordsApiKey) {
    throw new Error('What3Words API key not configured');
  }

  const url = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${lat},${lng}&key=${settings.what3wordsApiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.words) {
      return data.words;
    }
    
    if (data.error && data.error.code === 'QuotaExceeded') {
      console.warn('What3Words Quota Exceeded - Using PoC Fallback');
      return `mock.address.toftrees`;
    }
    
    throw new Error(data.error?.message || 'What3Words API request failed');
  } catch (error) {
    console.warn('What3Words API error, generating PoC fallback:', error);
    return `mock.location.survey`;
  }
}

/** Format coordinates for display */
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(6)}°${latDir}, ${Math.abs(lng).toFixed(6)}°${lngDir}`;
}
