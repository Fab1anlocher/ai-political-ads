// Prompt-Vorlagen für die zweistufige Banner-Generierung
// Stufe 1: Gemini Text-Modell + PDF-Argumentarium → detaillierter Bildprompt
// Stufe 2: Bildmodell + Bildprompt → Banner

import { ProfilDaten } from './types';

// ── Stufe-1-Prompts ───────────────────────────────────────────────────────────
// Werden zusammen mit dem PDF-Argumentarium an das Gemini Text-Modell gesendet.
// Das Modell gibt einen fertigen Bildprompt für das Image-Modell zurück.

const STUFE1_PROMPTS: Record<1 | 2, string> = {

  1: `
Du bist Spezialist für politische Kommunikation und Wahlwerbung in der Schweiz.
Du erhältst ein Personenprofil und ein Argumentarium zur JA-Kampagne der Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)».

Deine Aufgabe: Erstelle einen präzisen Bildgenerierungs-Prompt für ein Text-to-Image-Modell.
Das Ergebnis soll ein politischer Werbebanner für Social Media (Querformat) sein, der diese Person überzeugt, JA zu stimmen.


Passe Slogan, Tonalität, Typografie, Eyecatcher, emotionale Aufladung, Bildsprache, Farbwelt und Komposition 
an das Profil an – nutze die Profildimensionen (Geschlecht, Alter, politische 
Orientierung, Entscheidungsstil, Familienstand, Kinder, Informationsquellen, berufliches Umfeld) als Orientierung und gewichte sie so, dass die 
Kombination für diese konkrete Person maximal überzeugend wirkt. Unterschiedliche Profile sollen zu klar verschiedenen Bannern führen.
Nutze das beigefügte Argumentarium als einzige Quelle – wähle konkrete Argumente die für dieses Profil am überzeugendsten wirken und baue sie inhaltlich ein.

    PROFIL:
    {profil}

Gib ausschliesslich den fertigen Bildgenerierungs-Prompt für das Text-to-Image-Modell zurück. Auf Deutsch, Max. 400 Wörter.
Achte darauf das Profildaten und Seitenzahlen nicht im Bild erscheinen, sondern nur als Orientierung für die Gestaltung zu nutzen.
  `.trim(),

  2: `
Du bist Spezialist für politische Kommunikation und Wahlwerbung in der Schweiz.
Du erhältst ein Personenprofil und ein Argumentarium zur NEIN-Kampagne zur Abstimmung über die Änderung des Bundesgesetzes über den zivilen Ersatzdienst (ZDG).

Deine Aufgabe: Erstelle einen präzisen Bildgenerierungs-Prompt für ein Text-to-Image-Modell.
Das Ergebnis soll ein politischer Werbebanner für Social Media (Querformat) sein, der diese Person überzeugt, NEIN zu stimmen.

Passe Slogan, Tonalität, Typografie, Eyechatcher, emotionale Aufladung, Bildsprache, Farbwelt und Komposition 
an das Profil an – nutze die Profildimensionen (Geschlecht, Alter, politische Orientierung, Entscheidungsstil, Familienstand, Kinder, Informationsquellen, berufliches Umfeld) als Orientierung und gewichte sie so, dass die 
Kombination für diese konkrete Person maximal überzeugend wirkt. Unterschiedliche Profile sollen zu klar verschiedenen Bannern führen.
Nutze das beigefügte Argumentarium als einzige Quelle – wähle konkrete Argumente die für dieses Profil am überzeugendsten wirken und baue sie inhaltlich ein.

    PROFIL:
    {profil}

Gib ausschliesslich den fertigen Bildgenerierungs-Prompt für das Text-to-Image-Modell zurück. Auf Deutsch, Max. 400 Wörter.
Achte darauf das Profildaten und Seitenzahlen nicht im Bild erscheinen, sondern nur als Orientierung für die Gestaltung zu nutzen.
  `.trim(),
};

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────

/** Ersetzt alle Platzhalter im Prompt durch die Profildaten. */
function informationsquellenFormatieren(
  profil: ProfilDaten
): string | undefined {
  const quellen = profil.informationsquellen ?? [];
  if (quellen.length === 0) return undefined;
  return quellen.join(', ');
}

function optionalZeile(
  label: string,
  wert?: string | number | null
): string | null {
  if (wert === undefined || wert === null || String(wert).trim() === '') {
    return null;
  }
  return `- ${label}: ${wert}`;
}

function profilAbschnittErstellen(profil: ProfilDaten): string {
  const zeilen = [
    `- Geschlecht: ${profil.geschlecht}`,
    `- Alter: ${profil.alter}`,
    `- Wohnumgebung: ${profil.wohnumgebung}`,
    optionalZeile('Bildungsstand', profil.bildung),
    optionalZeile('Berufsstatus', profil.beruf),
    `- Haushaltsgrösse: ${profil.haushalt} Personen`,
    optionalZeile('Soziale Klasse', profil.sozialeKlasse),
    optionalZeile('Familienstand', profil.familienstand),
    optionalZeile('Kinder', profil.kinder),
    optionalZeile(
      'Informationsquellen',
      informationsquellenFormatieren(profil)
    ),
    optionalZeile('Berufliches Umfeld', profil.beruflichesUmfeld),
    `- Politische Orientierung: ${profil.politik}/10 (1 = links, 10 = rechts)`,
    `- Entscheidungsstil: ${profil.entscheidungsstil}`,
  ];

  return zeilen.filter((zeile): zeile is string => Boolean(zeile)).join('\n');
}

function promptAufbereiten(vorlage: string, profil: ProfilDaten): string {
  return vorlage.replace('{profil}', profilAbschnittErstellen(profil));
}

/** Bereitet den Stufe-1-Prompt für eine Initiative und ein Profil auf. */
export function stufe1PromptAufbereiten(
  initiativeId: 1 | 2,
  profil: ProfilDaten
): string {
  return promptAufbereiten(STUFE1_PROMPTS[initiativeId], profil);
}
