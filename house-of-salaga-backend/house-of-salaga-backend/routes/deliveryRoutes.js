import { Router } from 'express';
import mongoose from 'mongoose';
import {
  createDelivery,
  getDeliveryByOrder,
  updateDelivery,
} from '../controllers/deliveryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.post('/', createDelivery);

router.get('/:orderId', (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.orderId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid order ID',
    });
  }

  return getDeliveryByOrder(req, res, next);
});

router.put('/:deliveryId', (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.deliveryId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid delivery ID',
    });
  }

  return updateDelivery(req, res, next);
});

export default router;
