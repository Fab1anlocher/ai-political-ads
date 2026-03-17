// Prompt-Vorlagen für die politischen Werbebanner-Generierung

// Volksinitiative 1: «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)»
export const PROMPT_NACHHALTIGKEITSINITIATIVE = `
Du bist Spezialist für politische Kommunikation in der Schweiz.
Du erhältst Profildaten einer Person aus einer Umfrage.
Erstelle basierend auf diesen Daten einen fertig verwendbaren politischen
Werbebanner für die JA-Kampagne zur Volksinitiative
«Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)».

Der Banner soll sofort einsatzbereit sein als Instagram-Post
(quadratisch, 1080x1080px).

Du entscheidest eigenständig über Slogan, Bildsprache, Farbwelt,
Typografie und Komposition – alles abgeleitet aus dem Profil der Person,
sodass der Banner authentisch für diese Zielgruppe wirkt.

PROFIL:
- Alter: {alter}
- Geschlecht: {geschlecht}
- Wohnumgebung: {wohnumgebung}
- Bildungsstand: {bildung}
- Berufsstatus: {beruf}
- Haushaltsgrösse: {haushalt} Personen
- Politische Richtung: {politik}/10 (1=links, 10=rechts)
- Entscheidungsstil: {entscheidungsstil}/10 (1=emotional, 10=rational)
- Risikobereitschaft: {risikobereitschaft}/10 (1=sicherheitsorientiert, 10=risikofreudig)

Wichtig: Nur Bildausgabe, kein Text als Antwort.
`;

// Volksinitiative 2: Änderung des Zivildienstgesetzes
export const PROMPT_ZIVILDIENSTGESETZ = `
Du bist Spezialist für politische Kommunikation in der Schweiz.
Du erhältst Profildaten einer Person aus einer Umfrage.
Erstelle basierend auf diesen Daten einen fertig verwendbaren politischen
Werbebanner für die JA-Kampagne zur Volksabstimmung über die
Änderung des Zivildienstgesetzes.

Hintergrund: Die Vorlage sieht vor, dass Zivildienstleistende künftig
länger Zivildienst leisten müssen (Faktor 1,5 statt bisher 1,1 gegenüber
der Militärdienstzeit). Zudem sollen Einsatzbetriebe stärker reguliert
und die Bedingungen für einen Wechsel vom Militär- zum Zivildienst
verschärft werden.

Der Banner soll sofort einsatzbereit sein als Instagram-Post
(quadratisch, 1080x1080px).

Du entscheidest eigenständig über Slogan, Bildsprache, Farbwelt,
Typografie und Komposition – alles abgeleitet aus dem Profil der Person,
sodass der Banner authentisch für diese Zielgruppe wirkt.

PROFIL:
- Alter: {alter}
- Geschlecht: {geschlecht}
- Wohnumgebung: {wohnumgebung}
- Bildungsstand: {bildung}
- Berufsstatus: {beruf}
- Haushaltsgrösse: {haushalt} Personen
- Politische Richtung: {politik}/10 (1=links, 10=rechts)
- Entscheidungsstil: {entscheidungsstil}/10 (1=emotional, 10=rational)
- Risikobereitschaft: {risikobereitschaft}/10 (1=sicherheitsorientiert, 10=risikofreudig)

Wichtig: Nur Bildausgabe, kein Text als Antwort.
`;

// Hilfsfunktion: Platzhalter im Prompt ersetzen
export function promptAufbereiten(
  vorlage: string,
  profil: {
    alter: number;
    geschlecht: string;
    wohnumgebung: string;
    bildung: string;
    beruf: string;
    haushalt: number;
    politik: number;
    entscheidungsstil: number;
    risikobereitschaft: number;
  }
): string {
  return vorlage
    .replace('{alter}', String(profil.alter))
    .replace('{geschlecht}', profil.geschlecht)
    .replace('{wohnumgebung}', profil.wohnumgebung)
    .replace('{bildung}', profil.bildung)
    .replace('{beruf}', profil.beruf)
    .replace('{haushalt}', String(profil.haushalt))
    .replace('{politik}', String(profil.politik))
    .replace('{entscheidungsstil}', String(profil.entscheidungsstil))
    .replace('{risikobereitschaft}', String(profil.risikobereitschaft));
}
