'use client';

// Segmented Control (Radiogruppe) im Apple-Stil

interface SegmentedControlProps {
  beschriftung: string;
  optionen: string[];
  wert: string;
  onChange: (wert: string) => void;
}

export default function SegmentedControl({
  beschriftung,
  optionen,
  wert,
  onChange,
}: SegmentedControlProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-700">
        {beschriftung}
      </label>

      <div className="flex bg-neutral-100 rounded-xl p-1 gap-1">
        {optionen.map((opt) => {
          const aktiv = wert === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                aktiv
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
