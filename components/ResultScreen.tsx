'use client';

// Screen 3 – Ergebnisanzeige mit Download-Funktion

import { motion } from 'framer-motion';
import Button from './ui/Button';

interface ErgebnisScreenProps {
  bildUrl: string | null;
  laedt: boolean;
  fehler: string | null;
  onNeueEingabe: () => void;
}

export default function ErgebnisScreen({
  bildUrl,
  laedt,
  fehler,
  onNeueEingabe,
}: ErgebnisScreenProps) {
  // Bild als Datei herunterladen
  function bildHerunterladen() {
    if (!bildUrl) return;

    const link = document.createElement('a');
    link.href = bildUrl;
    link.download = `politisches-werbebanner-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen px-6 py-16 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-lg flex flex-col items-center gap-8">
        {/* Überschrift */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 tracking-tight mb-2">
            {laedt ? 'Wird generiert…' : fehler ? 'Fehler aufgetreten' : 'Ihr Banner'}
          </h2>
          <p className="text-neutral-500 text-sm">
            {laedt
              ? 'Die KI erstellt Ihren personalisierten Werbebanner.'
              : fehler
              ? 'Bitte versuchen Sie es erneut.'
              : 'Ihr KI-generierter politischer Werbebanner ist bereit.'}
          </p>
        </div>

        {/* Ladeanimation */}
        {laedt && (
          <div className="w-full aspect-video max-w-2xl rounded-2xl bg-neutral-100 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-24 h-24 rounded-full bg-neutral-300"
            />
          </div>
        )}

        {/* Fehlermeldung */}
        {!laedt && fehler && (
          <div className="w-full p-5 rounded-2xl bg-red-50 border border-red-100 text-center">
            <p className="text-sm text-red-600 font-medium">{fehler}</p>
          </div>
        )}

        {/* Generiertes Bild */}
        {!laedt && !fehler && bildUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full aspect-video max-w-2xl rounded-2xl overflow-hidden shadow-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bildUrl}
              alt="Generierter politischer Werbebanner"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Aktionsbuttons */}
        {!laedt && (
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            {bildUrl && !fehler && (
              <Button onClick={bildHerunterladen}>
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Bild herunterladen
              </Button>
            )}

            <Button variante="sekundaer" onClick={onNeueEingabe}>
              Neue Eingabe
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
