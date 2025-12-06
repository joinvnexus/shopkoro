import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products with optional filters
 * @access  Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      inStock,
      search,
      limit = 50,
      page = 1,
    } = req.query;

    // Build query object
    const query: any = {};

    if (category) {
      query.category = category;
    }

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

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching products",
    });
  }
});

/**
 * @route   GET /api/products/featured
 * @desc    Get featured products
 * @access  Public
 */
router.get("/featured", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isFeatured: true })
      .sort({ rating: -1, createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching featured products",
    });
  }
});

/**
 * @route   GET /api/products/flash-sale
 * @desc    Get flash sale products
 * @access  Public
 */
router.get("/flash-sale", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isFlashSale: true, inStock: true })
      .sort({ discount: -1, createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching flash sale products",
    });
  }
});

/**
 * @route   GET /api/products/trending
 * @desc    Get trending products
 * @access  Public
 */
router.get("/trending", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isTrending: true, inStock: true })
      .sort({ rating: -1, reviews: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching trending products",
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching product",
    });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin only - add auth middleware later)
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating product",
    });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Admin only - add auth middleware later)
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating product",
    });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private (Admin only - add auth middleware later)
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting product",
    });
  }
});

export default router;

