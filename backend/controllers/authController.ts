import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import crypto from "crypto";
import User from "../models/User";
import {
  COOKIE_NAMES,
  cookieOptions,
  generateAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  rotateRefreshToken,
  revokeRefreshTokenByJti,
} from "../utils/tokens";

const XSRF_COOKIE_NAME = 'XSRF-TOKEN';

const authSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

const buildUserPayload = (user: any, accessToken: string) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  token: accessToken,
});

const generateCsrfToken = () => crypto.randomBytes(24).toString('hex');

// Helper to set both refresh cookie and a client-readable XSRF cookie (double-submit cookie)
const setAuthCookies = (res: Response, refreshToken: string) => {
  const xsrf = generateCsrfToken();

  // refresh token: httpOnly
  res.cookie(COOKIE_NAMES.refresh, refreshToken, cookieOptions);

  // xsrf token: readable by client (not httpOnly) for double-submit
  res.cookie(XSRF_COOKIE_NAME, xsrf, {
    ...cookieOptions,
    httpOnly: false,
  });

  return xsrf;
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = authSchema.parse(req.body);

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = await createRefreshToken(user._id.toString());

  const xsrf = setAuthCookies(res, refreshToken);

  res.status(201).json({ ...buildUserPayload(user, accessToken), xsrf });
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = authSchema
    .pick({ email: true, password: true })
    .parse(req.body);

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = await createRefreshToken(user._id.toString());

  const xsrf = setAuthCookies(res, refreshToken);

  res.json({ ...buildUserPayload(user, accessToken), xsrf });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (uses refresh cookie)
const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAMES.refresh];
  const xsrfHeader = req.headers['x-xsrf-token'] as string | undefined;
  const xsrfCookie = req.cookies?.[XSRF_COOKIE_NAME];

  if (!token) {
    res.status(401);
    throw new Error("No refresh token");
  }

  if (!xsrfHeader || !xsrfCookie || xsrfHeader !== xsrfCookie) {
    res.status(403);
    throw new Error("Invalid CSRF token");
  }

  const { payload } = await verifyRefreshToken(token);

  const user = await User.findById(payload.userId);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Rotate refresh token
  const newRefresh = await rotateRefreshToken(payload.jti!, user._id.toString());
  const newAccess = generateAccessToken(user._id.toString());

  const xsrf = setAuthCookies(res, newRefresh);

  res.json({ ...buildUserPayload(user, newAccess), xsrf });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAMES.refresh];
  const xsrfHeader = req.headers['x-xsrf-token'] as string | undefined;
  const xsrfCookie = req.cookies?.[XSRF_COOKIE_NAME];

  if (token && xsrfHeader && xsrfCookie && xsrfHeader === xsrfCookie) {
    try {
      const { payload } = await verifyRefreshToken(token);
      if (payload.jti) {
        await revokeRefreshTokenByJti(payload.jti);
      }
    } catch (e) {
      // ignore errors during logout
    }
  }

  res
    .cookie(COOKIE_NAMES.refresh, "", { ...cookieOptions, maxAge: 0 })
    .cookie(XSRF_COOKIE_NAME, "", { ...cookieOptions, maxAge: 0, httpOnly: false })
    .json({ success: true });
});

export { registerUser, loginUser, refreshAccessToken, logoutUser };
