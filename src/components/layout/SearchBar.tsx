'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Zoek op stad of restaurant..."
        className="w-full h-12 pl-11 pr-4 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none transition-all focus:ring-2 focus:ring-amber-400/40 shadow-lg"
        style={{
          background: 'rgba(255,255,255,.9)',
          border: '1px solid #e8e2d8',
          backdropFilter: 'blur(12px)',
        }}
      />
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  );
}
