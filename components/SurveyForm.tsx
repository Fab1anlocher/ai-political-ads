'use client';

// Screen 2 – Umfrageformular mit allen Profilfeldern

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfilDaten, AbstimmungsTyp } from '@/lib/types';
import Slider from './ui/Slider';
import Dropdown from './ui/Dropdown';
import SegmentedControl from './ui/SegmentedControl';
import Stepper from './ui/Stepper';
import Button from './ui/Button';


const BILDUNGSOPTIONEN = [
  'Obligatorische Schule',
  'Berufslehre',
  'Matura',
  'Bachelor',
  'Master/Doktorat',
];

const BERUFSOPTIONEN = [
  'Angestellt',
  'Selbständig',
  'Arbeitslos',
  'Rentner/in',
  'Student/in',
];

// Standardwerte für das Formular
const STANDARD_PROFIL: ProfilDaten = {
  alter: 35,
  geschlecht: 'Männlich',
  wohnumgebung: 'Stadt',
  bildung: 'Bachelor',
  beruf: 'Angestellt',
  haushalt: 2,
  politik: 5,
  entscheidungsstil: 5,
  risikobereitschaft: 5,
};

interface UmfrageFormularProps {
  onGenerieren: (profil: ProfilDaten) => void;
  laedt: boolean;
  abstimmung: AbstimmungsTyp;
  onAbstimmungWechseln: (wert: AbstimmungsTyp) => void;
}

export default function UmfrageFormular({ onGenerieren, laedt, abstimmung, onAbstimmungWechseln }: UmfrageFormularProps) {
  const [profil, setProfil] = useState<ProfilDaten>(STANDARD_PROFIL);

  // Hilfsfunktion zum Aktualisieren eines einzelnen Felds
  function feldAktualisieren<K extends keyof ProfilDaten>(
    feld: K,
    wert: ProfilDaten[K]
  ) {
    setProfil((prev) => ({ ...prev, [feld]: wert }));
  }

  function absenden(e: React.FormEvent) {
    e.preventDefault();
    onGenerieren(profil);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen px-6 py-16 flex flex-col items-center"
    >
      <div className="w-full max-w-lg">
        {/* Überschrift */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight mb-2">
            Ihr Profil
          </h2>
          <p className="text-neutral-500 text-sm">
            Diese Angaben fliessen in die Werbebanner-Generierung ein.
          </p>
        </div>

        <form onSubmit={absenden} className="flex flex-col gap-8">
          {/* Abstimmung wählen */}
          <SegmentedControl
            beschriftung="Abstimmung"
            optionen={['Nachhaltigkeitsinitiative', 'Zivildienstgesetz']}
            wert={abstimmung === 'nachhaltigkeitsinitiative' ? 'Nachhaltigkeitsinitiative' : 'Zivildienstgesetz'}
            onChange={(v) =>
              onAbstimmungWechseln(
                v === 'Zivildienstgesetz' ? 'zivildienstgesetz' : 'nachhaltigkeitsinitiative'
              )
            }
          />
          {/* Alter */}
          <Slider
            beschriftung="Alter"
            min={16}
            max={99}
            wert={profil.alter}
            onChange={(v) => feldAktualisieren('alter', v)}
          />

          {/* Geschlecht */}
          <SegmentedControl
            beschriftung="Geschlecht"
            optionen={['Männlich', 'Weiblich', 'Divers']}
            wert={profil.geschlecht}
            onChange={(v) =>
              feldAktualisieren(
                'geschlecht',
                v as ProfilDaten['geschlecht']
              )
            }
          />

          {/* Wohnumgebung */}
          <SegmentedControl
            beschriftung="Wohnumgebung"
            optionen={['Stadt', 'Agglomeration', 'Land']}
            wert={profil.wohnumgebung}
            onChange={(v) =>
              feldAktualisieren('wohnumgebung', v as ProfilDaten['wohnumgebung'])
            }
          />

          {/* Bildungsstand */}
          <Dropdown
            beschriftung="Bildungsstand"
            optionen={BILDUNGSOPTIONEN}
            wert={profil.bildung}
            onChange={(v) =>
              feldAktualisieren('bildung', v as ProfilDaten['bildung'])
            }
          />

          {/* Berufsstatus */}
          <Dropdown
            beschriftung="Berufsstatus"
            optionen={BERUFSOPTIONEN}
            wert={profil.beruf}
            onChange={(v) =>
              feldAktualisieren('beruf', v as ProfilDaten['beruf'])
            }
          />

          {/* Haushaltsgrösse */}
          <Stepper
            beschriftung="Haushaltsgrösse"
            wert={profil.haushalt}
            min={1}
            max={6}
            onChange={(v) => feldAktualisieren('haushalt', v)}
          />

          {/* Trennlinie */}
          <div className="border-t border-neutral-100 pt-2">
            <p className="text-xs text-neutral-400 mb-6">
              Psychographisches Profil (Skala 1–10)
            </p>

            {/* Politische Richtung */}
            <div className="flex flex-col gap-8">
              <Slider
                beschriftung="Politische Richtung"
                min={1}
                max={10}
                wert={profil.politik}
                onChange={(v) => feldAktualisieren('politik', v)}
                linksBeschriftung="Sehr links"
                rechtsBeschriftung="Sehr rechts"
              />

              {/* Entscheidungsstil */}
              <Slider
                beschriftung="Entscheidungsstil"
                min={1}
                max={10}
                wert={profil.entscheidungsstil}
                onChange={(v) => feldAktualisieren('entscheidungsstil', v)}
                linksBeschriftung="Emotional"
                rechtsBeschriftung="Rational"
              />

              {/* Risikobereitschaft */}
              <Slider
                beschriftung="Risikobereitschaft"
                min={1}
                max={10}
                wert={profil.risikobereitschaft}
                onChange={(v) => feldAktualisieren('risikobereitschaft', v)}
                linksBeschriftung="Sicherheitsorientiert"
                rechtsBeschriftung="Risikofreudig"
              />
            </div>
          </div>

          {/* Absenden */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              laedt={laedt}
              className="w-full sm:w-auto min-w-[220px]"
            >
              Banner generieren
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
