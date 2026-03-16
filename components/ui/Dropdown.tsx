'use client';

// Dropdown-Komponente (searchable) im Apple-Stil

import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  beschriftung: string;
  optionen: string[];
  wert: string;
  onChange: (wert: string) => void;
  suchbar?: boolean;
  platzhalter?: string;
}

export default function Dropdown({
  beschriftung,
  optionen,
  wert,
  onChange,
  suchbar = false,
  platzhalter = 'Auswählen…',
}: DropdownProps) {
  const [offen, setOffen] = useState(false);
  const [suchtext, setSuchtext] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtert Optionen nach Suchtext
  const gefilterteOptionen = suchbar
    ? optionen.filter((opt) =>
        opt.toLowerCase().includes(suchtext.toLowerCase())
      )
    : optionen;

  // Schliesst Dropdown bei Klick ausserhalb
  useEffect(() => {
    function handleAusserhalb(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOffen(false);
        setSuchtext('');
      }
    }
    document.addEventListener('mousedown', handleAusserhalb);
    return () => document.removeEventListener('mousedown', handleAusserhalb);
  }, []);

  function auswaehlen(option: string) {
    onChange(option);
    setOffen(false);
    setSuchtext('');
  }

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label className="text-sm font-medium text-neutral-700">
        {beschriftung}
      </label>

      <div className="relative">
        {/* Auswahl-Button */}
        <button
          type="button"
          onClick={() => setOffen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-800 hover:bg-neutral-100 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          <span className={wert ? 'text-neutral-900' : 'text-neutral-400'}>
            {wert || platzhalter}
          </span>
          <svg
            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${offen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown-Liste */}
        {offen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
            {/* Suchfeld (optional) */}
            {suchbar && (
              <div className="p-2 border-b border-neutral-100">
                <input
                  type="text"
                  autoFocus
                  value={suchtext}
                  onChange={(e) => setSuchtext(e.target.value)}
                  placeholder="Suchen…"
                  className="w-full px-3 py-1.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                />
              </div>
            )}

            {/* Optionsliste */}
            <ul className="max-h-48 overflow-y-auto py-1">
              {gefilterteOptionen.length > 0 ? (
                gefilterteOptionen.map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => auswaehlen(opt)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${
                        wert === opt
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-800 hover:bg-neutral-50'
                      }`}
                    >
                      {opt}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-neutral-400">
                  Keine Treffer
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
