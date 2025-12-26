// User Types
export interface UserCredentials {
  email: string;
  password?: string;
}

export interface UserRegistrationInfo extends UserCredentials {
  name: string;
}

// Product Types
export interface ProductReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id?: string;
  name: string;
  nameBn?: string;
  description: string;
  descriptionBn?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  categoryBn?: string;
  inStock: boolean;
  stock?: number;
  rating?: number;
  reviews?: number;
  reviewsList?: ProductReview[];
  isFeatured?: boolean;
  isFlashSale?: boolean;
  isTrending?: boolean;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Category Types
export interface Category {
  _id?: string;
  name: string;
  nameBn?: string;
  icon: string;
  slug: string;
  productCount?: number;
}

// Testimonial Types
export interface Testimonial {
  _id?: string;
  name: string;
  nameBn?: string;
  image?: string;
  rating: number;
  comment: string;
  commentBn?: string;
  location?: string;
  verified?: boolean;
}

// Newsletter Types
export interface NewsletterSubscriber {
  email: string;
  subscribedAt?: Date;
}

// Cart Item Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Order Types
export interface Order {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Filter Types
export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
}