import express from 'express';
import {
  createStripePaymentIntent,
  createSSLCommerzSession,
  handleStripeWebhook,
  handleSSLCommerzSuccess,
  handleSSLCommerzIPN,
  handleSSLCommerzFailure
} from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/create-stripe-intent', protect, createStripePaymentIntent);
router.post('/create-sslcommerz-session', protect, createSSLCommerzSession);

// Public webhook routes
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
router.post('/sslcommerz-success', handleSSLCommerzSuccess);
router.post('/sslcommerz-ipn', handleSSLCommerzIPN);
router.post('/sslcommerz-fail', handleSSLCommerzFailure);

export default router;