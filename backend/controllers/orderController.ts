import asyncHandler from "express-async-handler";
import Order, { IOrder } from "../models/Order";
import { Request, Response } from "express";

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items, shippingInfo, paymentMethod, subtotal, shipping, total } =
    req.body;

  if (!req.user?._id) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Validate required fields
  if (
    !items ||
    !shippingInfo ||
    !paymentMethod ||
    !subtotal ||
    !shipping ||
    !total
  ) {
    res.status(400);
    throw new Error("All order fields are required");
  }

  if (items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // Create order
  const order = new Order({
    user: req.user._id,
    items,
    shippingInfo,
    paymentMethod,
    subtotal,
    shipping,
    total,
    paymentStatus: "pending",
    orderStatus: "pending",
  });

  const createdOrder = await order.save();

  res.status(201).json({
    success: true,
    order: {
      _id: createdOrder._id,
      items: createdOrder.items,
      shippingInfo: createdOrder.shippingInfo,
      paymentMethod: createdOrder.paymentMethod,
      subtotal: createdOrder.subtotal,
      shipping: createdOrder.shipping,
      total: createdOrder.total,
      paymentStatus: createdOrder.paymentStatus,
      orderStatus: createdOrder.orderStatus,
      createdAt: createdOrder.createdAt,
    },
  });
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find({ user: req.user?._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders: orders.map((order) => ({
        _id: order._id,
        items: order.items,
        shippingInfo: order.shippingInfo,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        transactionId: order.transactionId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
    });
  }
);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Check if order belongs to user or user is admin
    if (
      order.user.toString() !== req.user?._id.toString() &&
      !req.user?.isAdmin
    ) {
      res.status(401);
      throw new Error("Not authorized to view this order");
    }

    res.json({
      success: true,
      order: {
        _id: order._id,
        user: order.user,
        items: order.items,
        shippingInfo: order.shippingInfo,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        transactionId: order.transactionId,
        paymentGatewayResponse: order.paymentGatewayResponse,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  }
);

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
    });
  }
);

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      orders: orders.map((order: IOrder) => ({
        _id: order._id,
        user: order.user,
        items: order.items,
        shippingInfo: order.shippingInfo,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        transactionId: order.transactionId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  }
);
