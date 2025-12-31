import { environment } from './environment';

/**
 * CORS Configuration
 * Sets up Cross-Origin Resource Sharing based on environment settings
 */
export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, curl requests, or server-side requests)
    if (!origin) return callback(null, true);

    // Development environment - more permissive
    if (environment.isDevelopment) {
      // Allow all localhost development servers
      if (origin.startsWith("http://localhost:") || 
          origin.startsWith("http://127.0.0.1:") || 
          origin.startsWith("http://192.168.")) {
        return callback(null, true);
      }
      // Also allow the specific frontend URL if set
      if (environment.frontendUrl && origin === environment.frontendUrl) {
        return callback(null, true);
      }
    }

    // Production environment - allow specific domains
    const isAllowed = environment.allowedOrigins.some(allowedOrigin => {
      if (!allowedOrigin) return false;
      return origin === allowedOrigin ||
             origin.startsWith(allowedOrigin.replace('https://', 'https://www.')); // Allow www subdomain
    });

    if (isAllowed) {
      return callback(null, true);
    }

    // Log blocked requests for security monitoring
    console.warn(`🔒 Blocked CORS request from: ${origin} in ${environment.nodeEnv} environment`);

    // Block the request
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "Cache-Control"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600 // 10 minutes
};
