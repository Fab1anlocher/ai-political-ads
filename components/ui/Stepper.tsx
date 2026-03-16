'use client';

// Stepper-Komponente (+ / −) für Haushaltsgrösse

interface StepperProps {
  beschriftung: string;
  wert: number;
  min?: number;
  max?: number;
  onChange: (wert: number) => void;
  suffix?: string;
}

export default function Stepper({
  beschriftung,
  wert,
  min = 1,
  max = 6,
  onChange,
  suffix = 'Personen',
}: StepperProps) {
  function erhoehen() {
    if (wert < max) onChange(wert + 1);
  }

  function verringern() {
    if (wert > min) onChange(wert - 1);
  }

  const anzeige = wert >= max ? `${max}+` : String(wert);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-700">
        {beschriftung}
      </label>

      <div className="flex items-center gap-4">
        {/* Minus-Button */}
        <button
          type="button"
          onClick={verringern}
          disabled={wert <= min}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 text-xl font-light hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          aria-label="Verringern"
        >
          −
        </button>

        {/* Wertanzeige */}
        <div className="min-w-[80px] text-center">
          <span className="text-2xl font-semibold text-neutral-900">
            {anzeige}
          </span>
          {suffix && (
            <span className="ml-1.5 text-sm text-neutral-500">{suffix}</span>
          )}
        </div>

        {/* Plus-Button */}
        <button
          type="button"
          onClick={erhoehen}
          disabled={wert >= max}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 text-xl font-light hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          aria-label="Erhöhen"
        >
          +
        </button>
      </div>
    </div>
  );
}
