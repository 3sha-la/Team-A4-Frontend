import Wishlist from '../models/wishlistModel.js';

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { productId, name, image, price } = req.body;
        const userId = req.user ? req.user._id : req.body.userId;

        let wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            const itemExists = wishlist.wishlistItems.find(
                (item) => item.product.toString() === productId.toString()
            );

            if (itemExists) {
                return res.status(400).json({ message: 'Product already in wishlist' });
            }

            wishlist.wishlistItems.push({ product: productId, name, image, price });
            await wishlist.save();
            res.status(200).json(wishlist);
        } else {
            const newWishlist = await Wishlist.create({
                user: userId,
                wishlistItems: [{ product: productId, name, image, price }]
            });
            res.status(201).json(newWishlist);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.query.userId;
        
        const wishlist = await Wishlist.findOne({ user: userId }).populate('wishlistItems.product', 'name price image');

        if (wishlist) {
            res.status(200).json(wishlist);
        } else {
            res.status(200).json({ wishlistItems: [] });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user ? req.user._id : req.body.userId;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            wishlist.wishlistItems = wishlist.wishlistItems.filter(
                (item) => item.product.toString() !== productId.toString()
            );

            await wishlist.save();
            res.status(200).json(wishlist);
        } else {
            res.status(404).json({ message: 'Wishlist not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Move item from wishlist to cart (removes from wishlist)
// @route   POST /api/wishlist/move-to-cart/:id
// @access  Private
export const moveWishlistToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user ? req.user._id : req.body.userId;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const itemIndex = wishlist.wishlistItems.findIndex(
            (item) => item.product.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }

        const itemToMove = wishlist.wishlistItems[itemIndex];

        wishlist.wishlistItems.splice(itemIndex, 1);
        await wishlist.save();

        res.status(200).json({
            message: 'Item moved from wishlist successfully',
            cartItem: itemToMove,
            wishlist
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};