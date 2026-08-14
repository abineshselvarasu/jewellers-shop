export interface Product {
  id: string;
  name: string;
  category: 'gold' | 'silver' | 'bridal' | 'solitaire' | 'men' | 'gifts';
  subCategory?: string;
  price: number;
  originalPrice: number;
  image: string;
  secondaryImage?: string;
  purity: '22KT Gold' | '18KT Gold' | '925 Silver' | 'Platinum 950' | 'VVS Diamond';
  weight: string;
  badge?: 'Best Seller' | 'New' | '10% OFF' | 'Trending' | 'Handcrafted';
  rating: number;
  reviewsCount: number;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMetal?: string;
}

export interface GoldRate {
  karat: string;
  ratePerGram: number;
  ratePerSovereign: number; // 8 grams
  change: number; // e.g. -15 or +25
  isUp: boolean;
  lastUpdated: string;
}

export interface BranchLocation {
  city: string;
  title: string;
  address: string;
  landmark: string;
  phone: string;
  email: string;
  timings: string;
  mapQuery: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  tags: string[];
}
