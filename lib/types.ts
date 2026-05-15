// TypeScript-Typen für Profildaten der Umfrage

export type Informationsquelle =
  | 'Fernsehen'
  | 'Radio'
  | 'Zeitung (Print oder Online)'
  | 'Podcasts'
  | 'Social Media';

export type ParteiPraeferenz =
  | 'SVP'
  | 'SP'
  | 'Die Mitte'
  | 'FDP'
  | 'Grüne'
  | 'GLP'
  | 'EVP'
  | 'Andere'
  | 'Keine Angabe';

export type Individualismus =
  | 'Eigenverantwortung und persönliche Freiheit'
  | 'Eher Eigenverantwortung'
  | 'Ausgewogen'
  | 'Eher Gemeinschaft und Solidarität'
  | 'Gemeinschaft und Solidarität';

export interface ProfilDaten {
  alter: number;
  geschlecht: 'Männlich' | 'Weiblich' | 'Divers';
  wohnumgebung: 'Stadt' | 'Land' | 'Agglomeration';
  bildung?:
    | 'Obligatorische Schule'
    | 'Berufsbildung (Lehre)'
    | 'Allgemeinbildende Schule (Fachmaturität / Gymnasiale Maturität)'
    | 'Höhere Berufsbildung (z.B. HF)'
    | 'Hochschule (Bachelor / Master / Doktor)';
  sozialeKlasse?: 'Oberschicht' | 'Obere Mittelschicht' | 'Untere Mittelschicht' | 'Arbeiterklasse' | 'Unterschicht';
  politik: number;        // 1–10 (1=links, 10=rechts)
  entscheidungsstil: 'Fakten & Daten' | 'Eine Kombination aus beidem' | 'Bauchgefühl & Werte';
  informationsquellen?: Informationsquelle[];
  parteiPraeferenz: ParteiPraeferenz;
  individualismus: Individualismus;
  traditionFortschritt: number; // 1–7 (1=Tradition, 7=Fortschritt)
  risikobereitschaft: number; // 1–7 (1=gar nicht, 7=sehr)
}

// API-Antwort vom Route Handler
export interface GenerierungsAntwort {
  bildUrl?: string;      // URL oder Base64-Bild
  fehler?: string;
}

// Verfügbare Volksabstimmungen (erweiterbar)
export type AbstimmungsTyp = 'nachhaltigkeitsinitiative' | 'zivildienstgesetz';
