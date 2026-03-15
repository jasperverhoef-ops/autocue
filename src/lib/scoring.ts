import type { Review } from '@/types';

export const SCORE_WEIGHTS = {
  cheese: 0.25,
  crunch: 0.20,
  toppings: 0.20,
  sauce: 0.15,
  portion: 0.10,
  value: 0.10,
} as const;

export function calculateNachoScore(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const avg = (field: 'cheese' | 'crunch' | 'toppings' | 'sauce' | 'portion' | 'value') => {
    const key = `score${field.charAt(0).toUpperCase() + field.slice(1)}` as keyof Review;
    return reviews.reduce((sum, r) => sum + (r[key] as number), 0) / reviews.length;
  };

  return (
    Math.round(
      (avg('cheese') * SCORE_WEIGHTS.cheese +
        avg('crunch') * SCORE_WEIGHTS.crunch +
        avg('toppings') * SCORE_WEIGHTS.toppings +
        avg('sauce') * SCORE_WEIGHTS.sauce +
        avg('portion') * SCORE_WEIGHTS.portion +
        avg('value') * SCORE_WEIGHTS.value) *
        10 *
        10,
    ) / 10
  );
}

export function getScoreBreakdown(reviews: Review[]) {
  if (reviews.length === 0) {
    return { cheese: 0, crunch: 0, toppings: 0, sauce: 0, portion: 0, value: 0 };
  }
  const avg = (key: keyof Review) =>
    Math.round(
      (reviews.reduce((sum, r) => sum + (r[key] as number), 0) / reviews.length) * 10,
    ) / 10;

  return {
    cheese: avg('scoreCheese'),
    crunch: avg('scoreCrunch'),
    toppings: avg('scoreToppings'),
    sauce: avg('scoreSauce'),
    portion: avg('scorePortion'),
    value: avg('scoreValue'),
  };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#65a30d';
  if (score >= 40) return '#ea580c';
  return '#dc2626';
}

export function getScoreBg(score: number): string {
  if (score >= 80) return '#f0fdf4';
  if (score >= 60) return '#f7fee7';
  if (score >= 40) return '#fff7ed';
  return '#fef2f2';
}
