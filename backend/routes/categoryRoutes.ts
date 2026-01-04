import express from "express";
import asyncHandler from "express-async-handler";
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
    // Aggregate categories from products
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          productCount: { $sum: 1 },
          name: { $first: "$category" }, // Assuming category is the name, or adjust if separate field
        },
      },
      {
        $project: {
          _id: 0,
          slug: "$_id",
          name: "$_id",
          productCount: 1,
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: categories,
    });
  })
);

export default router;