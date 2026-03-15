'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { RestaurantWithScore } from '@/types';
import NachoScoreBadge from './NachoScoreBadge';
import ScoreBreakdown from './ScoreBreakdown';
import DishCard from './DishCard';
import ReviewCard from './ReviewCard';

interface Props {
  restaurant: RestaurantWithScore;
  rank: number;
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

export default function RestaurantDetail({ restaurant: r, rank }: Props) {
  const [galleryIdx, setGalleryIdx] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: '#faf8f4' }}>
      {/* Gallery */}
      <div className="relative max-w-3xl mx-auto">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={r.gallery[galleryIdx]}
            alt={r.name}
            fill
            className="object-cover transition-opacity duration-300"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #faf8f4 0%, transparent 40%, rgba(0,0,0,.2) 100%)',
          }}
        />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 shadow-sm transition-colors hover:text-amber-700"
          style={{ background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(8px)' }}
        >
          ← Alle restaurants
        </Link>

        {/* Rank badge */}
        {rank <= 3 && (
          <div className="absolute top-4 right-4">
            {rank === 1 ? (
              <div className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-amber-600 shadow">
                🏆 #1 VAN NEDERLAND
              </div>
            ) : (
              <div className="px-2 py-1 rounded-lg text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-sm">
                #{rank}
              </div>
            )}
          </div>
        )}

        {/* Gallery thumbnails */}
        {r.gallery.length > 1 && (
          <div className="absolute bottom-20 left-4 flex gap-2">
            {r.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setGalleryIdx(i)}
                className="w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shadow-sm relative"
                style={{
                  borderColor: i === galleryIdx ? '#b45309' : 'white',
                  opacity: i === galleryIdx ? 1 : 0.7,
                }}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="48px" />
              </button>
            ))}
          </div>
        )}

        {/* Title area */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <h1
                className="text-2xl font-bold text-stone-800"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {r.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                <span>
                  {r.address}, {r.city}
                </span>
                <span className="text-stone-300">·</span>
                <PriceRange level={r.priceRange} />
              </div>
            </div>
            <NachoScoreBadge score={r.nachoScore} size="lg" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-8 pt-6">
        {/* Description */}
        <p className="text-stone-500 text-sm leading-relaxed">{r.description}</p>

        {/* Score Breakdown */}
        <ScoreBreakdown scores={r.scoreBreakdown} />

        {/* Dishes */}
        {r.dishes.length > 0 && (
          <div>
            <h2 className="text-[10px] font-semibold text-stone-400 uppercase tracking-[.2em] mb-3">
              Nacho menu
            </h2>
            <div className="space-y-3">
              {r.dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {r.reviews.length > 0 && (
          <div>
            <h2 className="text-[10px] font-semibold text-stone-400 uppercase tracking-[.2em] mb-3">
              Reviews ({r.reviewCount})
            </h2>
            <div className="space-y-3">
              {r.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
