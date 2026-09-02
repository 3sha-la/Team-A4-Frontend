import { Router } from 'express';
import { body } from 'express-validator';
import {
  addReview,
  editReview,
  deleteReview,
  getProductReviews,
  getMyReviews,
  getProductRating,
  getAllReviews,
  updateReviewStatus,
  adminDeleteReview,
  getReviewStats,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/admin/stats', protect, adminOnly, getReviewStats);
router.get('/admin/all', protect, adminOnly, getAllReviews);
router.patch(
  '/admin/:id/status',
  protect,
  adminOnly,
  updateReviewStatus,
);
router.delete('/admin/:id', protect, adminOnly, adminDeleteReview);

router.get('/my-reviews', protect, getMyReviews);

router.get('/product/:productId/rating', getProductRating);
router.get('/product/:productId', getProductReviews);

router.post(
  '/:productId',
  protect,
  [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('review')
      .trim()
      .notEmpty()
      .withMessage('Review is required'),
  ],
  validate,
  addReview,
);

router.put(
  '/:id',
  protect,
  [
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('review')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Review cannot be empty'),
  ],
  validate,
  editReview,
);

router.delete('/:id', protect, deleteReview);

export default router;
