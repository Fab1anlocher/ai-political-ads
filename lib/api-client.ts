// API-Abstraktionsschicht: unterstützt OpenAI (DALL-E) und Google Gemini (Imagen)

import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Minimale Typen für die experimentelle Gemini Imagen API
interface GeminiGeneratedImage {
  image?: { imageBytes?: string | Uint8Array };
}

interface GeminiImagesResponse {
  generatedImages?: GeminiGeneratedImage[];
}

interface GeminiImagenModel {
  generateImages(params: {
    prompt: string;
    number_of_images: number;
    aspect_ratio: string;
  }): Promise<GeminiImagesResponse>;
}

interface GeminiClientWithImagen {
  getGenerativeModel(params: { model: string }): GeminiImagenModel;
}

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

/** Bildgenerierung via Google Gemini Imagen */
async function geminibildGenerieren(prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(API_KEY) as unknown as GeminiClientWithImagen;

  // Imagen-Modell aufrufen (z.B. "imagen-3.0-generate-002")
  const modell = genAI.getGenerativeModel({ model: IMAGE_MODEL });

  const ergebnis = await modell.generateImages({
    prompt,
    number_of_images: 1,
    aspect_ratio: '1:1',
  });

  const bildDaten = ergebnis?.generatedImages?.[0]?.image?.imageBytes;
  if (!bildDaten) {
    throw new Error('Kein Bild von Gemini erhalten.');
  }

  // imageBytes ist ein Base64-String oder Uint8Array
  const base64 =
    typeof bildDaten === 'string'
      ? bildDaten
      : Buffer.from(bildDaten).toString('base64');

  return `data:image/png;base64,${base64}`;
}
