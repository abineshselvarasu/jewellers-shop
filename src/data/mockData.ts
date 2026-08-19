import { Product, BranchLocation, InstagramPost, GoldRate } from '../types';

export const GOLD_RATES: GoldRate[] = [
  {
    karat: '22 KT',
    ratePerGram: 7285,
    ratePerSovereign: 58280,
    change: -25,
    isUp: false,
    lastUpdated: 'Today, 10:30 AM IST'
  },
  {
    karat: '24 KT (Pure Gold)',
    ratePerGram: 7948,
    ratePerSovereign: 63584,
    change: -30,
    isUp: false,
    lastUpdated: 'Today, 10:30 AM IST'
  },
  {
    karat: '18 KT',
    ratePerGram: 5960,
    ratePerSovereign: 47680,
    change: +10,
    isUp: true,
    lastUpdated: 'Today, 10:30 AM IST'
  },
  {
    karat: 'Silver 925 (1g)',
    ratePerGram: 94.50,
    ratePerSovereign: 756,
    change: +0.50,
    isUp: true,
    lastUpdated: 'Today, 10:30 AM IST'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Enticing Petite Drop Earrings',
    category: 'gold',
    subCategory: 'Earrings',
    price: 26529,
    originalPrice: 28781,
    image: './images/jewelry_fa252d6c0216.jpg',
    secondaryImage: './images/jewelry_69ee78684cb4.jpg',
    purity: '22KT Gold',
    weight: '3.65 grams',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 128,
    description: 'Delicate tear-drop diamond and yellow gold cascading earrings designed for everyday understated royalty. BIS 916 hallmarked with laser precision finish.',
    tags: ['earrings', 'drop', 'gold', 'diamonds', 'bestseller']
  },
  {
    id: 'prod-2',
    name: 'Dainty Shimmer Ring',
    category: 'gold',
    subCategory: 'Rings',
    price: 40642,
    originalPrice: 42781,
    image: './images/Dainty Shimmer Ring.jpeg',
    secondaryImage: './images/jewelry_7734d898562f.jpg',
    purity: '22KT Gold',
    weight: '5.20 grams',
    badge: 'Trending',
    rating: 4.8,
    reviewsCount: 94,
    description: 'An ethereal diamond-embellished band that catches the light from every angle. Perfect for stackable combinations or as an elegant promise ring.',
    tags: ['ring', 'diamonds', 'dainty', 'gold']
  },
  {
    id: 'prod-3',
    name: 'Mystic Gold Hoop Earrings',
    category: 'gold',
    subCategory: 'Hoops',
    price: 58642,
    originalPrice: 60551,
    image: './images/Mystic Gold Hoop Earrings.jpeg',
    secondaryImage: './images/jewelry_fa252d6c0216.jpg',
    purity: '22KT Gold',
    weight: '7.85 grams',
    badge: 'Best Seller',
    rating: 5.0,
    reviewsCount: 210,
    description: 'Textured twist braided gold hoops hand-finished by master jewelers in Coimbatore. Comfortable secure snap clasp with brilliant shine.',
    tags: ['hoops', 'earrings', 'textured', 'statement']
  },
  {
    id: 'prod-4',
    name: 'Sculpted Gold Finger Ring',
    category: 'gold',
    subCategory: 'Rings',
    price: 44642,
    originalPrice: 48551,
    image: './images/Sculpted Gold Finger Ring .jpeg',
    secondaryImage: './images/jewelry_9ae95ee78101.jpg',
    purity: '22KT Gold',
    weight: '6.10 grams',
    badge: '10% OFF',
    rating: 4.7,
    reviewsCount: 86,
    description: 'Sculptural heritage filigree ring with central solitaire diamond centerpiece, showcasing centuries of traditional Tamil goldsmithing art.',
    tags: ['ring', 'filigree', 'solitaire', 'heritage']
  },
  {
    id: 'prod-5',
    name: 'Rings of Wonder 18KT Necklace',
    category: 'bridal',
    subCategory: 'Necklaces',
    price: 46589,
    originalPrice: 51200,
    image: './images/Rings of Wonder 18KT Necklace.jpeg',
    secondaryImage: './images/jewelry_236b9320d4de.jpg',
    purity: '18KT Gold',
    weight: '6.45 grams',
    badge: 'New',
    rating: 4.9,
    reviewsCount: 42,
    description: 'Interlocking circular motifs paved with luminous micro-diamonds suspended on a solid Venetian gold chain.',
    tags: ['necklace', 'pendant', 'diamonds', 'modern']
  },
  {
    id: 'prod-6',
    name: 'Handsome 18 Karat Gold Ring for Men',
    category: 'men',
    subCategory: 'Rings',
    price: 56529,
    originalPrice: 62000,
    image: './images/jewelry_0d8316524c7d.jpg',
    secondaryImage: './images/jewelry_9ae95ee78101.jpg',
    purity: '18KT Gold',
    weight: '8.10 grams',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 115,
    description: 'Bold geometric facets meet brushed satin gold finish. A commanding signet ring crafted for modern gentlemen.',
    tags: ['men', 'ring', 'signet', 'gold']
  },
  {
    id: 'prod-7',
    name: 'Elegant Criss Cross Gold Chain for Men',
    category: 'men',
    subCategory: 'Chains',
    price: 126529,
    originalPrice: 135000,
    image: './images/Criss-Cross 22KT Gold Chain.jpeg',
    secondaryImage: './images/jewelry_39088cb4d238.jpg',
    purity: '22KT Gold',
    weight: '16.80 grams',
    badge: 'Handcrafted',
    rating: 5.0,
    reviewsCount: 88,
    description: 'Hand-woven criss-cross 22 Karat solid gold chain offering immense tensile strength, supple drape, and an unmistakable regal presence.',
    tags: ['men', 'chain', '22kt', 'necklace', 'heavy']
  },
  {
    id: 'prod-m1',
    name: 'Imperial Sovereign Gold Kada for Men',
    category: 'men',
    subCategory: 'Kada',
    price: 185400,
    originalPrice: 198000,
    image: './images/jewelry_39088cb4d238.jpg',
    secondaryImage: './images/jewelry_9403aab1f250.jpg',
    purity: '22KT Gold',
    weight: '24.50 grams',
    badge: 'Trending',
    rating: 4.9,
    reviewsCount: 53,
    description: 'Heavy solid 22KT gold kada featuring dual textured finish with laser-engraved traditional motifs and secure hinge lock.',
    tags: ['men', 'kada', 'bracelet', '22kt', 'solid']
  },
  {
    id: 'prod-m2',
    name: 'Vanguard Diamond Signet Band',
    category: 'men',
    subCategory: 'Rings',
    price: 78900,
    originalPrice: 84500,
    image: './images/Vanguard Diamond Signet Band .jpeg',
    secondaryImage: './images/jewelry_0d8316524c7d.jpg',
    purity: '18KT Gold',
    weight: '9.40 grams',
    badge: 'Handcrafted',
    rating: 5.0,
    reviewsCount: 71,
    description: 'Channel-set natural certified brilliant diamonds encased in 18KT two-tone white and yellow gold masculine band.',
    tags: ['men', 'diamond', 'ring', 'signet']
  },
  {
    id: 'prod-m3',
    name: 'Italian Figaro Link 22KT Gold Chain',
    category: 'men',
    subCategory: 'Chains',
    price: 142000,
    originalPrice: 151000,
    image: './images/Italian Figaro Link 22KT Chain.jpeg',
    secondaryImage: './images/jewelry_39088cb4d238.jpg',
    purity: '22KT Gold',
    weight: '19.20 grams',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 92,
    description: 'Classic 3+1 Italian Figaro link design crafted in high-density 22KT hallmarked gold with durable lobster clasp.',
    tags: ['men', 'chain', 'figaro', '22kt']
  },
  {
    id: 'prod-m4',
    name: 'Nawabi Textured Sterling Silver Cuff',
    category: 'men',
    subCategory: 'Kada',
    price: 14500,
    originalPrice: 16800,
    image: './images/Sterling Silver Hammered Cuff.jpeg',
    secondaryImage: './images/jewelry_30014a844d7d.jpg',
    purity: '925 Silver',
    weight: '22.00 grams',
    badge: 'New',
    rating: 4.8,
    reviewsCount: 38,
    description: 'Solid 925 sterling silver hammered cuff bracelet with rhodium anti-tarnish coating. Understated luxury for daily wear.',
    tags: ['men', 'silver', 'cuff', 'bracelet']
  },
  {
    id: 'prod-8',
    name: 'Royal Mayura Bridal Choker & Haar Set',
    category: 'bridal',
    subCategory: 'Bridal Sets',
    price: 345000,
    originalPrice: 380000,
    image: './images/Royal Mayura Bridal Choker & Haar.jpeg',
    secondaryImage: './images/jewelry_3ed414afefb8.jpg',
    purity: '22KT Gold',
    weight: '48.50 grams',
    badge: 'Handcrafted',
    rating: 5.0,
    reviewsCount: 64,
    description: 'Magnificent temple-inspired peacock bridal haar studded with natural uncut Burmese rubies, emeralds, and dangling South Sea pearls.',
    tags: ['bridal', 'wedding', 'necklace', 'temple', 'haar']
  },
  {
    id: 'prod-9',
    name: 'Aquamarine Celestial Solitaire Ring',
    category: 'silver',
    subCategory: 'Rings',
    price: 18500,
    originalPrice: 21000,
    image: './images/Aquamarine Solitaire Ring.jpeg',
    secondaryImage: './images/jewelry_9ae95ee78101.jpg',
    purity: '925 Silver',
    weight: '4.80 grams',
    badge: 'Trending',
    rating: 4.8,
    reviewsCount: 77,
    description: '925 Sterling Silver crown prong set with genuine oval natural ocean-blue gemstone surrounded by sparkling cubic zirconia halo.',
    tags: ['silver', 'gemstone', 'ring', 'solitaire']
  }
];

