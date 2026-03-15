import type { Dish } from '@/types';
import { FOOD_IMAGES } from './images';

export const dishes: Dish[] = [
  // Nachos Amsterdam
  {
    id: 1,
    restaurantSlug: 'nachos-amsterdam',
    name: 'The Original Premium Nachos',
    description: 'Huisgemaakte tortillachips, holy guacamole, salsa en signature ingredients.',
    priceCents: 1495,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos1,
  },
  {
    id: 2,
    restaurantSlug: 'nachos-amsterdam',
    name: 'Premium Nachos Veggie',
    description: 'Dezelfde basis, volledig plantaardig met verse guacamole.',
    priceCents: 1395,
    isVegetarian: true,
    imageUrl: FOOD_IMAGES.guac,
  },
  // Cannibale Royale
  {
    id: 3,
    restaurantSlug: 'cannibale-royale',
    name: 'Loaded Nachos',
    description: 'Verse nachos met pico de gallo, koriander, jalapeños, kidneybonen en guacamole.',
    priceCents: 1450,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos2,
  },
  {
    id: 4,
    restaurantSlug: 'cannibale-royale',
    name: 'Veggie Nachos',
    description: 'Met pico de gallo, kaas en crème fraîche. Geserveerd met guacamole.',
    priceCents: 1350,
    isVegetarian: true,
    imageUrl: FOOD_IMAGES.chips,
  },
  // Los Pilones
  {
    id: 5,
    restaurantSlug: 'los-pilones',
    name: 'Nachos Pilones',
    description: 'Huisgemaakte tortillachips met kaas, frijoles, jalapeños en drie salsas.',
    priceCents: 1295,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos3,
  },
  {
    id: 6,
    restaurantSlug: 'los-pilones',
    name: 'Nachos con Pollo',
    description: 'Met gegrilde kip, guacamole, pico de gallo en chipotle crema.',
    priceCents: 1495,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos4,
  },
  // Sound & Soul
  {
    id: 7,
    restaurantSlug: 'sound-and-soul',
    name: 'Macho Nacho',
    description: 'Winnaar! Royale portie met guacamole, pico de gallo, crème fraîche, sriracha en jalapeños.',
    priceCents: 1395,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos5,
  },
  // Parakeet
  {
    id: 8,
    restaurantSlug: 'parakeet',
    name: 'Parakeet Loaded Nachos',
    description: 'Tortillachips van lokaal meel, pulled chicken, avocado en jalapeño.',
    priceCents: 1395,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos4,
  },
  // Alfredo's
  {
    id: 9,
    restaurantSlug: 'alfredos-taqueria',
    name: 'Nachos and Dips',
    description: 'Huisgemaakte chips met guacamole, salsa roja en frijoles met queso fresco.',
    priceCents: 1200,
    isVegetarian: true,
    imageUrl: FOOD_IMAGES.guac,
  },
  // Popocatepetl
  {
    id: 10,
    restaurantSlug: 'popocatepetl',
    name: 'Nachos Grande',
    description: 'Grote schaal met guacamole, zure room, jalapeños en gesmolten kaas.',
    priceCents: 1350,
    isVegetarian: true,
    imageUrl: FOOD_IMAGES.nachos6,
  },
  // Cantina Mexicana
  {
    id: 11,
    restaurantSlug: 'cantina-mexicana',
    name: 'Nachos Pequeños',
    description: 'Portie nachos met kaas, jalapeño en salsa. Perfect als starter.',
    priceCents: 895,
    isVegetarian: true,
    imageUrl: FOOD_IMAGES.chips,
  },
  // Bite Club
  {
    id: 12,
    restaurantSlug: 'bite-club',
    name: 'Bite Club Nachos',
    description: 'Huisgemaakte nachos met creatieve toppings van het seizoen.',
    priceCents: 1195,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos2,
  },
  // Poco Loco
  {
    id: 13,
    restaurantSlug: 'poco-loco',
    name: 'Nachos Loco',
    description: 'Grote schotel met gehakt, kaas, guacamole, zure room en pico de gallo.',
    priceCents: 1395,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.nachos6,
  },
  // Gys Utrecht
  {
    id: 14,
    restaurantSlug: 'gys-utrecht',
    name: 'Gys Nachos',
    description: 'Huisgemaakte chips met gesmolten kaas, jalapeños, guacamole en pico de gallo.',
    priceCents: 1295,
    isVegetarian: true,
    imageUrl: FOOD_IMAGES.nachos2,
  },
  // Zuidersterren
  {
    id: 15,
    restaurantSlug: 'zuidersterren',
    name: 'Loaded Nachos',
    description: 'Tortillachips met kaas, jalapeño, pulled pork en huisgemaakte salsa.',
    priceCents: 1195,
    isVegetarian: false,
    imageUrl: FOOD_IMAGES.platter,
  },
];
