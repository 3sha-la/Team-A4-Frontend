import { Router } from 'express';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

function productIdFilter(value) {
  return mongoose.isValidObjectId(value)
    ? { _id: value }
    : { code: value.toUpperCase() };
}

router.get('/', async (req, res, next) => {
  try {
    const { category, search, includeInactive } = req.query;

    const filter =
      includeInactive === 'true' && req.user?.role === 'admin'
        ? {}
        : { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      ...productIdFilter(req.params.id),
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

async function updateProduct(req, res, next) {
  try {
    const product = await Product.findOneAndUpdate(
      productIdFilter(req.params.id),
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

router.put('/:id', protect, adminOnly, updateProduct);
router.patch('/:id', protect, adminOnly, updateProduct);

router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      productIdFilter(req.params.id),
      { isActive: false },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
