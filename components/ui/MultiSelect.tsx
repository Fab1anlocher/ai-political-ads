'use client';

// Multi-Select mit Checkboxen im Apple-Stil

interface MultiSelectProps {
  beschriftung: string;
  optionen: string[];
  werte: string[];
  onChange: (werte: string[]) => void;
  platzhalter?: string;
}

export default function MultiSelect({
  beschriftung,
  optionen,
  werte,
  onChange,
  platzhalter = 'Auswählen…',
}: MultiSelectProps) {
  function toggle(option: string) {
    const set = new Set(werte);
    if (set.has(option)) {
      set.delete(option);
    } else {
      set.add(option);
    }
    const sortiert = optionen.filter((opt) => set.has(opt));
    onChange(sortiert);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-700">
        {beschriftung}
      </label>

      <div className="flex flex-col gap-2">
        {werte.length === 0 && (
          <span className="text-sm text-neutral-400">{platzhalter}</span>
        )}
        {optionen.map((opt) => {
          const aktiv = werte.includes(opt);
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl border text-sm transition-colors duration-150 ${
                aktiv
                  ? 'border-neutral-900 bg-neutral-50 text-neutral-900'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-neutral-900"
                checked={aktiv}
                onChange={() => toggle(opt)}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
