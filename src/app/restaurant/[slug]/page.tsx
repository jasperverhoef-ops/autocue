import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllRestaurantsWithScores, getRestaurantBySlug } from '@/lib/data';
import { restaurants } from '@/data/restaurants';
import RestaurantDetail from '@/components/restaurant/RestaurantDetail';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaurant = getRestaurantBySlug(params.slug);
  if (!restaurant) return {};

  return {
    title: `${restaurant.name} - Nacho's in ${restaurant.city} | NachoTest`,
    description: `${restaurant.name} in ${restaurant.city} heeft een NachoScore van ${restaurant.nachoScore.toFixed(0)}/100 op basis van ${restaurant.reviewCount} reviews. ${restaurant.description}`,
    openGraph: {
      title: `${restaurant.name} | NachoTest`,
      description: restaurant.description,
      images: [{ url: restaurant.imageUrl }],
    },
  };
}

export default function RestaurantPage({ params }: Props) {
  const restaurant = getRestaurantBySlug(params.slug);
  if (!restaurant) notFound();

  const allRestaurants = getAllRestaurantsWithScores();
  const rank = allRestaurants.findIndex((r) => r.slug === params.slug) + 1;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address,
      addressLocality: restaurant.city,
      addressCountry: 'NL',
    },
    image: restaurant.imageUrl,
    description: restaurant.description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (restaurant.nachoScore / 10).toFixed(1),
      bestRating: '10',
      worstRating: '0',
      reviewCount: restaurant.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RestaurantDetail restaurant={restaurant} rank={rank} />
    </>
  );
}
