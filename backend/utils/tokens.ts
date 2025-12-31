import jwt, { SignOptions, Algorithm } from "jsonwebtoken";
import { environment } from "../config";

// Validate required secrets
if (!environment.accessTokenSecret || !environment.refreshTokenSecret) {
  throw new Error("FATAL: JWT secrets are not defined in the environment.");
}

// Cookie options for secure cookies
export const cookieOptions = {
  httpOnly: true,
  secure: !environment.isDevelopment, // Must be true for SameSite="none" to work cross-origin
  sameSite: environment.isDevelopment ? "lax" as const : "none" as const, // Restrict in production
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Cookie name for refresh token
export const COOKIE_NAMES = {
  refresh: environment.refreshCookieName,
};

export interface TokenPayload {
  userId: string;
}

export const generateAccessToken = (userId: string): string => {
  const payload: TokenPayload = { userId };

  const options: SignOptions = {
    expiresIn: environment.accessTokenExpiresIn as any,
    algorithm: "HS256" as Algorithm,
  };

  return jwt.sign(payload, environment.accessTokenSecret, options);
};

export const signRefreshToken = (userId: string): string => {
  const payload: TokenPayload = { userId };

  const options: SignOptions = {
    expiresIn: environment.refreshTokenExpiresIn as any,
    algorithm: "HS256" as Algorithm,
  };

  return jwt.sign(payload, environment.refreshTokenSecret, options);
};



export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, environment.refreshTokenSecret) as TokenPayload;
};