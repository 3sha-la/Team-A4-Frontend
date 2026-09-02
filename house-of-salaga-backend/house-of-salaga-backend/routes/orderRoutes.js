import { Router } from 'express';
import mongoose from 'mongoose';
import {
  createOrder,
  confirmOrder,
  getMyOrders,
  getOrderHistory,
  getOrderHistoryByUser,
  getSingleOrder,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

router.use(protect);

router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/history', getOrderHistory);
router.get(
  '/history/:userId',
  adminOnly,
  getOrderHistoryByUser,
);

router.post('/:orderId/confirm', confirmOrder);

router.get('/:orderId', (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.orderId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid order ID',
    });
  }

  return getSingleOrder(req, res, next);
});

export default router;
