// TypeScript-Typen für Profildaten der Umfrage

export type Familienstand =
  | 'Verheiratet'
  | 'Verwitwet'
  | 'Geschieden'
  | 'Getrennt lebend'
  | 'Nie verheiratet';

export type KinderStatus =
  | 'Ja, im eigenen Haushalt lebend'
  | 'Ja, nicht im eigenen Haushalt lebend'
  | 'Nein, keine Kinder';

export type Informationsquelle =
  | 'Fernsehen'
  | 'Radio'
  | 'Zeitung (Druckversion)'
  | 'Zeitung (Online-Version)'
  | 'Zeitschrift (Druckversion)'
  | 'Zeitschrift (Online-Version)'
  | 'Internet-Blog'
  | 'Nachrichtenseite im Internet'
  | 'Sonstiges';

export type BeruflichesUmfeld =
  | 'Privatwirtschaft'
  | 'Öffentlicher Dienst / Verwaltung (Bund, Kanton, Gemeinde)'
  | 'Non-Profit-Organisation (NGO / Stiftung)'
  | 'Subventionierter Bereich (z.B. öffentlicher Verkehr, Spitäler)'
  | 'Selbstständig / eigenes Unternehmen'
  | 'Nicht erwerbstätig (Studium, Rente, Arbeitslosigkeit, Haushalt)';

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
  familienstand?: Familienstand;
  kinder?: KinderStatus;
  informationsquellen?: Informationsquelle[];
  informationsquellenSonstiges?: string;
  beruflichesUmfeld?: BeruflichesUmfeld;
}

// API-Antwort vom Route Handler
export interface GenerierungsAntwort {
  bildUrl?: string;      // URL oder Base64-Bild
  fehler?: string;
}

// Verfügbare Volksabstimmungen (erweiterbar)
export type AbstimmungsTyp = 'nachhaltigkeitsinitiative' | 'zivildienstgesetz';
