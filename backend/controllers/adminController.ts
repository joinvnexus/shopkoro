import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
const getAdminProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // Return admin profile data
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    createdAt: req.user.createdAt,
    // lastLogin: req.user.lastLogin || new Date(), // placeholder, would need to track in model
  });
});

export { getAdminProfile };