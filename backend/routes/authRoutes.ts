import express from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/authController";
import { authLimiter } from "../config/security";

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;
