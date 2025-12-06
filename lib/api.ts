import axios from "axios";
import { Product, Testimonial, ApiResponse } from "@/types";

// Backend API base URL - Update this with your backend URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Product API functions
export const productApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>("/products");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  // Get featured products
  getFeatured: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>("/products/featured");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return [];
    }
  },

  // Get flash sale products
  getFlashSale: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>("/products/flash-sale");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching flash sale products:", error);
      return [];
    }
  },

  // Get trending products
  getTrending: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>("/products/trending");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching trending products:", error);
      return [];
    }
  },

  // Get product by ID
  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  },
};

// Testimonial API functions
export const testimonialApi = {
  getAll: async (): Promise<Testimonial[]> => {
    try {
      const response = await api.get<ApiResponse<Testimonial[]>>("/testimonials");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }
  },
};

export default api;

