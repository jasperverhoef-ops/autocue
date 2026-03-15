export const MAP_CENTER = {
  lat: 52.1326,
  lng: 5.2913,
  zoom: 7,
} as const;

export const SITE_METADATA = {
  name: 'NachoTest',
  tagline: 'De ultieme nacho-gids van Nederland',
  description: 'Vind de beste nacho restaurants in Nederland. Ontdek, beoordeel en deel de lekkerste nachos bij jou in de buurt.',
  url: 'https://nachotest.nl',
} as const;

export const SCORE_LABELS: Record<string, string> = {
  cheese: 'Kaas',
  crunch: 'Crunch',
  toppings: 'Toppings',
  sauce: 'Saus',
  portion: 'Portie',
  value: 'Prijs-kwaliteit',
};
