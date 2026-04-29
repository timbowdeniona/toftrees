/**
 * OCR Service
 * Uses Google Cloud Vision API TEXT_DETECTION to transcribe headstone inscriptions.
 */
import * as FileSystem from 'expo-file-system/legacy';
import type { OcrResult, SanityBlock } from '../types';
import { getSettings } from './settings';

/** Cloud Vision API endpoint */
const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

/**
 * Perform OCR on an image file.
 * Sends the image to Google Cloud Vision TEXT_DETECTION endpoint.
 */
export async function recognizeText(imageUri: string): Promise<OcrResult> {
  const settings = await getSettings();
  if (!settings.cloudVisionApiKey) {
    throw new Error('Cloud Vision API key not configured. Go to Settings.');
  }

  console.log('[OCR] Input URI:', imageUri);

  // Ensure we have a file:// URI (content:// URIs from image picker need copying)
  let fileUri = imageUri;
  if (!imageUri.startsWith('file://')) {
    const cacheUri = `${FileSystem.cacheDirectory}ocr_temp_${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: imageUri, to: cacheUri });
    fileUri = cacheUri;
    console.log('[OCR] Copied to cache:', cacheUri);
  }

  // Read image as base64
  let base64Image = await FileSystem.readAsStringAsync(fileUri, {
    encoding: 'base64',
  });

  // Strip data URI prefix if present (e.g. "data:image/jpeg;base64,...")
  if (base64Image.includes(',')) {
    base64Image = base64Image.split(',').pop() || base64Image;
  }

  console.log('[OCR] Base64 length:', base64Image.length);
  console.log('[OCR] Base64 starts with:', base64Image.substring(0, 30));
  console.log('[OCR] Base64 type:', typeof base64Image);

  // Build request body manually to ensure correct structure
  const requestBody = {
    requests: [
      {
        image: {
          content: base64Image,
        },
        features: [
          { type: 'TEXT_DETECTION', maxResults: 10 },
        ],
      },
    ],
  };

  const bodyString = JSON.stringify(requestBody);
  console.log('[OCR] Request body size:', bodyString.length);

  // Call Cloud Vision API
  const response = await fetch(
    `${VISION_API_URL}?key=${settings.cloudVisionApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyString,
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Vision API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const annotations = data.responses?.[0]?.textAnnotations;

  if (!annotations || annotations.length === 0) {
    return { fullText: '', blocks: [] };
  }

  // First annotation contains the full detected text
  const fullText = annotations[0].description || '';

  // Remaining annotations are individual word/block detections
  const blocks = annotations
    .slice(1)
    .map((a: { description: string }) => a.description);

  return {
    fullText: fullText.trim(),
    blocks,
  };
}

/**
 * Convert plain text inscription to Sanity Portable Text blocks.
 * Each paragraph (double newline) becomes a separate block.
 */
export function textToPortableText(text: string): SanityBlock[] {
  if (!text) return [];

  // Split on double newlines for paragraphs, fall back to single newlines
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((paragraph) => ({
    _type: 'block' as const,
    _key: Math.random().toString(36).substring(2, 10),
    style: 'normal' as const,
    markDefs: [] as never[],
    children: [
      {
        _type: 'span' as const,
        _key: Math.random().toString(36).substring(2, 10),
        text: paragraph,
        marks: [] as never[],
      },
    ],
  }));
}

/**
 * Attempt to extract person information from OCR text.
 * Looks for common headstone patterns like:
 *   "In Loving Memory of JOHN SMITH who died 12th March 1923 aged 76 years"
 */
export function extractPersonsFromText(
  text: string
): Array<{ name?: string; year?: number; age?: number }> {
  const persons: Array<{ name?: string; year?: number; age?: number }> = [];

  // Common headstone patterns
  const patterns = [
    // "JOHN SMITH who died|departed|fell asleep ... 1923 ... aged 76"
    /(?:of|memory of|memory)\s+([A-Z][A-Za-z\s.]+?)(?:\s+who\s+(?:died|departed|fell asleep|passed away|was called to rest).*?)(?:(\d{4}))(?:.*?aged?\s+(\d+))?/gi,
    // "Also JANE SMITH ... 1930 ... aged 82"
    /(?:also|also of)\s+([A-Z][A-Za-z\s.]+?)(?:.*?)(?:(\d{4}))(?:.*?aged?\s+(\d+))?/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const name = match[1]?.trim();
      const year = match[2] ? parseInt(match[2], 10) : undefined;
      const age = match[3] ? parseInt(match[3], 10) : undefined;

      if (name && name.length > 2) {
        persons.push({ name, year, age });
      }
    }
  }

  return persons;
}