export const MASTERPIECE_SLIDES = [
  {
    id: 'slide-1',
    title: 'The Royal Nizam Emerald Choker',
    subtitle: 'Heirloom Masterpiece in 22KT Gold',
    image: './images/jewelry_236b9320d4de.jpg'
  },
  {
    id: 'slide-2',
    title: 'Peacock Blossom Haar',
    subtitle: 'Intricate Nakshi Carving & Uncut Polki',
    image: './images/jewelry_3ed414afefb8.jpg'
  },
  {
    id: 'slide-3',
    title: 'Solitaire Eternal Bloom Ring',
    subtitle: 'Certified VVS1 Triple Excellent Diamond',
    image: './images/jewelry_9ae95ee78101.jpg'
  },
  {
    id: 'slide-4',
    title: 'Gajalakshmi Temple Kada',
    subtitle: 'Antique Red Patina Gold Bangle',
    image: './images/jewelry_39088cb4d238.jpg'
  },
  {
    id: 'slide-5',
    title: 'Aurelian Lotus Pendant',
    subtitle: 'Bespoke Rose & Yellow Gold Duo',
    image: './images/jewelry_7734d898562f.jpg'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: './images/jewelry_69ee78684cb4.jpg',
    likes: 1482,
    comments: 48,
    caption: 'Golden morning light on our signature handcrafted 22KT hoop earrings. A modern essential for every mood. ✨ #Gradiolex #GoldJewellery #Craftsmanship',
    tags: ['gold', 'dailywear', 'aesthetic']
  },
  {
    id: 'ig-2',
    image: './images/jewelry_fa252d6c0216.jpg',
    likes: 2190,
    comments: 63,
    caption: 'From our heritage atelier in Cross Cut Road: every curve of gold is shaped by veteran hands carrying 40 years of precision. 💫 #PureGold',
    tags: ['atelier', 'heritage', 'tamilnadu']
  },
  {
    id: 'ig-3',
    image: './images/jewelry_236b9320d4de.jpg',
    likes: 980,
    comments: 31,
    caption: 'Consulting custom wedding trousseaus over warm chai with our bridal bespoke stylists. Book your private appointment today.',
    tags: ['bridal', 'bespoke', 'trousseau']
  },
  {
    id: 'ig-4',
    image: './images/jewelry_9ae95ee78101.jpg',
    likes: 1650,
    comments: 55,
    caption: 'The Autumn Solitaire Collection is now live in both Coimbatore and Tirupur boutiques! Link in bio to preview full catalog. 💎',
    tags: ['solitaire', 'autumn', 'launch']
  },
  {
    id: 'ig-5',
    image: './images/jewelry_3ed414afefb8.jpg',
    likes: 2420,
    comments: 89,
    caption: 'Celebrate your unforgettable beginnings with timeless 18KT and 22KT gold bands that endure forever. ❤️ #GradiolexCouples',
    tags: ['wedding', 'love', 'eternity']
  }
];

export const BRANCHES: BranchLocation[] = [
  {
    city: 'Mayfair, London',
    title: 'Gradiolex Global Flagship & Haute Joaillerie Atelier',
    address: '42 Old Bond Street, Mayfair, London W1S 4QR, United Kingdom',
    landmark: 'Opposite Royal Arcade',
    phone: '+44 20 7946 0912',
    email: 'mayfair@gradiolexjewellers.com',
    timings: 'Mon - Sat: 10:00 AM - 7:00 PM | Sun: By Private Appointment',
    mapQuery: 'https://maps.google.com/?q=42+Old+Bond+Street+Mayfair+London'
  },
  {
    city: '5th Avenue, New York',
    title: 'Gradiolex Diamond Vault & Bridal Salon',
    address: '725 Fifth Avenue, Suite 1800, New York, NY 10022, United States',
    landmark: 'Between 56th & 57th Street',
    phone: '+1 (212) 555-0198',
    email: 'newyork@gradiolexjewellers.com',
    timings: 'Mon - Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 6:00 PM',
    mapQuery: 'https://maps.google.com/?q=725+Fifth+Avenue+New+York+NY'
  }
];
