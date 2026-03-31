// API Route Handler für die zweistufige Bildgenerierung
// Stufe 1: Gemini Text-Modell + PDF-Argumentarium → Bildprompt
// Stufe 2: Bildmodell → Banner

import { NextRequest, NextResponse } from 'next/server';
import { bildGenerieren, bildPromptGenerieren } from '@/lib/api-client';
import { stufe1PromptAufbereiten } from '@/lib/prompts';
import { getPdfUri } from '@/lib/gemini-pdf';
import { ProfilDaten, AbstimmungsTyp } from '@/lib/types';

function abstimmungZuId(abstimmung: AbstimmungsTyp): 1 | 2 {
  return abstimmung === 'nachhaltigkeitsinitiative' ? 1 : 2;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profil, abstimmung } = body as {
      profil: ProfilDaten;
      abstimmung?: AbstimmungsTyp;
    };

    // Eingabe-Validierung
    if (!profil) {
      return NextResponse.json(
        { fehler: 'Keine Profildaten übermittelt.' },
        { status: 400 }
      );
    }

    const initiativeId = abstimmungZuId(abstimmung ?? 'nachhaltigkeitsinitiative');

    // PDF-URI holen (einmaliger Upload, danach cached)
    const pdfUri = await getPdfUri(initiativeId);

    // Stufe 1: Bildprompt via Gemini Text-Modell + PDF generieren
    const stage1Prompt = stufe1PromptAufbereiten(initiativeId, profil);
    const bildPrompt = await bildPromptGenerieren(stage1Prompt, pdfUri);

    // Stufe 2: Banner via Bildmodell generieren
    const bildUrl = await bildGenerieren(bildPrompt);

    return NextResponse.json({ bildUrl });
  } catch (fehler) {
    console.error('[generate] Fehler:', fehler);

    const nachricht =
      fehler instanceof Error
        ? fehler.message
        : 'Ein unbekannter Fehler ist aufgetreten.';

    return NextResponse.json(
      { fehler: `Bildgenerierung fehlgeschlagen: ${nachricht}` },
      { status: 500 }
    );
  }
}
