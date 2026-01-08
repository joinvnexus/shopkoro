import express from "express";
import asyncHandler from "express-async-handler";
import Category from "../models/Category";
import Product from "../models/Product";

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories with product count
 * @access  Public
 */
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    // Get all categories
    const categories = await Category.find({}).lean();

    // Get product counts for each category
    const productCounts = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Create a map of category slug to product count
    const countMap = new Map();
    productCounts.forEach((item) => {
      countMap.set(item._id, item.count);
    });

    // Add product count to each category
    const categoriesWithCount = categories.map((category) => ({
      ...category,
      productCount: countMap.get(category.slug) || 0,
    }));

    res.status(200).json({
      success: true,
      data: categoriesWithCount,
    });
  })
);

export default router;