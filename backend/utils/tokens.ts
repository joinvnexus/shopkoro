import jwt, { SignOptions, Algorithm } from "jsonwebtoken";
import { environment } from "../config";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import RefreshToken from '../models/RefreshToken';

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
  jti?: string;
}

export const generateAccessToken = (userId: string): string => {
  const payload: TokenPayload = { userId };

  const options: SignOptions = {
    expiresIn: environment.accessTokenExpiresIn as any,
    algorithm: "HS256" as Algorithm,
  };

  return jwt.sign(payload, environment.accessTokenSecret, options);
};

const hashToken = (tokenId: string) => {
  return crypto.createHash('sha256').update(tokenId).digest('hex');
};

/**
 * Create and persist a refresh token tied to the user. The token returned is an opaque
 * JWT that includes a unique `jti` which is stored hashed in the database for verification.
 */
export const createRefreshToken = async (userId: string): Promise<string> => {
  const jti = uuidv4();

  const options: SignOptions = {
    expiresIn: environment.refreshTokenExpiresIn as any,
    algorithm: "HS256" as Algorithm,
  };

  const token = jwt.sign({ userId, jti }, environment.refreshTokenSecret, options);

  const tokenHash = hashToken(jti);
  const expiresAt = new Date(Date.now() + cookieOptions.maxAge);

  await RefreshToken.create({ tokenHash, user: userId, expiresAt });

  return token;
};

/**
 * Verify a refresh token signature and ensure the referenced token exists and is valid (not revoked/expired)
 */
export const verifyRefreshToken = async (token: string) => {
  const payload = jwt.verify(token, environment.refreshTokenSecret) as TokenPayload & { jti?: string };

  if (!payload.jti) {
    const error = new Error('Invalid refresh token: missing id');
    (error as any).name = 'UnauthorizedError';
    throw error;
  }

  const tokenHash = hashToken(payload.jti);
  const tokenDoc = await RefreshToken.findOne({ tokenHash });

  if (!tokenDoc || tokenDoc.revoked) {
    const error = new Error('Refresh token revoked or not found');
    (error as any).name = 'UnauthorizedError';
    throw error;
  }

  if (tokenDoc.expiresAt < new Date()) {
    const error = new Error('Refresh token expired');
    (error as any).name = 'UnauthorizedError';
    throw error;
  }

  return { payload, tokenDoc };
};

/**
 * Revoke a refresh token by its jti (mark revoked and set revokedAt)
 */
export const revokeRefreshTokenByJti = async (jti: string) => {
  const tokenHash = hashToken(jti);
  const tokenDoc = await RefreshToken.findOne({ tokenHash });
  if (!tokenDoc) return;
  tokenDoc.revoked = true;
  tokenDoc.revokedAt = new Date();
  await tokenDoc.save();
};

/**
 * Rotate tokens: revoke old token and create a new one
 */
export const rotateRefreshToken = async (oldJti: string, userId: string): Promise<string> => {
  const oldHash = hashToken(oldJti);
  const oldToken = await RefreshToken.findOne({ tokenHash: oldHash });
  if (oldToken) {
    oldToken.revoked = true;
    oldToken.revokedAt = new Date();
    await oldToken.save();
  }

  const newToken = await createRefreshToken(userId);
  const newPayload = jwt.verify(newToken, environment.refreshTokenSecret) as any;
  if (oldToken) {
    oldToken.replacedByToken = hashToken(newPayload.jti);
    await oldToken.save();
  }

  return newToken;
};