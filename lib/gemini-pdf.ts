// PDF-Upload und URI-Caching für das Gemini File API
// Prüft zuerst ob die Datei noch aktiv auf Gemini gespeichert ist (48h TTL),
// und lädt nur neu hoch wenn nötig.

import { GoogleGenAI } from '@google/genai';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const PDF_PATHS: Record<1 | 2, string> = {
  1: join(process.cwd(), 'argumentarien', 'argumentarium-1.pdf'),
  2: join(process.cwd(), 'argumentarien', 'argumentarium-2.pdf'),
};

const DISPLAY_NAMES: Record<1 | 2, string> = {
  1: 'Argumentarium Nachhaltigkeitsinitiative',
  2: 'Argumentarium Zivildienstgesetz',
};

// Modul-Level-Cache: hält URIs für die Laufzeit des Serverprozesses
const pdfUriCache: Record<1 | 2, string | null> = { 1: null, 2: null };

/**
 * Durchsucht die vorhandenen Gemini-Dateien nach einer noch aktiven Datei
 * mit dem gesuchten displayName. Gibt die URI zurück oder null wenn keine gefunden.
 */
async function findExistingFile(genai: GoogleGenAI, displayName: string): Promise<string | null> {
  const now = new Date();
  const lister = await genai.files.list({ config: { pageSize: 100 } });

  for await (const file of lister) {
    if (
      file.displayName === displayName &&
      file.state === 'ACTIVE' &&
      file.uri &&
      file.expirationTime &&
      new Date(file.expirationTime) > now
    ) {
      return file.uri;
    }
  }

  return null;
}

/**
 * Gibt die Gemini File-URI für das angegebene Argumentarium zurück.
 * Reihenfolge: In-Memory-Cache → vorhandene Gemini-Datei → neu hochladen.
 */
export async function getPdfUri(id: 1 | 2): Promise<string> {
  // 1. In-Memory-Cache (innerhalb der Serverinstanz)
  if (pdfUriCache[id]) {
    return pdfUriCache[id]!;
  }

  const pdfPath = PDF_PATHS[id];
  if (!existsSync(pdfPath)) {
    throw new Error(
      `Argumentarium ${id} nicht gefunden: ${pdfPath}\n` +
      `Bitte PDF-Datei unter argumentarien/argumentarium-${id}.pdf ablegen.`
    );
  }

  const apiKey = process.env.API_KEY ?? '';
  if (!apiKey) {
    throw new Error('API_KEY ist nicht konfiguriert.');
  }

  const genai = new GoogleGenAI({ apiKey });
  const displayName = DISPLAY_NAMES[id];

  // 2. Prüfen ob die Datei noch aktiv auf Gemini existiert (spart Upload)
  const existingUri = await findExistingFile(genai, displayName);
  if (existingUri) {
    console.log(`[pdf] Argumentarium ${id} bereits vorhanden → ${existingUri}`);
    pdfUriCache[id] = existingUri;
    return existingUri;
  }

  // 3. Neu hochladen
  console.log(`[pdf] Lade Argumentarium ${id} hoch...`);
  const fileBuffer = readFileSync(pdfPath);
  const blob = new Blob([fileBuffer], { type: 'application/pdf' });

  const uploaded = await genai.files.upload({
    file: blob,
    config: { mimeType: 'application/pdf', displayName },
  });

  const uri = uploaded.uri;
  if (!uri) {
    throw new Error(`Kein URI vom Gemini File API für Argumentarium ${id} erhalten.`);
  }

  console.log(`[pdf] Argumentarium ${id} hochgeladen → ${uri}`);
  pdfUriCache[id] = uri;
  return uri;
}
