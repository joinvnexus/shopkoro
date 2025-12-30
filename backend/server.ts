// server.ts - এই ভার্সনটা ব্যবহার করুন (পুরোটা রিপ্লেস করুন)

import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// 🔑 এই দুই লাইন সব import এর আগে – এটা সবচেয়ে গুরুত্বপূর্ণ!
dotenv.config();  // .env লোড হয়ে যাবে
import "./utils/tokens";  // এখন tokens.ts নিরাপদে চেক করবে, কোনো এরর হবে না

// এখন বাকি সব import করুন (এগুলো এখন safe)
import connectDB from "./config/database";
import productRoutes from "./routes/productRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

const app: Application = express();

app.set("trust proxy", 1);
connectDB();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Development environment - more permissive
      if (process.env.NODE_ENV === "development") {
        // Allow localhost development servers
        if (origin === "http://localhost:3000" || origin.startsWith("http://localhost:") || origin === "http://127.0.0.1:3000") {
          return callback(null, true);
        }
      }
      
      // Production environment - more restrictive
      const allowedProductionOrigins = [
        process.env.FRONTEND_URL,
        "https://shopkoro.vercel.app",
        "https://shopkoro.onrender.com" // Add your Render frontend URL if you have one
      ].filter(Boolean); // Filter out any undefined values
      
      // Check if the origin is in the allowed list
      if (allowedProductionOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Log blocked requests for debugging (only in development)
      if (process.env.NODE_ENV === "development") {
        console.log(`Blocked CORS request from: ${origin}`);
      }
      
      // Block the request
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "Cache-Control"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 600 // 10 minutes
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

app.get("/", (_req: Request, res: Response) => {
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
app.use("/api/payment", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;