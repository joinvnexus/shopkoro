import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Mock modules with side effects BEFORE any other imports
vi.mock('@/lib/api', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
  },
  userApi: {
    getProfile: vi.fn(),
  },
  productApi: {
    getAll: vi.fn(),
    getFeatured: vi.fn(),
    getFlashSale: vi.fn(),
    getTrending: vi.fn(),
    getById: vi.fn(),
  },
  testimonialApi: {
    getAll: vi.fn(),
  },
  cartApi: {
    getCart: vi.fn(),
    addToCart: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
}));

vi.mock('@/stores/authStore', () => ({
  default: {
    getState: vi.fn(() => ({
      userInfo: null,
      login: vi.fn(),
      logout: vi.fn(),
    })),
    setState: vi.fn(),
  },
}));

vi.mock('@/stores/cartStore', () => ({
  default: {
    getState: vi.fn(() => ({
      items: [],
      addItem: vi.fn(),
      removeItem: vi.fn(),
      syncFromServer: vi.fn(),
    })),
    setState: vi.fn(),
  },
}));

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Heart: () => <div data-testid="heart-icon" />,
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />,
  Star: () => <div data-testid="star-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  ChevronUp: () => <div data-testid="chevron-up-icon" />,
  Grid: () => <div data-testid="grid-icon" />,
  List: () => <div data-testid="list-icon" />,
  Search: () => <div data-testid="search-icon" />,
  User: () => <div data-testid="user-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
  Phone: () => <div data-testid="phone-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Facebook: () => <div data-testid="facebook-icon" />,
  Twitter: () => <div data-testid="twitter-icon" />,
  Instagram: () => <div data-testid="instagram-icon" />,
  Youtube: () => <div data-testid="youtube-icon" />,
}));

// Mock axios
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

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });