import express from 'express';
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
    getSalesReports
} from '../controllers/adminController.js';

const router = express.Router();

// Dashboard Route
router.route('/dashboard').get(getAdminDashboardStats);

// Product Management Routes
router.route('/products')
    .get(getAdminProducts)
    .post(createProduct);

router.route('/products/:id')
    .put(updateProduct)
    .delete(deleteProduct);

// Category Management Routes
router.route('/categories')
    .get(getCategories)
    .post(createCategory);

router.route('/categories/:id')
    .delete(deleteCategory);

// Stock Management Route
router.route('/stock/:id').put(updateStock);

// Order Management Routes
router.route('/orders').get(getAdminOrders);
router.route('/orders/:id/status').put(updateOrderStatus);

// Sales & Performance Reports Route
router.route('/reports/sales').get(getSalesReports);

export default router;