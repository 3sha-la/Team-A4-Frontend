import { Router } from 'express';
import {
  getAdminDashboardStats,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  deleteCategory,
  updateStock,
  getAdminOrders,
  updateOrderStatus,
  getSalesReports,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();

router.use(protect);
router.use(adminOnly);

router.get('/dashboard', getAdminDashboardStats);

router
  .route('/products')
  .get(getAdminProducts)
  .post(createProduct);

router
  .route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

router
  .route('/categories')
  .get(getCategories)
  .post(createCategory);

router.delete('/categories/:id', deleteCategory);

router.put('/stock/:id', updateStock);

router.get('/orders', getAdminOrders);
router.put('/orders/:id/status', updateOrderStatus);

router.get('/reports/sales', getSalesReports);

export default router;
