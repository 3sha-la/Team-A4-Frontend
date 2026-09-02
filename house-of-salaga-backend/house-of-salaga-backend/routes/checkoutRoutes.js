import { Router } from 'express';
import mongoose from 'mongoose';
import {
  createCheckout,
  getCheckout,
} from '../controllers/checkoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.post('/', createCheckout);

router.get('/:checkoutId', (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.checkoutId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid checkout ID',
    });
  }

  return getCheckout(req, res, next);
});

export default router;
