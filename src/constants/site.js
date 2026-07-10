import shelly from '../assets/img/17.avif';
import girlPasta from '../assets/img/16.avif';
import lasagna from '../assets/img/13.avif';
import alfredo from '../assets/img/12.avif';
import wine from '../assets/img/15.avif';
import ragu from '../assets/img/11.avif';
import dry from '../assets/img/dry.avif';
import shapes from '../assets/img/shapes.avif';
import quality from '../assets/img/quality.avif';
import oatTaglia from '../assets/img/oatTagliatelle.png';
import machine from '../assets/img/machine.avif';
import fresco from '../assets/img/hero.png';
export const SITE_CONFIG = {
  name: 'FrescoBello',
  tagline: 'Freshly Crafted. Professionally Trusted.',
  currency: 'Birr',
  currencySymbol: 'Br',
  taxRate: 0.15,
  shippingRate: 50,
  freeShippingThreshold: 2000,
  contact: {
    manager: 'Tadiyos Belete',
    phone: '+251 97 071 5463',
    hours: 'Monday-Friday 09:00 AM - 6:00 PM',
    email: 'customerservice@frescobello.it',
    location: 'Addis Abeba, Ethiopia',
  },
};

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop', hasSubmenu: true },
  { label: 'Our Method', path: '/our-method' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const HERO_SLIDES = [
  {
    image: fresco,
    name: 'FrescoBello',
    tagline: 'Freshly crafted and professionally trusted',
    description: 'FrescoBello produces premium fresh pasta in many shapes and styles.',
  },

];

export const WHY_CHOOSE_US = [
  { title: 'Premium Italian Technology', icon: 'Cog' },
  { title: 'Commercial Quality Production', icon: 'Factory' },
  { title: 'Fresh Ingredients', icon: 'Wheat' },
  { title: 'Consistent Quality', icon: 'BadgeCheck' },
  { title: 'Trusted by Restaurants', icon: 'UtensilsCrossed' },
  { title: 'Perfect for Home Cooking', icon: 'Home' },
];

export const TRUSTED_BUSINESSES = [
  'Restaurants',
  'Hotels',
  'Supermarkets',
  'Catering Companies',
  'Airlines',
  'Educational & Public Institutions',
  'Retail Stores',
];

export const INSTAGRAM_IMAGES = [
  girlPasta,
  shelly,
  lasagna,
  alfredo,
  wine,
  ragu,
];

export const METHOD_PHASES = [
  {
    id: 1,
    title: 'Our Method',
    subtitle: 'Doing things right is a question of Method.',
    image: machine,
    description: 'Belay Shiberu, the founder of FrescoBello, recognized a challenge that many restaurants and food businesses face: producing fresh, high-quality pasta consistently and in large quantities without compromising quality. Driven by this vision, he invested in advanced Italian pasta-making technology, a professional Domino pasta machine capable of producing a wide variety of fresh pasta efficiently and at commercial scale.',
  },

 {
    id: 2,
    title: 'Ingredient Selection',
    subtitle: 'The foundation of quality',
    image: 'https://media.base44.com/images/public/6a4a0a966b597db054804af5/2ac1da504_generated_9252212d.png',
    description: 'Our pasta begins with carefully selected premium durum wheat known for its rich flavor and exceptional quality. Every ingredient is sourced from trusted suppliers who meet our strict quality standards. Each batch of raw materials undergoes thorough inspection before entering production. We prioritize freshness, consistency, and purity to ensure every product starts with the finest ingredients.',
  },
  {
    id: 3,
    title: 'Mixing & Dough Preparation',
    subtitle: 'Precision in every batch',
    image: 'https://media.base44.com/images/public/6a4a0a966b597db054804af5/64e9cbe81_generated_1b754b1b.png',
    description: 'The selected ingredients are carefully blended using precise measurements to create the perfect dough. Clean, filtered water is added to achieve the ideal texture and consistency. The dough is mixed under controlled conditions to ensure a smooth and uniform composition. Every batch is monitored throughout the mixing process to maintain consistent quality. This careful preparation ensures the pasta develops the strength and elasticity needed for excellent cooking performance.',
  },
  {
    id: 4,
    title: 'Shaping & Extrusion',
    subtitle: 'Crafting every shape',
    image: shapes,
    description: 'The prepared dough is shaped into a variety of pasta styles using precision-engineered molds and extrusion equipment. Whether producing spaghetti, penne, tagliatelle, or other varieties, each shape is crafted with consistency and care. The process preserves the pasta\'s ideal texture while maintaining its distinctive appearance.',
  },
  {
    id: 5,
    title: 'Controlled Drying',
    subtitle: 'Patience yields perfection',
    image: dry,
    description: 'Freshly shaped pasta is transferred to carefully controlled drying chambers where temperature and humidity are precisely regulated. This gradual drying process helps preserve the pasta\'s texture, flavor, and nutritional value. Proper drying also enhances the product\'s durability and shelf life without compromising quality. Every batch is monitored throughout the process to ensure consistent results. The outcome is premium pasta that cooks evenly and maintains its perfect bite.',
  }
,{
  
    id: 6,
    title: 'Quality Inspection',
    subtitle: 'No compromise on standards',
    image: quality,
    description: 'Every batch of pasta undergoes rigorous quality checks before it is approved for packaging. Our quality assurance team carefully examines the product for appearance, texture, consistency, and food safety standards.',
  },
  {
    id: 7,
    title: 'Packaging',
    subtitle: 'Protecting freshness',
    image: oatTaglia,
    description: 'Approved pasta is carefully weighed, sealed, and packaged using modern equipment that preserves freshness and product integrity. Every package is designed to protect the pasta during storage and transportation. Product labels provide clear information, including ingredients, nutritional values, and cooking instructions. Each package undergoes final verification to ensure accuracy and presentation.',
  },
  {
    id: 8,
    title: 'Distribution',
    subtitle: 'From our facility to your kitchen',
    image: 'https://media.base44.com/images/public/6a4a0a966b597db054804af5/8ec462e82_generated_f39bec10.png',
    description: 'Once packaged, our pasta is prepared for efficient distribution to customers and business partners. We supply supermarkets, restaurants, hotels, catering companies, airlines, educational & public institutions, retail stores, and other institutions with dependable service. Every order is handled with care to ensure products arrive fresh and on schedule. Our logistics network is designed to support reliable deliveries across all markets we serve. From our production facility to your kitchen or business, we are committed to delivering premium quality with every shipment.',
  }]
export const ABOUT_BG_IMAGE = 'https://media.base44.com/images/public/6a4a0a966b597db054804af5/e176be9c5_generated_1cd5889d.png';