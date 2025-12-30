import jwt, { SignOptions, Algorithm } from "jsonwebtoken";

// Load secrets
const accessSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET!;

if (!accessSecret || !refreshSecret) {
  throw new Error("FATAL: JWT secrets are not defined in the environment.");
}

const accessTtl = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const refreshTtl = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

export interface TokenPayload {
  userId: string;
}

export const generateAccessToken = (userId: string): string => {
  const payload: TokenPayload = { userId };

  const options: SignOptions = {
    expiresIn: accessTtl as any,
    algorithm: "HS256" as Algorithm,
  };

  return jwt.sign(payload, accessSecret, options);
};

export const signRefreshToken = (userId: string): string => {
  const payload: TokenPayload = { userId };

  const options: SignOptions = {
    expiresIn: refreshTtl as any,
    algorithm: "HS256" as Algorithm,
  };

  return jwt.sign(payload, refreshSecret, options);
};

export const cookieOptions = {
  httpOnly: true,
  secure: true, // Must be true for SameSite="none" to work cross-origin
  sameSite: "none" as const, // Allow cross-origin (Vercel ↔ Render)
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const COOKIE_NAMES = {
  refresh: process.env.REFRESH_COOKIE_NAME || "shopkoro_refresh",
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, refreshSecret) as TokenPayload;
};