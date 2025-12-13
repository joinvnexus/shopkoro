import asyncHandler from "express-async-handler";
import Stripe from "stripe";
const SSLCommerzPayment = require("sslcommerz-lts");
import Order from "../models/Order";
import { Request, Response } from "express";
// Initialize payment gateways
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const sslcommerz = new SSLCommerzPayment(
  process.env.SSLCOMMERZ_STORE_ID!,
  process.env.SSLCOMMERZ_STORE_PASSWORD!,
  process.env.NODE_ENV === "production"
);

// @desc    Create payment intent for Stripe
// @route   POST /api/payment/create-stripe-intent
// @access  Private
export const createStripePaymentIntent = asyncHandler(
  async (req: Request, res: Response) => {
    const { amount, currency = "usd", orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        orderId,
        userId: req.user?._id?.toString() || "" ,
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  }
);

// @desc    Create SSLCommerz payment session
// @route   POST /api/payment/create-sslcommerz-session
// @access  Private
export const createSSLCommerzSession = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      totalAmount,
      currency = "BDT",
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
    } = req.body;

    const data = {
      total_amount: totalAmount,
      currency,
      tran_id: orderId,
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      fail_url: `${process.env.FRONTEND_URL}/payment/fail`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      ipn_url: `${process.env.BACKEND_URL}/api/payment/sslcommerz-ipn`,
      shipping_method: "NO",
      product_name: "ShopKoro Order",
      product_category: "E-commerce",
      product_profile: "general",
      cus_name: customerName,
      cus_email: customerEmail,
      cus_phone: customerPhone,
      cus_add1: customerAddress,
      cus_city: customerCity,
      cus_country: "Bangladesh",
      shipping_method_2: "NO",
      ship_name: customerName,
      ship_add1: customerAddress,
      ship_city: customerCity,
      ship_country: "Bangladesh",
    };

    const sslcommerzResponse = await sslcommerz.init(data);

    if (sslcommerzResponse.GatewayPageURL) {
      res.json({
        success: true,
        gatewayUrl: sslcommerzResponse.GatewayPageURL,
        sessionKey: sslcommerzResponse.sessionkey,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create SSLCommerz payment session",
      });
    }
  }
);

// @desc    Handle Stripe webhook
// @route   POST /api/payment/stripe-webhook
// @access  Public
export const handleStripeWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(
          paymentIntent.metadata.orderId,
          "stripe",
          paymentIntent.id
        );
        break;
      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(failedPaymentIntent.metadata.orderId);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

// @desc    Handle SSLCommerz success callback
// @route   POST /api/payment/sslcommerz-success
// @access  Public
export const handleSSLCommerzSuccess = asyncHandler(
  async (req: Request, res: Response) => {
    const { tran_id, val_id } = req.body;

    // Validate the payment with SSLCommerz
    const validationResponse = await sslcommerz.validate({ val_id });

    if (validationResponse.status === "VALID") {
      await handlePaymentSuccess(tran_id, "sslcommerz", val_id);
      res.redirect(
        `${process.env.FRONTEND_URL}/payment/success?order=${tran_id}`
      );
    } else {
      await handlePaymentFailure(tran_id);
      res.redirect(`${process.env.FRONTEND_URL}/payment/fail?order=${tran_id}`);
    }
  }
);

// @desc    Handle SSLCommerz IPN (Instant Payment Notification)
// @route   POST /api/payment/sslcommerz-ipn
// @access  Public
export const handleSSLCommerzIPN = asyncHandler(
  async (req: Request, res: Response) => {
    const ipnData = req.body;

    // Verify IPN data
    const isValidIPN = sslcommerz.validateIPN(ipnData);

    if (isValidIPN) {
      if (ipnData.status === "VALID") {
        await handlePaymentSuccess(
          ipnData.tran_id,
          "sslcommerz",
          ipnData.val_id
        );
      } else if (ipnData.status === "FAILED") {
        await handlePaymentFailure(ipnData.tran_id);
      }
    }

    res.status(200).send("IPN received");
  }
);

// @desc    Handle SSLCommerz failure callback
// @route   POST /api/payment/sslcommerz-fail
// @access  Public
export const handleSSLCommerzFailure = asyncHandler(
  async (req: Request, res: Response) => {
    const { tran_id } = req.body;
    await handlePaymentFailure(tran_id);
    res.redirect(`${process.env.FRONTEND_URL}/payment/fail?order=${tran_id}`);
  }
);

// Helper functions
async function handlePaymentSuccess(
  orderId: string,
  gateway: string,
  transactionId: string
) {
  try {
    const order = await Order.findById(orderId);
    if (order) {
      order.paymentStatus = "paid";
      order.orderStatus = "processing";
      order.transactionId = transactionId;
      order.paymentGatewayResponse = { gateway, transactionId };
      await order.save();
    }
  } catch (error) {
    console.error("Error updating order payment status:", error);
  }
}

async function handlePaymentFailure(orderId: string) {
  try {
    const order = await Order.findById(orderId);
    if (order) {
      order.paymentStatus = "failed";
      await order.save();
    }
  } catch (error) {
    console.error("Error updating order payment failure:", error);
  }
}
