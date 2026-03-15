import { restaurants } from '@/data/restaurants';
import { dishes } from '@/data/dishes';
import { reviews } from '@/data/reviews';
import { calculateNachoScore, getScoreBreakdown } from './scoring';
import type { RestaurantWithScore } from '@/types';

export function getAllRestaurantsWithScores(): RestaurantWithScore[] {
  return restaurants
    .map((restaurant) => {
      const restaurantDishes = dishes.filter((d) => d.restaurantSlug === restaurant.slug);
      const restaurantReviews = reviews.filter((r) => r.restaurantSlug === restaurant.slug);
      const nachoScore = calculateNachoScore(restaurantReviews);
      const scoreBreakdown = getScoreBreakdown(restaurantReviews);

      return {
        ...restaurant,
        nachoScore,
        reviewCount: restaurantReviews.length,
        scoreBreakdown,
        dishes: restaurantDishes,
        reviews: restaurantReviews,
      };
    })
    .sort((a, b) => b.nachoScore - a.nachoScore);
}

export function getRestaurantBySlug(slug: string): RestaurantWithScore | null {
  const restaurant = restaurants.find((r) => r.slug === slug);
  if (!restaurant) return null;

  const restaurantDishes = dishes.filter((d) => d.restaurantSlug === slug);
  const restaurantReviews = reviews.filter((r) => r.restaurantSlug === slug);
  const nachoScore = calculateNachoScore(restaurantReviews);
  const scoreBreakdown = getScoreBreakdown(restaurantReviews);

  return {
    ...restaurant,
    nachoScore,
    reviewCount: restaurantReviews.length,
    scoreBreakdown,
    dishes: restaurantDishes,
    reviews: restaurantReviews,
  };
}

export function getCities(): string[] {
  return ['Alle', ...Array.from(new Set(restaurants.map((r) => r.city)))];
}

export function getRestaurantsByCity(city: string): RestaurantWithScore[] {
  const all = getAllRestaurantsWithScores();
  if (city === 'Alle') return all;
  return all.filter((r) => r.city === city);
}

export { restaurants, dishes, reviews };
