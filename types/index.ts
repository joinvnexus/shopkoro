// Product Types
export interface Product {
  _id?: string;
  name: string;
  nameBn?: string; // Bengali name
  description: string;
  descriptionBn?: string; // Bengali description
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

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

