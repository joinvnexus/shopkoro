import express from "express";
import { admin, protect } from "../middleware/authMiddleware";
import { validate, productSchema, updateProductSchema, reviewSchema } from "../middleware/validationMiddleware";
import {
  getProducts,
  getFeaturedProducts,
  getOfferProducts,
  getFlashSaleProducts,
  getTrendingProducts,
  getProductReviews,
  submitProductReview,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products with optional filters
 * @access  Public
 */
router.get("/", getProducts);

/**
 * @route   GET /api/products/featured
 * @desc    Get featured products
 * @access  Public
 */
router.get("/featured", getFeaturedProducts);

/**
 * @route   GET /api/products/offers
 * @desc    Get offer products (products with discount)
 * @access  Public
 */
router.get("/offers", getOfferProducts);

/**
 * @route   GET /api/products/flash-sale
 * @desc    Get flash sale products
 * @access  Public
 */
router.get("/flash-sale", getFlashSaleProducts);

/**
 * @route   GET /api/products/trending
 * @desc    Get trending products
 * @access  Public
 */
router.get("/trending", getTrendingProducts);

router.get("/:id/reviews", getProductReviews);

router.post("/:id/reviews", protect, validate(reviewSchema), submitProductReview);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin only)
 */
router.post("/", protect, admin, validate(productSchema), createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Admin only)
 */
router.put("/:id", protect, admin, validate(updateProductSchema), updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private (Admin only)
 */
router.delete("/:id", protect, admin, deleteProduct);

export default router;

