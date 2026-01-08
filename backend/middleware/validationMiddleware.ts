// backend/middleware/validationMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
};

// Product validation schemas
export const productSchema = z.object({
  name: z.string().min(1).max(200),
  nameBn: z.string().max(200).optional(),
  description: z.string().min(1),
  descriptionBn: z.string().optional(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  discount: z.number().min(0).max(100).optional(),
  image: z.string().url(),
  images: z.array(z.string().url()).optional(),
  category: z.string().min(1),
  categoryBn: z.string().optional(),
  inStock: z.boolean().optional(),
  stock: z.number().min(0).optional(),
  isFeatured: z.boolean().optional(),
  isFlashSale: z.boolean().optional(),
  isTrending: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateProductSchema = productSchema.partial();

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(1000),
});

// User validation schemas
export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Order validation schemas
export const createOrderSchema = z.object({
  items: z.array(z.object({
    product: z.string(),
    quantity: z.number().int().positive(),
  })),
  shippingAddress: z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  paymentMethod: z.string().min(1),
});

// Testimonial validation schemas
export const testimonialSchema = z.object({
  name: z.string().min(1),
  comment: z.string().min(1),
  rating: z.number().int().min(1).max(5).optional(),
  image: z.string().url().optional(),
});