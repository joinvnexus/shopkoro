// ./lib/api.ts

import axios, { AxiosResponse } from "axios";
import {
  ApiResponse,
  ApiErrorCode,
  ApiErrorPayload,
  Category,
  Product,
  ProductReview,
  Testimonial,
  UserCredentials,
  UserRegistrationInfo,
} from "@/types";

export class ApiClientError extends Error {
  code: ApiErrorCode;
  status?: number;
  details?: unknown;

  constructor(params: {
    message: string;
    code: ApiErrorCode;
    status?: number;
    details?: unknown;
  }) {
    super(params.message);
    this.name = "ApiClientError";
    this.code = params.code;
    this.status = params.status;
    this.details = params.details;
  }
}

export const normalizeAxiosError = (error: any, fallbackLabel: string) => {
  const status = error?.response?.status as number | undefined;
  const data = error?.response?.data as
    | {
        message?: string;
        error?: ApiErrorPayload;
      }
    | undefined;

  if (!status) {
    return new ApiClientError({
      message: "Network error",
      code: "NETWORK_ERROR",
      details: { label: fallbackLabel },
    });
  }

  const payload = data?.error;
  if (payload?.code) {
    return new ApiClientError({
      message: payload.message || data?.message || "Request failed",
      code: payload.code,
      status,
      details: payload.details,
    });
  }

  const code: ApiErrorCode =
    status === 400
      ? "VALIDATION_ERROR"
      : status === 401
        ? "UNAUTHORIZED"
        : status === 403
          ? "FORBIDDEN"
          : status === 404
            ? "NOT_FOUND"
            : status === 409
              ? "CONFLICT"
              : status === 429
                ? "RATE_LIMITED"
                : status >= 500
                  ? "INTERNAL_SERVER_ERROR"
                  : "UNKNOWN_ERROR";

  return new ApiClientError({
    message: data?.message || "Request failed",
    code,
    status,
  });
};

const resolveApiBaseUrl = () => {
  // Always use the environment variable if available
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Safety check for development environment inconsistencies
  if (envUrl && envUrl.includes(":3000")) {
    console.warn(
      "⚠️ NEXT_PUBLIC_API_URL is set to port 3000, but backend runs on port 5000. Using port 5000 instead."
    );
    return envUrl.replace(":3000", ":5000");
  }
  
  // For production, NEVER fallback to localhost
  if (process.env.NODE_ENV === 'production') {
    if (!envUrl) {
      throw new Error('NEXT_PUBLIC_API_URL is required in production environment');
    }
    return envUrl;
  }
  
  // Development fallback
  return envUrl || "http://localhost:5000/api";
};

const API_BASE_URL = resolveApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Include auth token when available.
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        if (state.userInfo?.token) {
          config.headers["Authorization"] = `Bearer ${state.userInfo.token}`;
          console.log("Auth token added to request:", config.url);
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
    console.error(`Error fetching ${label}:`, normalizeAxiosError(error, label));
    return fallback;
  }
};

const requestOrThrow = async <T>(
  request: () => Promise<AxiosResponse<ApiResponse<T>>>,
  label: string
): Promise<T> => {
  try {
    const response = await request();
    return response.data.data;
  } catch (error) {
    throw normalizeAxiosError(error, label);
  }
};

// Auth API
export const authApi = {
  login: async (credentials: UserCredentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },
  register: async (userInfo: UserRegistrationInfo) => {
    const { data } = await api.post("/auth/register", userInfo);
    return data;
  },
};

// User API
export const userApi = {
  getProfile: async () => {
    const { data } = await api.get("/users/profile");
    return data;
  },
  getAllUsers: async () => {
    const { data } = await api.get("/users");
    return data;
  },
};

// Product API
export const productApi = {
  getAll: (params?: Record<string, any>): Promise<Product[]> =>
    safeRequest(() => api.get("/products", { params }), [], "products"),

  getAllWithMeta: async (params?: Record<string, any>) => {
    try {
      const response = await api.get("/products", { params });
      return {
        products: response.data.data || [],
        pagination: response.data.pagination || { total: 0, page: 1, limit: 20, pages: 0 }
      };
    } catch (error) {
      console.error(`Error fetching products with meta:`, normalizeAxiosError(error, "products"));
      return {
        products: [],
        pagination: { total: 0, page: 1, limit: 20, pages: 0 }
      };
    }
  },

  getFeatured: (): Promise<Product[]> =>
    safeRequest(() => api.get("/products/featured"), [], "featured products"),

  getFlashSale: (): Promise<Product[]> =>
    safeRequest(
      () => api.get("/products/flash-sale"),
      [],
      "flash sale products"
    ),

  getTrending: (): Promise<Product[]> =>
    safeRequest(() => api.get("/products/trending"), [], "trending products"),

  getById: (id: string): Promise<Product | null> =>
    safeRequest(
      () => api.get(`/products/${id}`),
      null,
      `product details for ${id}`
    ),

  getReviews: (id: string): Promise<ProductReview[]> =>
    safeRequest(
      () => api.get(`/products/${id}/reviews`),
      [],
      `product reviews for ${id}`
    ),

  upsertReview: (
    id: string,
    payload: { rating: number; comment: string }
  ): Promise<Product> =>
    requestOrThrow(
      () => api.post(`/products/${id}/reviews`, payload),
      `submit review for ${id}`
    ),
};

// Category API
export const categoryApi = {
  getAll: (): Promise<Category[]> =>
    safeRequest(() => api.get("/categories"), [], "categories"),

  
};

// Testimonial API
export const testimonialApi = {
  getAll: (): Promise<Testimonial[]> =>
    safeRequest(() => api.get("/testimonials"), [], "testimonials"),
};

// Cart API
export const cartApi = {
  getCart: async () => {
    const { data } = await api.get("/cart");
    return data;
  },
  addToCart: async (productId: string, quantity = 1) => {
    const { data } = await api.post("/cart", { productId, quantity });
    return data;
  },
  updateItem: async (productId: string, quantity: number) => {
    const { data } = await api.put("/cart/item", { productId, quantity });
    return data;
  },
  removeItem: async (productId: string) => {
    const { data } = await api.delete(`/cart/item/${productId}`);
    return data;
  },
  clear: async () => {
    const { data } = await api.delete("/cart");
    return data;
  },
};

// Order API
export const orderApi = {
  createOrder: async (orderData: any) => {
    const { data } = await api.post("/orders", orderData);
    return data;
  },
  getUserOrders: async () => {
    const { data } = await api.get("/orders/myorders");
    return data;
  },
  getOrderById: async (id: string) => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },
  getAllOrders: async () => {
    const { data } = await api.get("/orders");
    return data;
  },
};

// Payment API
export const paymentApi = {
  createStripeIntent: async (paymentData: {
    amount: number;
    currency?: string;
    orderId: string;
  }) => {
    const { data } = await api.post(
      "/payment/create-stripe-intent",
      paymentData
    );
    return data;
  },
  createSSLCommerzSession: async (sessionData: any) => {
    const { data } = await api.post(
      "/payment/create-sslcommerz-session",
      sessionData
    );
    return data;
  },
};

export default api;