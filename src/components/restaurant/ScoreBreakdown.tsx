'use client';

import { getScoreColor } from '@/lib/utils';
import { SCORE_LABELS } from '@/lib/constants';

interface Props {
  scores: {
    cheese: number;
    crunch: number;
    toppings: number;
    sauce: number;
    portion: number;
    value: number;
  };
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 10) * 100;
  const color = getScoreColor(value * 10);

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-28 text-right text-stone-500 shrink-0 text-xs">{label}</span>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: '#f0ece4' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="w-7 text-right font-mono text-xs font-bold"
        style={{ color, fontFamily: "'Space Mono', monospace" }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function ScoreBreakdown({ scores }: Props) {
  return (
    <div className="p-4 rounded-xl" style={{ background: '#f0ece4' }}>
      <h3 className="text-[10px] font-semibold text-stone-400 uppercase tracking-[.2em] mb-3">
        NachoScore breakdown
      </h3>
      <div className="space-y-2">
        <ScoreBar label={SCORE_LABELS.cheese} value={scores.cheese} />
        <ScoreBar label={SCORE_LABELS.crunch} value={scores.crunch} />
        <ScoreBar label={SCORE_LABELS.toppings} value={scores.toppings} />
        <ScoreBar label={SCORE_LABELS.sauce} value={scores.sauce} />
        <ScoreBar label={SCORE_LABELS.portion} value={scores.portion} />
        <ScoreBar label={SCORE_LABELS.value} value={scores.value} />
      </div>
    </div>
  );
}
