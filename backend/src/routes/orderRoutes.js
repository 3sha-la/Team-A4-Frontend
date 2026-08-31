import express from 'express';
import { getMyOrders } from '../controllers/orderController.js';

const router = express.Router();

// Temporarily without protect middleware until auth middleware is added
router.route('/myorders').get(getMyOrders);

export default router;