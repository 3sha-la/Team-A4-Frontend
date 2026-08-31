import { Router } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const router = Router();

router.get('/', async (request, response, next) => {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      success: false,
      message: 'Database is not connected',
    });
  }

  try {
    const categories = await Product.distinct('category', { isActive: true });
    response.json({ success: true, count: categories.length, data: categories.sort() });
  } catch (error) {
    next(error);
  }
});

export default router;