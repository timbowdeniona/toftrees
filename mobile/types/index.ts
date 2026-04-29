/**
 * Toftrees Churchyard Surveyor — Shared Types
 * Mirrors the Sanity grave schema for clean uploads.
 */

/** Status of a local survey record */
export type SurveyStatus = 'draft' | 'ready' | 'uploaded';

/** Headstone condition options */
export const HEADSTONE_CONDITIONS = [
  'Good',
  'Fair',
  'Poor',
  'Fallen',
  'Missing',
  'Illegible',
] as const;

export type HeadstoneCondition = (typeof HEADSTONE_CONDITIONS)[number];

/** A locally-stored survey record */
export interface SurveyRecord {
  id: string;
  sanityId?: string;
  status: SurveyStatus;

  // Grave data — maps to Sanity grave schema
  graveNo?: number;
  familySurname?: string;
  locationDescription?: string;

  // Location
  latitude?: number;
  longitude?: number;
  altitude?: number;
  what3words?: string;

  // OCR / inscription
  rawOcrText?: string;
  editedInscription?: string;

  // Condition
  headstoneCondition?: HeadstoneCondition;
  footstone?: boolean;
  footstoneInscription?: string;
  additionalInformation?: string;

  // Photos (local file URIs)
  headstonePhotoUri?: string;
  additionalPhotoUris?: string[];

  // Persons — extracted from OCR or manual entry
  persons?: PersonRecord[];

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/** A person buried in the grave */
export interface PersonRecord {
  key: string;
  name?: string;
  year?: number;
  age?: number;
  dateBurial?: string;
  notes?: string;
}

/** Sanity geopoint type */
export interface SanityGeopoint {
  _type: 'geopoint';
  lat: number;
  lng: number;
  alt?: number;
}

/** Sanity portable text block */
export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal';
  markDefs: never[];
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks: never[];
  }>;
}

/** Location result from the location service */
export interface LocationResult {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  what3words?: string;
}

/** OCR result from the vision service */
export interface OcrResult {
  fullText: string;
  confidence?: number;
  blocks?: string[];
}

/** App settings stored in secure storage */
export interface AppSettings {
  cloudVisionApiKey: string;
  what3wordsApiKey: string;
  sanityProjectId: string;
  sanityDataset: string;
  sanityToken: string;
}
