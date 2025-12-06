import express, { Request, Response } from "express";
import Testimonial from "../models/Testimonial";

const router = express.Router();

/**
 * @route   GET /api/testimonials
 * @desc    Get all testimonials
 * @access  Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching testimonials",
    });
  }
});

/**
 * @route   GET /api/testimonials/:id
 * @desc    Get single testimonial by ID
 * @access  Public
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching testimonial",
    });
  }
});

/**
 * @route   POST /api/testimonials
 * @desc    Create a new testimonial
 * @access  Public (can add auth later)
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating testimonial",
    });
  }
});

export default router;

