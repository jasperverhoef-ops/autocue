export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2).replace('.', ',')}`;
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

export function relativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date('2026-03-15');
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Vandaag';
  if (diffDays === 1) return 'Gisteren';
  if (diffDays < 7) return `${diffDays} dagen geleden`;
  if (diffDays < 14) return '1 week geleden';
  if (diffDays < 21) return '2 weken geleden';
  if (diffDays < 30) return '3 weken geleden';
  if (diffDays < 60) return '1 maand geleden';
  if (diffDays < 90) return '2 maanden geleden';
  return '3+ maanden geleden';
}
