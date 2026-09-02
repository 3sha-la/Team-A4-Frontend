import { Router } from 'express';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  moveWishlistToCart,
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.route('/').post(addToWishlist).get(getWishlist);
router.post('/move-to-cart/:id', moveWishlistToCart);
router.delete('/:id', removeFromWishlist);

export default router;
