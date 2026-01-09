/// <reference types="jest" />
import { config } from 'dotenv';

// Load test environment variables
config({ path: '.env.test' });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Mock process.env for consistent testing
Object.defineProperty(process.env, 'NODE_ENV', { value: 'test', writable: true });
process.env.MONGODB_URI = 'mongodb://localhost:27017/shopkoro_test';
process.env.ACCESS_TOKEN_SECRET = 'test_access_secret';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
process.env.ACCESS_TOKEN_EXPIRES_IN = '15m';
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
process.env.REFRESH_COOKIE_NAME = 'shopkoro_refresh_test';
