'use client';

// Haupt-App mit Step-Navigation (Single-Page-App mit 3 Screens)

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProfilDaten, GenerierungsAntwort, AbstimmungsTyp } from '@/lib/types';
import WillkommensScreen from '@/components/WelcomeScreen';
import UmfrageFormular from '@/components/SurveyForm';
import ErgebnisScreen from '@/components/ResultScreen';

// App-Schritte
type Schritt = 'willkommen' | 'umfrage' | 'ergebnis';

export default function Home() {
  const [schritt, setSchritt] = useState<Schritt>('willkommen');
  const [bildUrl, setBildUrl] = useState<string | null>(null);
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [abstimmung, setAbstimmung] = useState<AbstimmungsTyp>('nachhaltigkeitsinitiative');

  // Banner-Generierung via API-Route
  async function bannerGenerieren(profil: ProfilDaten) {
    setLaedt(true);
    setFehler(null);
    setBildUrl(null);
    setSchritt('ergebnis');

    try {
      const antwort = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profil, abstimmung }),
      });

      const daten: GenerierungsAntwort = await antwort.json();

      if (!antwort.ok || daten.fehler) {
        setFehler(
          daten.fehler ?? 'Die Bildgenerierung ist fehlgeschlagen. Bitte erneut versuchen.'
        );
      } else {
        setBildUrl(daten.bildUrl ?? null);
      }
    } catch {
      setFehler(
        'Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.'
      );
    } finally {
      setLaedt(false);
    }
  }

  // Zurück zum Anfang
  function neueEingabe() {
    setBildUrl(null);
    setFehler(null);
    setSchritt('umfrage');
  }

  return (
    <main className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {schritt === 'willkommen' && (
          <WillkommensScreen
            key="willkommen"
            onWeiter={() => setSchritt('umfrage')}
          />
        )}

        {schritt === 'umfrage' && (
          <UmfrageFormular
            key="umfrage"
            onGenerieren={bannerGenerieren}
            laedt={laedt}
            abstimmung={abstimmung}
            onAbstimmungWechseln={setAbstimmung}
          />
        )}

        {schritt === 'ergebnis' && (
          <ErgebnisScreen
            key="ergebnis"
            bildUrl={bildUrl}
            laedt={laedt}
            fehler={fehler}
            onNeueEingabe={neueEingabe}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
