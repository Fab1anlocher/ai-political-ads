'use client';

// Screen 1 – Willkommensseite mit Disclaimer

import { motion } from 'framer-motion';
import Button from './ui/Button';

interface WillkommensScreenProps {
  onWeiter: () => void;
}

export default function WillkommensScreen({ onWeiter }: WillkommensScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      {/* Badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-8 inline-block px-4 py-1.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-500 tracking-wide uppercase"
      >
        Bachelor Thesis · BFH
      </motion.span>

      {/* Haupttitel */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-4xl sm:text-5xl font-semibold text-neutral-900 leading-tight tracking-tight mb-6"
      >
        KI-politische
        <br />
        Werbebanner
      </motion.h1>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="max-w-md text-base text-neutral-500 leading-relaxed mb-12"
      >
        Dieses Tool ist ein Artefakt einer Bachelor-Thesis an der Berner
        Fachhochschule. Es generiert KI-basierte politische Werbebanner
        basierend auf demographischen Angaben. Keine Daten werden gespeichert.
      </motion.p>

      {/* Weiter-Button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <Button onClick={onWeiter}>
          Weiter
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </motion.div>
    </motion.div>
  );
}
