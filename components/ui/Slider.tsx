'use client';

// Slider-Komponente mit Wertanzeige im Apple-Stil

import { useRef, useState } from 'react';

interface SliderProps {
  beschriftung: string;
  min: number;
  max: number;
  wert: number;
  onChange: (wert: number) => void;
  linksBeschriftung?: string;
  rechtsBeschriftung?: string;
}

export default function Slider({
  beschriftung,
  min,
  max,
  wert,
  onChange,
  linksBeschriftung,
  rechtsBeschriftung,
}: SliderProps) {
  const [aktiv, setAktiv] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Prozentualer Fortschritt für den farbigen Track
  const fortschritt = ((wert - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label und aktueller Wert */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">
          {beschriftung}
        </label>
        <span
          className={`text-sm font-semibold px-2.5 py-0.5 rounded-full transition-colors duration-200 ${
            aktiv
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          {wert}
        </span>
      </div>

      {/* Slider-Element */}
      <div className="relative flex items-center h-6">
        {/* Hintergrund-Track */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
          {/* Aktiver Track (farbig) */}
          <div
            className="h-full bg-neutral-800 rounded-full transition-all duration-100"
            style={{ width: `${fortschritt}%` }}
          />
        </div>

        {/* Nativer Input */}
        <input
          ref={inputRef}
          type="range"
          min={min}
          max={max}
          value={wert}
          onChange={(e) => onChange(Number(e.target.value))}
          onFocus={() => setAktiv(true)}
          onBlur={() => setAktiv(false)}
          onMouseDown={() => setAktiv(true)}
          onMouseUp={() => setAktiv(false)}
          className="slider-input relative w-full h-6 appearance-none bg-transparent cursor-pointer focus:outline-none"
        />
      </div>

      {/* Endbezeichnungen */}
      {(linksBeschriftung || rechtsBeschriftung) && (
        <div className="flex justify-between">
          <span className="text-xs text-neutral-400">{linksBeschriftung}</span>
          <span className="text-xs text-neutral-400">{rechtsBeschriftung}</span>
        </div>
      )}
    </div>
  );
}
