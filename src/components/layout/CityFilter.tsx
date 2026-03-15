'use client';

interface Props {
  cities: string[];
  activeCity: string;
  onSelect: (city: string) => void;
}

export default function CityFilter({ cities, activeCity, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-6" style={{ scrollbarWidth: 'none' }}>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm"
          style={{
            background: activeCity === city ? '#b45309' : 'white',
            color: activeCity === city ? 'white' : '#78716c',
            border: `1px solid ${activeCity === city ? '#b45309' : '#e8e2d8'}`,
          }}
        >
          {city}
        </button>
      ))}
    </div>
  );
}
