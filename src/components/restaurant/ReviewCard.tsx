import Image from 'next/image';
import type { Review } from '@/types';
import { getScoreColor, getScoreBg, relativeDate } from '@/lib/utils';
import { calculateNachoScore } from '@/lib/scoring';

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const score = Math.round(calculateNachoScore([review]));
  const color = getScoreColor(score);
  const bg = getScoreBg(score);

  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-stone-100">
      {review.imageUrl && (
        <div className="relative w-full h-32">
          <Image
            src={review.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
          />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: bg, color }}
            >
              {review.reviewerName.charAt(0)}
            </div>
            <div>
              <span className="text-stone-700 text-xs font-medium">{review.reviewerName}</span>
              <div className="text-[10px] text-stone-400">{relativeDate(review.createdAt)}</div>
            </div>
          </div>
          <span
            className="font-mono text-xs font-bold px-2 py-0.5 rounded"
            style={{ color, background: bg, fontFamily: "'Space Mono', monospace" }}
          >
            {score}
          </span>
        </div>
        <p className="text-stone-500 text-xs leading-relaxed">{review.comment}</p>
      </div>
    </div>
  );
}
