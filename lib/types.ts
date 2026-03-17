// TypeScript-Typen für Profildaten der Umfrage

export interface ProfilDaten {
  alter: number;
  geschlecht: 'Männlich' | 'Weiblich' | 'Divers';
  zivilstand: 'Ledig' | 'Verheiratet' | 'Geschieden' | 'Verwitwet';
  kanton: string;
  wohnumgebung: 'Stadt' | 'Land' | 'Agglomeration';
  bildung: 'Obligatorische Schule' | 'Berufslehre' | 'Matura' | 'Bachelor' | 'Master/Doktorat';
  beruf: 'Angestellt' | 'Selbständig' | 'Arbeitslos' | 'Rentner/in' | 'Student/in';
  haushalt: number;
  politik: number;        // 1–10 (1=links, 10=rechts)
  entscheidungsstil: number; // 1–10 (1=emotional, 10=rational)
  risikobereitschaft: number; // 1–10 (1=sicherheitsorientiert, 10=risikofreudig)
}

// API-Antwort vom Route Handler
export interface GenerierungsAntwort {
  bildUrl?: string;      // URL oder Base64-Bild
  fehler?: string;
}

// Verfügbare Volksabstimmungen (erweiterbar)
export type AbstimmungsTyp = 'nachhaltigkeitsinitiative' | 'zivildienstgesetz';
