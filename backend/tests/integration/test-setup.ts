import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';

// Import routes and middleware
import productRoutes from '../../routes/productRoutes';
import testimonialRoutes from '../../routes/testimonialRoutes';
import authRoutes from '../../routes/authRoutes';
import userRoutes from '../../routes/userRoutes';
import cartRoutes from '../../routes/cartRoutes';
import orderRoutes from '../../routes/orderRoutes';
import paymentRoutes from '../../routes/paymentRoutes';
import { notFound, errorHandler } from '../../middleware/errorMiddleware';

// Mock the database connection
jest.mock('../../config/database', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

let mongoServer: MongoMemoryServer;
let app: Application;

beforeAll(async () => {
  // Set environment variables for testing
  Object.defineProperty(process.env, 'NODE_ENV', { value: 'test', writable: true });
  (process.env as any).ACCESS_TOKEN_SECRET = 'test_access_secret';
  (process.env as any).REFRESH_TOKEN_SECRET = 'test_refresh_secret';
  (process.env as any).ACCESS_TOKEN_EXPIRES_IN = '15m';
  (process.env as any).REFRESH_TOKEN_EXPIRES_IN = '7d';
  (process.env as any).REFRESH_COOKIE_NAME = 'shopkoro_refresh_test';
  (process.env as any).STRIPE_SECRET_KEY = 'sk_test_mock_key';
  (process.env as any).STRIPE_WEBHOOK_SECRET = 'whsec_mock_secret';

  // Load environment variables
  dotenv.config();

  // Create in-memory database
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);

  // Create Express app for testing
  app = express();

  app.set("trust proxy", 1);
  
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      handler: (_req, res) => {
        res.status(429).json({
          success: false,
          data: null,
          message: "Too many requests",
          error: {
            code: "RATE_LIMITED",
            message: "Too many requests",
          },
          stack: process.env.NODE_ENV === "production" ? null : undefined,
        });
      },
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get("/", (_req, res) => {
    res.json({
      success: true,
      message: "ShopKoro API is running!",
      version: "1.0.0",
    });
  });

  app.use("/api/products", productRoutes);
  app.use("/api/testimonials", testimonialRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/orders", orderRoutes);
  // Skip payment routes for integration tests to avoid Stripe issues
  // app.use("/api/payment", paymentRoutes);

  app.use(notFound);
  app.use(errorHandler);
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
