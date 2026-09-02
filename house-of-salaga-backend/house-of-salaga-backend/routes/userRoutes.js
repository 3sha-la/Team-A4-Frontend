import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/profile', protect, getUserProfile);

router.put(
  '/profile',
  protect,
  [
    body('email')
      .optional()
      .isEmail()
      .withMessage('Valid email is required'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validate,
  updateUserProfile,
);

router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  forgotPassword,
);

router.post(
  '/reset-password',
  [
    body('resetToken')
      .notEmpty()
      .withMessage('Reset token is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validate,
  resetPassword,
);

export default router;
