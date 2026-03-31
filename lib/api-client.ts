import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.API_KEY ?? '';
const IMAGE_MODEL = process.env.IMAGE_MODEL ?? 'gemini-3-pro-image-preview';
const GEMINI_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL ?? 'gemini-2.5-flash';

function getClient(): GoogleGenAI {
  if (!API_KEY) throw new Error('API_KEY ist nicht konfiguriert.');
  return new GoogleGenAI({ apiKey: API_KEY });
}

/**
 * Stufe 1: Liest das PDF-Argumentarium + Profil und erstellt einen Bildprompt.
 */
export async function bildPromptGenerieren(
  textPrompt: string,
  pdfUri: string
): Promise<string> {
  const ai = getClient();

  const antwort = await ai.models.generateContent({
    model: GEMINI_TEXT_MODEL,
    contents: [{
      role: 'user',
      parts: [
        { fileData: { fileUri: pdfUri, mimeType: 'application/pdf' } },
        { text: textPrompt },
      ],
    }],
  });

  const text = antwort.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error('Kein Bildprompt von Gemini erhalten (Stufe 1).');

  return text;
}

/**
 * Stufe 2: Generiert das Banner-Bild anhand des Bildprompts.
 */
export async function bildGenerieren(prompt: string): Promise<string> {
  const ai = getClient();

  const antwort = await ai.models.generateContent({
    model: IMAGE_MODEL,
    config: {
      responseModalities: ['IMAGE', 'TEXT'],
      imageConfig: { aspectRatio: '16:9' },
    },
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const teile = antwort.candidates?.[0]?.content?.parts ?? [];
  if (!antwort.candidates?.[0]) throw new Error('Keine Kandidaten von Gemini erhalten.');

  for (const teil of teile) {
    if (teil.inlineData?.data) {
      return `data:image/png;base64,${teil.inlineData.data}`;
    }
  }

  throw new Error('Kein Bild von Gemini erhalten.');
}
