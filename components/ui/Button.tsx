'use client';

// Wiederverwendbarer Button-Komponente im Apple-Stil

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primaer' | 'sekundaer';
  laedt?: boolean;
}

export default function Button({
  children,
  variante = 'primaer',
  laedt = false,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const basisKlassen =
    'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-base transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantenKlassen =
    variante === 'primaer'
      ? 'bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:ring-neutral-900 disabled:bg-neutral-300'
      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus-visible:ring-neutral-400 disabled:bg-neutral-50 disabled:text-neutral-400';

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${basisKlassen} ${variantenKlassen} ${className}`}
      disabled={disabled || laedt}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {laedt ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Wird geladen…
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
