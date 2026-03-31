// TypeScript-Typen für Profildaten der Umfrage

export interface ProfilDaten {
  alter: number;
  geschlecht: 'Männlich' | 'Weiblich' | 'Divers';
  wohnumgebung: 'Stadt' | 'Land' | 'Agglomeration';
  bildung: 'Obligatorische Schule' | 'Berufslehre' | 'Matura' | 'Bachelor' | 'Master/Doktorat';
  beruf: 'Vollzeitangestellt' | 'Teilzeitangestellt' | 'Selbständig' | 'Rentner/Pensioniert' | 'Hausfrau/-mann' | 'Student/in' | 'Arbeitslos';
  haushalt: number;
  sozialeKlasse: 'Oberschicht' | 'Obere Mittelschicht' | 'Untere Mittelschicht' | 'Arbeiterklasse' | 'Unterschicht';
  politik: number;        // 1–10 (1=links, 10=rechts)
  entscheidungsstil: 'Fakten & Daten' | 'Eine Kombination aus beidem' | 'Bauchgefühl & Werte';
}

// API-Antwort vom Route Handler
export interface GenerierungsAntwort {
  bildUrl?: string;      // URL oder Base64-Bild
  fehler?: string;
}

// Verfügbare Volksabstimmungen (erweiterbar)
export type AbstimmungsTyp = 'nachhaltigkeitsinitiative' | 'zivildienstgesetz';
