import { Router } from 'express';
import Category from '../models/categoryModel.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
