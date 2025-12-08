import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart';
import Product from '../models/Product';

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  let cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  res.json({ success: true, data: cart });
});

// @desc    Add item to cart (or update quantity)
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;

  if (!productId) {
    res.status(400);
    throw new Error('productId is required');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingIndex = cart.items.findIndex((i) => i.product.toString() === productId);

  if (existingIndex > -1) {
    // Update quantity
    cart.items[existingIndex].quantity = Math.max(1, quantity || cart.items[existingIndex].quantity + 1);
  } else {
    cart.items.push({ product: product._id, quantity: quantity || 1 });
  }

  await cart.save();

  const updated = await Cart.findById(cart._id).populate('items.product');
  res.status(201).json({ success: true, data: updated });
});

// @desc    Update item quantity
// @route   PUT /api/cart
// @access  Private
const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== 'number') {
    res.status(400);
    throw new Error('productId and numeric quantity are required');
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) {
    res.status(404);
    throw new Error('Item not in cart');
  }

  if (quantity <= 0) {
    // remove item
    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  } else {
    item.quantity = quantity;
  }

  await cart.save();

  const updated = await Cart.findById(cart._id).populate('items.product');
  res.json({ success: true, data: updated });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);

  await cart.save();

  const updated = await Cart.findById(cart._id).populate('items.product');
  res.json({ success: true, data: updated });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = [];
  await cart.save();

  res.json({ success: true, data: cart });
});

export { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
