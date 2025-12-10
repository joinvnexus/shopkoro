import axios, { AxiosResponse } from 'axios';
import {
  ApiResponse,
  Product,
  Testimonial,
  UserCredentials,
  UserRegistrationInfo,
} from '@/types';

const resolveApiBaseUrl = () => {
  let envUrl = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  if (envUrl && envUrl.includes(':3000')) {
    console.warn(
      '⚠️ NEXT_PUBLIC_API_URL is set to port 3000, but backend runs on port 5000. Using port 5000 instead.'
    );
    envUrl = envUrl.replace(':3000', ':5000');
  }

  return envUrl || 'http://localhost:5000/api';
};

const API_BASE_URL = resolveApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Include auth token when available.
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state.userInfo?.token) {
          config.headers['Authorization'] = `Bearer ${state.userInfo.token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const safeRequest = async <T>(
  request: () => Promise<AxiosResponse<ApiResponse<T>>>,
  fallback: T,
  label: string
): Promise<T> => {
  try {
    const response = await request();
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${label}:`, error);
    return fallback;
  }
};

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

export const productApi = {
  getAll: (): Promise<Product[]> =>
    safeRequest(() => api.get('/products'), [], 'products'),

  getFeatured: (): Promise<Product[]> =>
    safeRequest(() => api.get('/products/featured'), [], 'featured products'),

  getFlashSale: (): Promise<Product[]> =>
    safeRequest(
      () => api.get('/products/flash-sale'),
      [],
      'flash sale products'
    ),

  getTrending: (): Promise<Product[]> =>
    safeRequest(() => api.get('/products/trending'), [], 'trending products'),

  getById: (id: string): Promise<Product | null> =>
    safeRequest(
      () => api.get(`/products/${id}`),
      null,
      `product details for ${id}`
    ),
};

export const testimonialApi = {
  getAll: (): Promise<Testimonial[]> =>
    safeRequest(() => api.get('/testimonials'), [], 'testimonials'),
};

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
