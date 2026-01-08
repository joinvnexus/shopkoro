// backend/controllers/productController.ts

import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const result = await ProductService.getProducts(req.query);

  res.status(200).json({
    success: true,
    data: result.products,
    pagination: result.pagination,
  });
});

const getFeaturedProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await ProductService.getFeaturedProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

const getOfferProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await ProductService.getOfferProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

const getFlashSaleProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await ProductService.getFlashSaleProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

const getTrendingProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await ProductService.getTrendingProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

const getProductReviews = asyncHandler(async (req: Request, res: Response) => {
  const reviews = await ProductService.getProductReviews(req.params.id);

  res.status(200).json({
    success: true,
    data: reviews,
  });
});

const submitProductReview = asyncHandler(async (req: Request, res: Response) => {
  const { rating, comment } = req.body;
  const updated = await ProductService.submitProductReview(
    req.params.id,
    String(req.user!._id),
    req.user!.name,
    rating,
    comment
  );

  if (!updated) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    data: updated,
  });
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.getProductById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.deleteProduct(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export {
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
};