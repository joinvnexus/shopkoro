// server.ts - Bootstrap file for the ShopKoro API
// This file should remain minimal with only essential setup logic

import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { connectDB, corsOptions, rateLimiter, cookieOptions, environment } from "./config";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// Import routes
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";

// Initialize Express app
const app: Application = express();

// Trust proxy headers (for environments like Render)
app.set("trust proxy", 1);

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(mongoSanitize());
app.use(xss());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check endpoint
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "ShopKoro API is running!",
    version: "1.0.0",
    environment: environment.nodeEnv,
  });
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = environment.port;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${environment.nodeEnv}`);
});

export default app;