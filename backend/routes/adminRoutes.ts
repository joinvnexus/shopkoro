import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import { getAdminProfile } from '../controllers/adminController';

const router = express.Router();

// All admin routes require authentication and admin role
router.get('/profile', protect, admin, getAdminProfile);

export default router;