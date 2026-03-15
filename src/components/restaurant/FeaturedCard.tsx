'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { RestaurantWithScore } from '@/types';
import NachoScoreBadge from './NachoScoreBadge';

interface Props {
  restaurant: RestaurantWithScore;
  rank: number;
}

export default function FeaturedCard({ restaurant: r, rank }: Props) {
  const firstDish = r.dishes[0];

  return (
    <Link
      href={`/restaurant/${r.slug}`}
      className="relative rounded-2xl overflow-hidden group cursor-pointer block shadow-lg hover:shadow-xl transition-shadow"
      style={{ height: rank === 1 ? 320 : 280 }}
    >
      <Image
        src={r.imageUrl}
        alt={r.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={rank === 1}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {rank === 1 ? (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-amber-600 shadow">
          🏆 #1 VAN NEDERLAND
        </div>
      ) : (
        <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-sm">
          #{rank}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          <div>
            <h3
              className="text-white font-bold text-base mb-0.5 drop-shadow-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {r.name}
            </h3>
            <p className="text-white/70 text-xs">
              {r.city}
              {firstDish ? ` · ${firstDish.name}` : ''}
            </p>
          </div>
          <NachoScoreBadge score={r.nachoScore} size="md" />
        </div>
      </div>
    </Link>
  );
}
