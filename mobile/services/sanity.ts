/**
 * Sanity Upload Service
 * Uploads survey records to the Toftrees Sanity dataset as grave documents.
 */
import { createClient, type SanityClient } from '@sanity/client';
import * as FileSystem from 'expo-file-system';
import type { SurveyRecord, SanityGeopoint, SanityBlock } from '../types';
import { textToPortableText } from './ocr';
import { getSettings } from './settings';

let client: SanityClient | null = null;

/** Get or create the Sanity client */
async function getSanityClient(): Promise<SanityClient> {
  const settings = await getSettings();

  if (!settings.sanityProjectId || !settings.sanityToken) {
    throw new Error(
      'Sanity project ID and write token are required. Go to Settings.'
    );
  }

  // Always recreate in case settings changed
  client = createClient({
    projectId: settings.sanityProjectId,
    dataset: settings.sanityDataset || 'production',
    apiVersion: '2024-01-01',
    useCdn: false, // Required for mutations
    token: settings.sanityToken,
  });

  return client;
}

/** Upload an image file to Sanity and return the asset reference */
async function uploadImage(
  sanityClient: SanityClient,
  imageUri: string,
  filename: string
): Promise<{ _type: 'reference'; _ref: string }> {
  // Read image as blob via fetch (works in React Native)
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const asset = await sanityClient.assets.upload('image', blob, {
    filename,
  });

  return {
    _type: 'reference',
    _ref: asset._id,
  };
}

/** Build a Sanity grave document from a survey record */
function buildGraveDocument(
  survey: SurveyRecord,
  headstoneAssetRef?: { _type: 'reference'; _ref: string },
  additionalAssetRefs?: Array<{ _type: 'reference'; _ref: string }>
): { _type: string } & Record<string, unknown> {
  const doc: { _type: string } & Record<string, unknown> = {
    _type: 'grave',
  };

  if (survey.graveNo != null) doc.graveNo = survey.graveNo;
  if (survey.familySurname) doc.familySurname = survey.familySurname;
  if (survey.locationDescription) doc.locationDescription = survey.locationDescription;

  // Geopoint
  if (survey.latitude != null && survey.longitude != null) {
    const geopoint: SanityGeopoint = {
      _type: 'geopoint',
      lat: survey.latitude,
      lng: survey.longitude,
    };
    if (survey.altitude != null) geopoint.alt = survey.altitude;
    doc.graveyardLocation = geopoint;
    
    doc.latitude = survey.latitude;
    doc.longitude = survey.longitude;
    if (survey.altitude != null) doc.altitude = survey.altitude;
  }

  if (survey.what3words) {
    doc.what3words = survey.what3words;
  }

  // Headstone image
  if (headstoneAssetRef) {
    doc.headstoneImage = {
      _type: 'image',
      asset: headstoneAssetRef,
    };
  }

  // Inscription (as Portable Text blocks)
  const inscriptionText = survey.editedInscription || survey.rawOcrText;
  if (inscriptionText) {
    doc.inscription = textToPortableText(inscriptionText);
  }

  // Condition and extras
  if (survey.headstoneCondition) doc.headstoneCondition = survey.headstoneCondition;
  if (survey.footstone != null) doc.footstone = survey.footstone;
  if (survey.footstoneInscription) doc.footstoneInscription = survey.footstoneInscription;
  if (survey.additionalInformation) {
    // Include W3W in additional info
    let info = survey.additionalInformation;
    if (survey.what3words) {
      info += `\n\nWhat3Words: ///${survey.what3words}`;
    }
    doc.additionalInformation = info;
  } else if (survey.what3words) {
    doc.additionalInformation = `What3Words: ///${survey.what3words}`;
  }

  // Persons
  if (survey.persons && survey.persons.length > 0) {
    doc.persons = survey.persons.map((p) => ({
      _key: p.key || Math.random().toString(36).substring(2, 10),
      name: p.name || '',
      year: p.year,
      age: p.age,
      dateBurial: p.dateBurial || '',
      notes: p.notes || '',
    }));
  }

  // Additional grave images
  if (additionalAssetRefs && additionalAssetRefs.length > 0) {
    doc.graveImages = additionalAssetRefs.map((ref) => ({
      _type: 'image',
      _key: Math.random().toString(36).substring(2, 10),
      asset: ref,
    }));
  }

  return doc;
}

/**
 * Upload a survey record to Sanity.
 * Returns the Sanity document ID.
 */
export async function uploadSurvey(
  survey: SurveyRecord,
  onProgress?: (step: string) => void
): Promise<string> {
  const sanityClient = await getSanityClient();

  // 1. Upload headstone image
  let headstoneAssetRef: { _type: 'reference'; _ref: string } | undefined;
  if (survey.headstonePhotoUri) {
    onProgress?.('Uploading headstone photo...');
    headstoneAssetRef = await uploadImage(
      sanityClient,
      survey.headstonePhotoUri,
      `grave-${survey.graveNo || 'unknown'}-headstone.jpg`
    );
  }

  // 2. Upload additional photos
  let additionalAssetRefs: Array<{ _type: 'reference'; _ref: string }> = [];
  if (survey.additionalPhotoUris && survey.additionalPhotoUris.length > 0) {
    onProgress?.('Uploading additional photos...');
    additionalAssetRefs = await Promise.all(
      survey.additionalPhotoUris.map((uri, i) =>
        uploadImage(
          sanityClient,
          uri,
          `grave-${survey.graveNo || 'unknown'}-photo-${i + 1}.jpg`
        )
      )
    );
  }

  // 3. Create the grave document
  onProgress?.('Creating grave document...');
  const doc = buildGraveDocument(survey, headstoneAssetRef, additionalAssetRefs);
  const result = await sanityClient.create(doc);

  onProgress?.('Upload complete!');
  return result._id;
}

/** Test Sanity connection with current settings */
export async function testConnection(): Promise<boolean> {
  try {
    const sanityClient = await getSanityClient();
    // Try a simple query
    await sanityClient.fetch('*[_type == "grave"][0]._id');
    return true;
  } catch {
    return false;
  }
}
