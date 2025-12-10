import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/Product";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

const parseFilters = (req: Request) => {
  const {
    category,
    minPrice,
    maxPrice,
    inStock,
    search,
    limit = 50,
    page = 1,
  } = req.query;

  const query: Record<string, any> = {};

  if (category) query.category = category;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (inStock !== undefined) {
    query.inStock = inStock === "true";
  }

  if (search) {
    query.$text = { $search: search as string };
  }

  const pagination = {
    limit: Math.min(Number(limit) || 50, 100),
    page: Math.max(Number(page) || 1, 1),
  };

  return { query, pagination };
};

const requireProductPayload = (body: any) => {
  if (!body?.name || !body?.description || body.price === undefined) {
    const error = new Error("name, description, and price are required");
    (error as any).statusCode = 400;
    throw error;
  }
};

/**
 * @route   GET /api/products
 * @desc    Get all products with optional filters
 * @access  Public
 */
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { query, pagination } = parseFilters(req);
    const skip = (pagination.page - 1) * pagination.limit;

    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).limit(pagination.limit).skip(skip),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        pages: Math.ceil(total / pagination.limit),
      },
    });
  })
);

/**
 * @route   GET /api/products/featured
 * @desc    Get featured products
 * @access  Public
 */
router.get(
  "/featured",
  asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.find({ isFeatured: true })
      .sort({ rating: -1, createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: products,
    });
  })
);

/**
 * @route   GET /api/products/flash-sale
 * @desc    Get flash sale products
 * @access  Public
 */
router.get(
  "/flash-sale",
  asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.find({ isFlashSale: true, inStock: true })
      .sort({ discount: -1, createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: products,
    });
  })
);

/**
 * @route   GET /api/products/trending
 * @desc    Get trending products
 * @access  Public
 */
router.get(
  "/trending",
  asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.find({ isTrending: true, inStock: true })
      .sort({ rating: -1, reviews: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: products,
    });
  })
);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  })
);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin only)
 */
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req: Request, res: Response) => {
    requireProductPayload(req.body);
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  })
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  })
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  })
);

export default router;

