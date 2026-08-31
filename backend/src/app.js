import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import healthRoutes from './routes/health.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import deliveryRoutes from './routes/delivery.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

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
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/orders', ordersRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;