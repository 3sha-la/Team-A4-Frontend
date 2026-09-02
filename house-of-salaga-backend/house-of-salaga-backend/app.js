import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';

import {
  errorHandler,
  notFoundHandler,
} from './middleware/errorHandler.js';

const app = express();

app.use(helmet());

const allowedOrigin =
  process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? 'combined'
      : 'dev',
  ),
);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'House of Salaga API is running',
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/delivery', deliveryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
