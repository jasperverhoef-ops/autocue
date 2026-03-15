export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  priceRange: 1 | 2 | 3;
  website: string | null;
  phone: string | null;
  imageUrl: string;
  gallery: string[];
  description: string;
}

export interface Dish {
  id: number;
  restaurantSlug: string;
  name: string;
  description: string;
  priceCents: number;
  isVegetarian: boolean;
  imageUrl: string;
}

export interface Review {
  id: number;
  restaurantSlug: string;
  reviewerName: string;
  scoreCheese: number;
  scoreCrunch: number;
  scoreToppings: number;
  scoreSauce: number;
  scorePortion: number;
  scoreValue: number;
  comment: string;
  imageUrl: string | null;
  createdAt: string;
}

export interface RestaurantWithScore extends Restaurant {
  nachoScore: number;
  reviewCount: number;
  scoreBreakdown: {
    cheese: number;
    crunch: number;
    toppings: number;
    sauce: number;
    portion: number;
    value: number;
  };
  dishes: Dish[];
  reviews: Review[];
}
