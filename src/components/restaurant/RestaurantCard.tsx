'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { RestaurantWithScore } from '@/types';
import { formatPrice } from '@/lib/utils';
import NachoScoreBadge from './NachoScoreBadge';

interface Props {
  restaurant: RestaurantWithScore;
  index?: number;
}

function PriceRange({ level }: { level: number }) {
  return (
    <span className="text-xs tracking-wider">
      {[1, 2, 3].map((i) => (
        <span key={i} style={{ color: i <= level ? '#b45309' : '#e5e0d8' }}>
          €
        </span>
      ))}
    </span>
  );
}

export default function RestaurantCard({ restaurant: r, index = 0 }: Props) {
  const firstDish = r.dishes[0];

  return (
    <Link
      href={`/restaurant/${r.slug}`}
      className="group text-left rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white shadow-sm block"
      style={{
        border: '1px solid #ebe6dc',
        animationDelay: `${index * 60}ms`,
        animation: 'fadeUp .5s ease both',
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={r.imageUrl}
          alt={r.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <NachoScoreBadge score={r.nachoScore} size="sm" />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px]">
          <span className="text-white/90 font-medium bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
            {r.city}
          </span>
          <span className="text-white/70 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded">
            <PriceRange level={r.priceRange} />
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3
          className="font-semibold text-stone-800 text-[15px] mb-1 group-hover:text-amber-700 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {r.name}
        </h3>
        <p className="text-stone-400 text-xs leading-relaxed line-clamp-2 mb-3">
          {r.description}
        </p>
        {firstDish && (
          <div
            className="flex items-center gap-2.5 pt-3"
            style={{ borderTop: '1px solid #f0ece4' }}
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm shrink-0">
              <Image
                src={firstDish.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-stone-600 truncate">{firstDish.name}</div>
              <div
                className="text-xs font-mono text-amber-700 font-bold"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {formatPrice(firstDish.priceCents)}
              </div>
            </div>
            <span className="text-[10px] text-stone-400">{r.reviewCount} reviews</span>
          </div>
        )}
      </div>
    </Link>
  );
}
