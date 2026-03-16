// API Route Handler für die Bildgenerierung
// Ruft je nach API_PROVIDER OpenAI oder Gemini auf

import { NextRequest, NextResponse } from 'next/server';
import { bildGenerieren } from '@/lib/api-client';
import { promptAufbereiten, PROMPT_VORLAGE_1, PROMPT_VORLAGE_2 } from '@/lib/prompts';
import { ProfilDaten, AbstimmungsTyp } from '@/lib/types';

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

    // Prompt je nach Abstimmung auswählen (erweiterbar auf PROMPT_VORLAGE_2)
    const vorlage = abstimmung === 'abstimmung2'
      ? PROMPT_VORLAGE_2
      : PROMPT_VORLAGE_1;

    // Prompt mit Profildaten befüllen
    const prompt = promptAufbereiten(vorlage, profil);

    // Bild generieren (API-Aufruf serverseitig)
    const bildUrl = await bildGenerieren(prompt);

    return NextResponse.json({ bildUrl });
  } catch (fehler) {
    console.error('[generate] Fehler:', fehler);

    // Benutzerfreundliche Fehlermeldung auf Deutsch
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
