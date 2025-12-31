import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const env = process.env.NODE_ENV || 'development';

// Load the appropriate .env file based on environment
const envPath = path.resolve(process.cwd(), `.env.${env}`);
const result = dotenv.config({ path: envPath });

// Handle dotenv errors
if (result.error) {
  console.error(`❌ Failed to load environment file: ${envPath}`);
  console.error(result.error);
  process.exit(1);
}

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'ACCESS_TOKEN_SECRET',
  'REFRESH_TOKEN_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Environment-specific configurations
export const environment = {
  nodeEnv: env,
  isDevelopment: env === 'development',
  isProduction: env === 'production',
  isTest: env === 'test',

  // Server
  port: process.env.PORT || 5000,

  // Database
  mongodbUri: process.env.MONGODB_URI!,

  // JWT
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',

  // CORS
  frontendUrl: process.env.FRONTEND_URL,
  allowedOrigins: [
    process.env.FRONTEND_URL,
    'https://shopkoro.vercel.app',
    'https://shopkoro.onrender.com'
  ].filter(Boolean) as string[],

  // Cookies
  refreshCookieName: process.env.REFRESH_COOKIE_NAME || 'shopkoro_refresh',

  // Payment (SSLCommerz)
  sslCommerzStoreId: process.env.SSLCOMMERZ_STORE_ID,
  sslCommerzStorePassword: process.env.SSLCOMMERZ_STORE_PASSWORD,

  // Stripe
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,

  // Admin credentials (for seeding)
  adminEmail: process.env.ADMIN_EMAIL || 'admin@shopkoro.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123'
};
