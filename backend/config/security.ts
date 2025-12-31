import rateLimit from 'express-rate-limit';
import { environment } from './environment';

/**
 * Security Configuration
 * Sets up security middleware including Helmet, rate limiting, and other security measures
 */

// Rate limiting configuration
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: environment.isDevelopment ? 1000 : 200, // More requests allowed in development
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      data: null,
      message: "Too many requests",
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests",
      },
      stack: environment.isProduction ? null : undefined,
    });
  },
});

/**
 * Cookie options for secure cookies
 */
export const cookieOptions = {
  httpOnly: true,
  secure: !environment.isDevelopment, // Must be true for SameSite="none" to work cross-origin
  sameSite: environment.isDevelopment ? "lax" as const : "none" as const, // Restrict in production
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * Cookie name for refresh token
 */
export const COOKIE_NAMES = {
  refresh: environment.refreshCookieName,
};
