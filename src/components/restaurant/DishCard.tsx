import Image from 'next/image';
import type { Dish } from '@/types';
import { formatPrice } from '@/lib/utils';

interface Props {
  dish: Dish;
}

export default function DishCard({ dish }: Props) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white shadow-sm border border-stone-100">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-stone-800 text-sm font-medium">{dish.name}</span>
            {dish.isVegetarian && (
              <span className="ml-1.5 text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                🌱
              </span>
            )}
          </div>
          <span
            className="font-mono text-amber-700 text-sm shrink-0 font-bold"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {formatPrice(dish.priceCents)}
          </span>
        </div>
        <p className="text-stone-400 text-xs mt-1 leading-relaxed">{dish.description}</p>
      </div>
    </div>
  );
}
