import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update-quantity', updateQuantity);
router.delete('/remove/:productId', removeFromCart);

export default router;
