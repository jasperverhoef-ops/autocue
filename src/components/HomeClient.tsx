'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { RestaurantWithScore } from '@/types';
import { FOOD_IMAGES } from '@/data/images';
import SearchBar from '@/components/layout/SearchBar';
import CityFilter from '@/components/layout/CityFilter';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import FeaturedCard from '@/components/restaurant/FeaturedCard';
import PhotoStrip from '@/components/layout/PhotoStrip';

const NachoMap = dynamic(() => import('@/components/map/NachoMap'), { ssr: false });

interface Props {
  restaurants: RestaurantWithScore[];
  cities: string[];
}

export default function HomeClient({ restaurants, cities }: Props) {
  const [search, setSearch] = useState('');
  const [activeCity, setActiveCity] = useState('Alle');

  const top3 = useMemo(() => restaurants.slice(0, 3), [restaurants]);

  const filtered = useMemo(() => {
    return restaurants
      .filter((r) => activeCity === 'Alle' || r.city === activeCity)
      .filter(
        (r) =>
          !search ||
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.city.toLowerCase().includes(search.toLowerCase()),
      );
  }, [restaurants, activeCity, search]);

  return (
    <div
      className="min-h-screen"
      style={{ background: '#faf8f4', color: '#1c1917', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* HERO */}
      <section className="relative" style={{ height: 'min(65vh, 520px)' }}>
        <Image
          src={FOOD_IMAGES.hero}
          alt="Nachos"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(250,248,244,.6) 0%, rgba(250,248,244,.2) 30%, rgba(250,248,244,.4) 60%, #faf8f4 100%)',
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-amber-800 mb-5 shadow-sm"
            style={{
              background: 'rgba(255,255,255,.85)',
              border: '1px solid #e8e2d8',
              backdropFilter: 'blur(8px)',
            }}
          >
            🧀 {restaurants.length} restaurants · 8 steden · 40+ reviews
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-[1.1]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#1c1917',
              textShadow: '0 1px 20px rgba(250,248,244,.8)',
            }}
          >
            Vind de beste nacho&apos;s
            <br />
            <span className="text-amber-600">van Nederland</span>
          </h1>
          <p
            className="text-stone-600 text-base sm:text-lg max-w-md mx-auto mb-8"
            style={{ textShadow: '0 1px 8px rgba(250,248,244,.8)' }}
          >
            Ontdek, beoordeel en deel de lekkerste nachos bij jou in de buurt.
          </p>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </section>

      {/* TOP 3 */}
      <section id="top" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-3 mb-6">
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight text-stone-800"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            🏆 Top 3 Nacho&apos;s
          </h2>
          <div className="flex-1 h-px" style={{ background: '#e8e2d8' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3.map((r, i) => (
            <FeaturedCard key={r.id} restaurant={r} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* PHOTO STRIP */}
      <PhotoStrip />

      {/* MAP */}
      <section id="kaart" className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 pt-4">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight text-stone-800"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            📍 Nachokaart
          </h2>
          <div className="flex-1 h-px" style={{ background: '#e8e2d8' }} />
        </div>
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ height: 'min(50vh, 440px)', border: '1px solid #e8e2d8' }}
        >
          <NachoMap restaurants={filtered.length > 0 ? filtered : restaurants} />
        </div>
      </section>

      {/* ALL RESTAURANTS */}
      <section id="alle" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-3 mb-5">
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight text-stone-800"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Alle Restaurants
          </h2>
          <div className="flex-1 h-px" style={{ background: '#e8e2d8' }} />
          <span
            className="text-xs text-stone-400"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {filtered.length}
          </span>
        </div>

        <CityFilter cities={cities} activeCity={activeCity} onSelect={setActiveCity} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <span className="text-4xl mb-3 block">🌵</span>
            Geen restaurants gevonden. Probeer een andere zoekterm.
          </div>
        )}
      </section>
    </div>
  );
}
