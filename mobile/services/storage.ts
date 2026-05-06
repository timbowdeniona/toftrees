/**
 * Local SQLite Storage Service
 * Persists survey records locally for offline-first operation.
 */
import * as SQLite from 'expo-sqlite';
import type { SurveyRecord, SurveyStatus, PersonRecord, HeadstoneCondition } from '../types';

const DB_NAME = 'toftrees_surveys.db';

let db: SQLite.SQLiteDatabase | null = null;

/** Get or open the database connection */
async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
    await initDb(db);
  }
  return db;
}

/** Initialize database tables */
async function initDb(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS surveys (
      id TEXT PRIMARY KEY NOT NULL,
      sanityId TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      graveNo INTEGER,
      familySurname TEXT,
      locationDescription TEXT,
      latitude REAL,
      longitude REAL,
      altitude REAL,
      what3words TEXT,
      rawOcrText TEXT,
      editedInscription TEXT,
      headstoneCondition TEXT,
      footstone INTEGER DEFAULT 0,
      footstoneInscription TEXT,
      additionalInformation TEXT,
      headstonePhotoUri TEXT,
      additionalPhotoUris TEXT,
      persons TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);
}

/** Convert a database row to a SurveyRecord */
function rowToSurvey(row: Record<string, unknown>): SurveyRecord {
  return {
    id: row.id as string,
    sanityId: row.sanityId as string | undefined,
    status: row.status as SurveyStatus,
    graveNo: row.graveNo as number | undefined,
    familySurname: row.familySurname as string | undefined,
    locationDescription: row.locationDescription as string | undefined,
    latitude: row.latitude as number | undefined,
    longitude: row.longitude as number | undefined,
    altitude: row.altitude as number | undefined,
    what3words: row.what3words as string | undefined,
    rawOcrText: row.rawOcrText as string | undefined,
    editedInscription: row.editedInscription as string | undefined,
    headstoneCondition: (row.headstoneCondition as HeadstoneCondition) || undefined,
    footstone: row.footstone === 1,
    footstoneInscription: row.footstoneInscription as string | undefined,
    additionalInformation: row.additionalInformation as string | undefined,
    headstonePhotoUri: row.headstonePhotoUri as string | undefined,
    additionalPhotoUris: row.additionalPhotoUris
      ? JSON.parse(row.additionalPhotoUris as string)
      : undefined,
    persons: row.persons
      ? JSON.parse(row.persons as string)
      : undefined,
    createdAt: row.createdAt as string,
    updatedAt: row.updatedAt as string,
  };
}

/** Create a new survey record */
export async function createSurvey(
  partial: Partial<SurveyRecord> = {}
): Promise<SurveyRecord> {
  const database = await getDb();
  const now = new Date().toISOString();
  const survey: SurveyRecord = {
    id: Math.random().toString(36).substring(2, 10),
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    ...partial,
  };

  await database.runAsync(
    `INSERT INTO surveys (
      id, sanityId, status, graveNo, familySurname, locationDescription,
      latitude, longitude, altitude, what3words,
      rawOcrText, editedInscription, headstoneCondition,
      footstone, footstoneInscription, additionalInformation,
      headstonePhotoUri, additionalPhotoUris, persons,
      createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    survey.id,
    survey.sanityId ?? null,
    survey.status,
    survey.graveNo ?? null,
    survey.familySurname ?? null,
    survey.locationDescription ?? null,
    survey.latitude ?? null,
    survey.longitude ?? null,
    survey.altitude ?? null,
    survey.what3words ?? null,
    survey.rawOcrText ?? null,
    survey.editedInscription ?? null,
    survey.headstoneCondition ?? null,
    survey.footstone ? 1 : 0,
    survey.footstoneInscription ?? null,
    survey.additionalInformation ?? null,
    survey.headstonePhotoUri ?? null,
    survey.additionalPhotoUris ? JSON.stringify(survey.additionalPhotoUris) : null,
    survey.persons ? JSON.stringify(survey.persons) : null,
    survey.createdAt,
    survey.updatedAt
  );

  return survey;
}

/** Update an existing survey record */
export async function updateSurvey(
  id: string,
  updates: Partial<SurveyRecord>
): Promise<void> {
  const database = await getDb();
  const now = new Date().toISOString();

  const fields: string[] = [];
  const values: unknown[] = [];

  const fieldMap: Record<string, (v: unknown) => unknown> = {
    sanityId: (v) => v,
    status: (v) => v,
    graveNo: (v) => v,
    familySurname: (v) => v,
    locationDescription: (v) => v,
    latitude: (v) => v,
    longitude: (v) => v,
    altitude: (v) => v,
    what3words: (v) => v,
    rawOcrText: (v) => v,
    editedInscription: (v) => v,
    headstoneCondition: (v) => v,
    footstone: (v) => (v ? 1 : 0),
    footstoneInscription: (v) => v,
    additionalInformation: (v) => v,
    headstonePhotoUri: (v) => v,
    additionalPhotoUris: (v) => (v ? JSON.stringify(v) : null),
    persons: (v) => (v ? JSON.stringify(v) : null),
  };

  for (const [key, transform] of Object.entries(fieldMap)) {
    if (key in updates) {
      fields.push(`${key} = ?`);
      values.push(transform((updates as Record<string, unknown>)[key]) ?? null);
    }
  }

  if (fields.length === 0) return;

  fields.push('updatedAt = ?');
  values.push(now);
  values.push(id);

  await database.runAsync(
    `UPDATE surveys SET ${fields.join(', ')} WHERE id = ?`,
    ...(values as Array<string | number | null>)
  );
}

/** Get all surveys, ordered by most recent first */
export async function getAllSurveys(): Promise<SurveyRecord[]> {
  const database = await getDb();
  const rows = await database.getAllAsync(
    'SELECT * FROM surveys ORDER BY updatedAt DESC'
  );
  return (rows as Record<string, unknown>[]).map(rowToSurvey);
}

/** Get a single survey by ID */
export async function getSurvey(id: string): Promise<SurveyRecord | null> {
  const database = await getDb();
  const row = await database.getFirstAsync(
    'SELECT * FROM surveys WHERE id = ?',
    id
  );
  return row ? rowToSurvey(row as Record<string, unknown>) : null;
}

/** Delete a survey by ID */
export async function deleteSurvey(id: string): Promise<void> {
  const database = await getDb();
  await database.runAsync('DELETE FROM surveys WHERE id = ?', id);
}

/** Get surveys by status */
export async function getSurveysByStatus(
  status: SurveyStatus
): Promise<SurveyRecord[]> {
  const database = await getDb();
  const rows = await database.getAllAsync(
    'SELECT * FROM surveys WHERE status = ? ORDER BY updatedAt DESC',
    status
  );
  return (rows as Record<string, unknown>[]).map(rowToSurvey);
}

/** Count surveys by status */
export async function countSurveysByStatus(): Promise<
  Record<SurveyStatus, number>
> {
  const database = await getDb();
  const rows = await database.getAllAsync(
    'SELECT status, COUNT(*) as count FROM surveys GROUP BY status'
  );
  const counts: Record<SurveyStatus, number> = {
    draft: 0,
    ready: 0,
    uploaded: 0,
  };
  for (const row of rows as Array<{ status: string; count: number }>) {
    counts[row.status as SurveyStatus] = row.count;
  }
  return counts;
}
