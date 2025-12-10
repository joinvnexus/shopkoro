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
import { notFound, errorHandler } from "./middleware/errorMiddleware";

const app: Application = express();

app.set("trust proxy", 1);
connectDB();

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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;