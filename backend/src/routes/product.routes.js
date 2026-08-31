import { Router } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const router = Router();

function requireDatabase(request, response, next) {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      success: false,
      message: 'Database is not connected',
    });
  }

  next();
}

function productIdFilter(value) {
  return mongoose.isValidObjectId(value) ? { _id: value } : { code: value };
}

router.use(requireDatabase);

router.get('/', async (request, response, next) => {
  try {
    const { category, search, includeInactive } = request.query;
    const filter = includeInactive === 'true' ? {} : { isActive: true };

    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const products = await Product.find(filter).sort({ createdAt: -1 });
    response.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const product = await Product.findOne({
      ...productIdFilter(request.params.id),
      isActive: true,
    });

    if (!product) {
      return response.status(404).json({ success: false, message: 'Product not found' });
    }

    response.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const product = await Product.create(request.body);
    response.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

async function updateProduct(request, response, next) {
  try {
    const product = await Product.findOneAndUpdate(
      productIdFilter(request.params.id),
      request.body,
      { new: true, runValidators: true },
    );

    if (!product) {
      return response.status(404).json({ success: false, message: 'Product not found' });
    }

    response.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

router.put('/:id', updateProduct);
router.patch('/:id', updateProduct);

router.delete('/:id', async (request, response, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      productIdFilter(request.params.id),
      { isActive: false },
      { new: true },
    );

    if (!product) {
      return response.status(404).json({ success: false, message: 'Product not found' });
    }

    response.json({ success: true, message: 'Product deleted', data: product });
  } catch (error) {
    next(error);
  }
});

export default router;