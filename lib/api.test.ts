// Mock axios before importing
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
      },
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));

import { describe, it, expect, vi } from 'vitest';
import {
  authApi,
  userApi,
  productApi,
  testimonialApi,
  cartApi,
} from './api';

describe('API Modules', () => {
  it('should export authApi with login and register functions', () => {
    expect(typeof authApi.login).toBe('function');
    expect(typeof authApi.register).toBe('function');
  });

  it('should export userApi with getProfile function', () => {
    expect(typeof userApi.getProfile).toBe('function');
  });

  it('should export productApi with required functions', () => {
    expect(typeof productApi.getAll).toBe('function');
    expect(typeof productApi.getFeatured).toBe('function');
    expect(typeof productApi.getFlashSale).toBe('function');
    expect(typeof productApi.getTrending).toBe('function');
    expect(typeof productApi.getById).toBe('function');
  });

  it('should export testimonialApi with getAll function', () => {
    expect(typeof testimonialApi.getAll).toBe('function');
  });

  it('should export cartApi with required functions', () => {
    expect(typeof cartApi.getCart).toBe('function');
    expect(typeof cartApi.addToCart).toBe('function');
    expect(typeof cartApi.updateItem).toBe('function');
    expect(typeof cartApi.removeItem).toBe('function');
    expect(typeof cartApi.clear).toBe('function');
  });
});