import axios from 'axios';
import { Product, Testimonial, ApiResponse, UserCredentials, UserRegistrationInfo, } from '@/types';
import useAuthStore from '@/stores/authStore';

// Backend API base URL - Update this with your backend URL
// Fix: If env var is set to port 3000 (wrong), use port 5000 instead
let envUrl = process.env.NEXT_PUBLIC_API_URL;
if (envUrl && envUrl.includes(':3000')) {
  console.warn(
    '⚠️ NEXT_PUBLIC_API_URL is set to port 3000, but backend runs on port 5000. Using port 5000 instead.'
  );
  envUrl = envUrl.replace(':3000', ':5000');
}

const API_BASE_URL = envUrl || 'http://localhost:5000/api';

// Log the API URL for debugging (remove in production)
if (typeof window !== 'undefined') {
  console.log('API Base URL:', API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state.userInfo && state.userInfo.token) {
          config.headers['Authorization'] = `Bearer ${state.userInfo.token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (credentials: UserCredentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },
  register: async (userInfo: UserRegistrationInfo) => {
    const { data } = await api.post('/auth/register', userInfo);
    return data;
  },
};

export const userApi = {
  getProfile: async () => {
    const { data } = await api.get('/users/profile');
    return data;
  },
};

// Product API functions
export const productApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>('/products');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get featured products
  getFeatured: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>(
        '/products/featured'
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  // Get flash sale products
  getFlashSale: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>(
        '/products/flash-sale'
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching flash sale products:', error);
      return [];
    }
  },

  // Get trending products
  getTrending: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>(
        '/products/trending'
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching trending products:', error);
      return [];
    }
  },

  // Get product by ID
  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },
};

// Testimonial API functions
export const testimonialApi = {
  getAll: async (): Promise<Testimonial[]> => {
    try {
      const response =
        await api.get<ApiResponse<Testimonial[]>>('/testimonials');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },
};

// Cart API functions
export const cartApi = {
  getCart: async () => {
    const { data } = await api.get('/cart');
    return data;
  },
  addToCart: async (productId: string, quantity = 1) => {
    const { data } = await api.post('/cart', { productId, quantity });
    return data;
  },
  updateItem: async (productId: string, quantity: number) => {
    const { data } = await api.put('/cart/item', { productId, quantity });
    return data;
  },
  removeItem: async (productId: string) => {
    const { data } = await api.delete(`/cart/item/${productId}`);
    return data;
  },
  clear: async () => {
    const { data } = await api.delete('/cart');
    return data;
  },
};

export default api;


