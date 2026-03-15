import { getAllRestaurantsWithScores, getCities } from '@/lib/data';
import HomeClient from '@/components/HomeClient';

export default function HomePage() {
  const restaurants = getAllRestaurantsWithScores();
  const cities = getCities();

  return <HomeClient restaurants={restaurants} cities={cities} />;
}
