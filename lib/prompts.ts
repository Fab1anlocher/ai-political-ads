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


Passe Slogan, Tonalität, Typografie, Eyechatcher, emotionale Aufladung, Bildsprache, Farbwelt und Komposition 
an das Profil an – nutze die Profildimensionen (Geschlecht, Alter, politische 
Orientierung, Entscheidungsstil, Familienstand, Kinder, Informationsquellen, berufliches Umfeld) als Orientierung und gewichte sie so, dass die 
Kombination für diese konkrete Person maximal überzeugend wirkt. Unterschiedliche Profile sollen zu klar verschiedenen Bannern führen.
Nutze das beigefügte Argumentarium als einzige Quelle – wähle konkrete Argumente die für dieses Profil am überzeugendsten wirken und baue sie inhaltlich ein.

PROFIL:
- Geschlecht: {geschlecht}
- Alter: {alter}
- Wohnumgebung: {wohnumgebung}
- Bildungsstand: {bildung}
- Berufsstatus: {beruf}
- Haushaltsgrösse: {haushalt} Personen
- Soziale Klasse: {sozialeKlasse}
- Familienstand: {familienstand}
- Kinder: {kinder}
- Informationsquellen: {informationsquellen}
- Berufliches Umfeld: {beruflichesUmfeld}
- Politische Orientierung: {politik}/10 (1 = links, 10 = rechts)
- Entscheidungsstil: {entscheidungsstil}

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
- Geschlecht: {geschlecht}
- Alter: {alter}
- Wohnumgebung: {wohnumgebung}
- Bildungsstand: {bildung}
- Berufsstatus: {beruf}
- Haushaltsgrösse: {haushalt} Personen
- Soziale Klasse: {sozialeKlasse}
- Familienstand: {familienstand}
- Kinder: {kinder}
- Informationsquellen: {informationsquellen}
- Berufliches Umfeld: {beruflichesUmfeld}
- Politische Orientierung: {politik}/10 (1 = links, 10 = rechts)
- Entscheidungsstil: {entscheidungsstil}

Gib ausschliesslich den fertigen Bildgenerierungs-Prompt für das Text-to-Image-Modell zurück. Auf Deutsch, Max. 400 Wörter.
Achte darauf das Profildaten und Seitenzahlen nicht im Bild erscheinen, sondern nur als Orientierung für die Gestaltung zu nutzen.
  `.trim(),
};

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────

/** Ersetzt alle Platzhalter im Prompt durch die Profildaten. */
const STANDARD_ANGABE = 'Keine Angabe';

function wertOderStandard(wert?: string | number | null): string {
  if (wert === undefined || wert === null || String(wert).trim() === '') {
    return STANDARD_ANGABE;
  }
  return String(wert);
}

function informationsquellenFormatieren(profil: ProfilDaten): string {
  const quellen = profil.informationsquellen ?? [];
  if (quellen.length === 0) return STANDARD_ANGABE;

  return quellen
    .map((quelle) => {
      if (quelle !== 'Sonstiges') return quelle;
      const sonstiges = profil.informationsquellenSonstiges?.trim();
      return sonstiges ? `Sonstiges: ${sonstiges}` : 'Sonstiges';
    })
    .join(', ');
}

function promptAufbereiten(vorlage: string, profil: ProfilDaten): string {
  return vorlage
    .replace('{alter}', String(profil.alter))
    .replace('{geschlecht}', profil.geschlecht)
    .replace('{wohnumgebung}', profil.wohnumgebung)
    .replace('{bildung}', profil.bildung)
    .replace('{beruf}', profil.beruf)
    .replace('{haushalt}', String(profil.haushalt))
    .replace('{sozialeKlasse}', profil.sozialeKlasse)
    .replace('{familienstand}', wertOderStandard(profil.familienstand))
    .replace('{kinder}', wertOderStandard(profil.kinder))
    .replace('{informationsquellen}', informationsquellenFormatieren(profil))
    .replace('{beruflichesUmfeld}', wertOderStandard(profil.beruflichesUmfeld))
    .replace('{politik}', String(profil.politik))
    .replace('{entscheidungsstil}', profil.entscheidungsstil);
}

/** Bereitet den Stufe-1-Prompt für eine Initiative und ein Profil auf. */
export function stufe1PromptAufbereiten(
  initiativeId: 1 | 2,
  profil: ProfilDaten
): string {
  return promptAufbereiten(STUFE1_PROMPTS[initiativeId], profil);
}
