import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import User from "../models/User";
import {
  COOKIE_NAMES,
  cookieOptions,
  generateAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens";

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
  const refreshToken = signRefreshToken(user._id.toString());

  res
    .status(201)
    .cookie(COOKIE_NAMES.refresh, refreshToken, cookieOptions)
    .json(buildUserPayload(user, accessToken));
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
  const refreshToken = signRefreshToken(user._id.toString());

  res
    .cookie(COOKIE_NAMES.refresh, refreshToken, cookieOptions)
    .json(buildUserPayload(user, accessToken));
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (uses refresh cookie)
const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAMES.refresh];
  if (!token) {
    res.status(401);
    throw new Error("No refresh token");
  }

  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.userId);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const newAccess = generateAccessToken(user._id.toString());
  const newRefresh = signRefreshToken(user._id.toString());

  res
    .cookie(COOKIE_NAMES.refresh, newRefresh, cookieOptions)
    .json(buildUserPayload(user, newAccess));
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  res
    .cookie(COOKIE_NAMES.refresh, "", { ...cookieOptions, maxAge: 0 })
    .json({ success: true });
});

export { registerUser, loginUser, refreshToken, logoutUser };
