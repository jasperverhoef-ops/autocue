'use client';

import { getScoreColor, getScoreBg } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  score: number;
  size?: Size;
}

const SIZE_CONFIG: Record<Size, { width: number; height: number; scoreClass: string; labelClass: string }> = {
  sm: { width: 38, height: 38, scoreClass: 'text-xs', labelClass: 'text-[7px]' },
  md: { width: 50, height: 50, scoreClass: 'text-base', labelClass: 'text-[8px]' },
  lg: { width: 64, height: 64, scoreClass: 'text-xl', labelClass: 'text-[10px]' },
  xl: { width: 84, height: 84, scoreClass: 'text-2xl', labelClass: 'text-xs' },
};

export default function NachoScoreBadge({ score, size = 'md' }: Props) {
  const color = getScoreColor(score);
  const bg = getScoreBg(score);
  const config = SIZE_CONFIG[size];

  return (
    <div
      className="flex flex-col items-center justify-center rounded-full font-bold shadow-sm shrink-0"
      style={{
        width: config.width,
        height: config.height,
        background: bg,
        border: `2px solid ${color}30`,
        color,
      }}
    >
      <span
        className={`${config.scoreClass} leading-none`}
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {score.toFixed(0)}
      </span>
      <span className={`${config.labelClass} opacity-50 leading-none`}>/100</span>
    </div>
  );
}
