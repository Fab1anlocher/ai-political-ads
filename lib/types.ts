// TypeScript-Typen für Profildaten der Umfrage

export type KinderStatus =
  | 'Ja, im eigenen Haushalt lebend'
  | 'Ja, nicht im eigenen Haushalt lebend'
  | 'Nein, keine Kinder';

export type Informationsquelle =
  | 'Fernsehen'
  | 'Radio'
  | 'Zeitung (Print oder Online)'
  | 'Podcasts'
  | 'Social Media';

export type BeruflichesUmfeld =
  | 'Landwirtschaft & Forstwirtschaft'
  | 'Energie & Versorgung (Strom, Wasser, Entsorgung)'
  | 'Industrie / Produktion'
  | 'Bauwesen / Infrastruktur'
  | 'Handel / Verkauf (Detail- & Grosshandel)'
  | 'Transport & Logistik'
  | 'Gastgewerbe / Tourismus'
  | 'Informationstechnologie / Telekommunikation'
  | 'Medien / Kommunikation / Marketing'
  | 'Finanzwesen / Versicherung'
  | 'Immobilien'
  | 'Gesundheitswesen / Soziales'
  | 'Bildung / Forschung'
  | 'Öffentliche Verwaltung / Verwaltung'
  | 'Kultur / Sport / Freizeit'
  | 'Andere';

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
    | 'Hochschule (Bachelor / Master Doktor)';
  beruf?: 'Vollzeitangestellt' | 'Teilzeitangestellt' | 'Selbständig' | 'Rentner/Pensioniert' | 'Hausfrau/-mann' | 'Student/in' | 'Arbeitslos';
  sozialeKlasse?: 'Oberschicht' | 'Obere Mittelschicht' | 'Untere Mittelschicht' | 'Arbeiterklasse' | 'Unterschicht';
  politik: number;        // 1–10 (1=links, 10=rechts)
  entscheidungsstil: 'Fakten & Daten' | 'Eine Kombination aus beidem' | 'Bauchgefühl & Werte';
  kinder?: KinderStatus;
  informationsquellen?: Informationsquelle[];
  beruflichesUmfeld?: BeruflichesUmfeld;
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
