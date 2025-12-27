import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../../server';
import request from 'supertest';

let mongoServer: MongoMemoryServer;

// Mock the database connection to avoid process.exit
jest.mock('../../config/database', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

beforeAll(async () => {
  // Set environment variables for testing
  process.env.NODE_ENV = 'test';
  process.env.ACCESS_TOKEN_SECRET = 'test_access_secret';
  process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
  process.env.ACCESS_TOKEN_EXPIRES_IN = '15m';
  process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
  process.env.REFRESH_COOKIE_NAME = 'shopkoro_refresh_test';

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clean up all collections before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

export { app, request };
