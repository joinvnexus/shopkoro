import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Testimonial from "../models/Testimonial";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @route   GET /api/testimonials
 * @desc    Get all testimonials
 * @access  Public
 */
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(50);

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  })
);

/**
 * @route   GET /api/testimonials/:id
 * @desc    Get single testimonial by ID
 * @access  Public
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      res.status(404);
      throw new Error("Testimonial not found");
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  })
);

/**
 * @route   POST /api/testimonials
 * @desc    Create a new testimonial
 * @access  Private (Admin only)
 */
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.body?.name || !req.body?.comment) {
      res.status(400);
      throw new Error("name and comment are required");
    }

    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  })
);

export default router;

