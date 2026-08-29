import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import healthRoutes from './routes/health.routes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (request, response) => {
  response.json({ success: true, message: 'House of Salaga API is running' });
});

app.use('/api/health', healthRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;