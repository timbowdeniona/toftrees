/**
 * Settings Service
 * Securely stores and retrieves API keys and configuration.
 */
import * as SecureStore from 'expo-secure-store';
import type { AppSettings } from '../types';

const SETTINGS_KEY = 'toftrees_settings_v2';

/** Default settings with pre-configured values where known */
const DEFAULT_SETTINGS: AppSettings = {
  cloudVisionApiKey: process.env.EXPO_PUBLIC_VISION_API_KEY || '',
  what3wordsApiKey: 'VFNUJZMI',
  sanityProjectId: 'pu2m4784',
  sanityDataset: 'sandbox',
  sanityToken:
    'skJzHbkkylDxNyvTruXMmW8Q0KqkEC1A4hMVnnl29MWLeXAP3j8zcLHe64f9kabeRPbTMkbfZLpWk5oLOid60BXKmRwNj9sdQr9T4Uf5lK8r8N8IMmvokGOj8LEuRRQrNXjkUfk8G8aycRNFmCoVGX0JQgjV7RTl9NklHxb2fW6yWutibDEa',
};

/** Retrieve all app settings */
export async function getSettings(): Promise<AppSettings> {
  try {
    const raw = await SecureStore.getItemAsync(SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.warn('Failed to read settings:', error);
  }
  return { ...DEFAULT_SETTINGS };
}

/** Save all app settings */
export async function saveSettings(settings: AppSettings): Promise<void> {
  await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify(settings));
}

/** Update a single setting */
export async function updateSetting<K extends keyof AppSettings>(
  key: K,
  value: AppSettings[K]
): Promise<void> {
  const current = await getSettings();
  current[key] = value;
  await saveSettings(current);
}

/** Check if all required settings are configured */
export async function validateSettings(): Promise<{
  valid: boolean;
  missing: string[];
}> {
  const settings = await getSettings();
  const missing: string[] = [];

  if (!settings.cloudVisionApiKey) missing.push('Cloud Vision API Key');
  if (!settings.what3wordsApiKey) missing.push('What3Words API Key');
  if (!settings.sanityProjectId) missing.push('Sanity Project ID');
  if (!settings.sanityDataset) missing.push('Sanity Dataset');
  if (!settings.sanityToken) missing.push('Sanity Write Token');

  return { valid: missing.length === 0, missing };
}
