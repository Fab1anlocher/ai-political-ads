// API-Abstraktionsschicht: unterstützt OpenAI (DALL-E) und Google Gemini (Imagen)

import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

// Umgebungsvariablen (serverseitig)
const API_KEY = process.env.API_KEY ?? '';
const API_PROVIDER = process.env.API_PROVIDER ?? 'openai';
const IMAGE_MODEL = process.env.IMAGE_MODEL ?? 'dall-e-3';

/**
 * Generiert ein politisches Werbebild anhand des aufbereiteten Prompts.
 * Gibt eine URL oder einen Base64-String zurück.
 */
export async function bildGenerieren(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('API_KEY ist nicht konfiguriert.');
  }

  if (API_PROVIDER === 'gemini') {
    return await geminibildGenerieren(prompt);
  }

  // Standard: OpenAI
  return await openAiBildGenerieren(prompt);
}

/** Bildgenerierung via OpenAI DALL-E */
async function openAiBildGenerieren(prompt: string): Promise<string> {
  const client = new OpenAI({ apiKey: API_KEY });

  const antwort = await client.images.generate({
    model: IMAGE_MODEL,
    prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  const b64 = antwort.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error('Kein Bild von OpenAI erhalten.');
  }

  return `data:image/png;base64,${b64}`;
}

/** Bildgenerierung via Google Gemini (generateContent API) */
async function geminibildGenerieren(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const antwort = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: prompt,
  });

  const teile = antwort.candidates?.[0]?.content?.parts ?? [];
  if (!antwort.candidates?.[0]) {
    throw new Error('Keine Kandidaten von Gemini erhalten.');
  }
  for (const teil of teile) {
    if (teil.inlineData?.data) {
      return `data:image/png;base64,${teil.inlineData.data}`;
    }
  }

  throw new Error('Kein Bild von Gemini erhalten.');
}
