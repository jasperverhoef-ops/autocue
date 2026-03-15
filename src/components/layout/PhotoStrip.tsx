import Image from 'next/image';
import { FOOD_IMAGES } from '@/data/images';

const STRIP_IMAGES = [
  FOOD_IMAGES.nachos1,
  FOOD_IMAGES.nachos2,
  FOOD_IMAGES.cheese,
  FOOD_IMAGES.guac,
  FOOD_IMAGES.nachos3,
  FOOD_IMAGES.platter,
  FOOD_IMAGES.salsa,
  FOOD_IMAGES.nachos5,
  FOOD_IMAGES.margarita,
  FOOD_IMAGES.chips,
];

export default function PhotoStrip() {
  return (
    <section className="overflow-hidden py-4">
      <div className="flex gap-3" style={{ width: 'max-content' }}>
        {STRIP_IMAGES.map((img, i) => (
          <div
            key={i}
            className="w-44 h-28 rounded-xl overflow-hidden shrink-0 shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-300 relative"
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="176px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
