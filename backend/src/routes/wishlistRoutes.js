import express from 'express';
import { 
    addToWishlist, 
    getWishlist, 
    removeFromWishlist,
    moveWishlistToCart 
} from '../controllers/wishlistController.js';

const router = express.Router();

router.route('/').post(addToWishlist).get(getWishlist);
router.route('/:id').delete(removeFromWishlist);
router.route('/move-to-cart/:id').post(moveWishlistToCart);

export default router;