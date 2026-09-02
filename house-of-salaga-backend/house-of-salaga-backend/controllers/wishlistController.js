import Wishlist from '../models/wishlistModel.js';
import Product from '../models/productModel.js';
import Cart from '../models/cartModel.js';

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        wishlistItems: [],
      });
    }

    const exists = wishlist.wishlistItems.some(
      (item) => item.product.toString() === product._id.toString(),
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist',
      });
    }

    wishlist.wishlistItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    });

    await wishlist.save();

    res.status(201).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    }).populate('wishlistItems.product', 'name price image stock isActive');

    res.status(200).json({
      success: true,
      wishlist: wishlist || {
        user: req.user._id,
        wishlistItems: [],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found',
      });
    }

    wishlist.wishlistItems = wishlist.wishlistItems.filter(
      (item) => item.product.toString() !== req.params.id,
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const moveWishlistToCart = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found',
      });
    }

    const itemIndex = wishlist.wishlistItems.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex < 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in wishlist',
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.stock < 1) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const cartIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (cartIndex >= 0) {
      if (cart.items[cartIndex].quantity + 1 > product.stock) {
        return res.status(400).json({
          success: false,
          message: 'Requested quantity exceeds available stock',
        });
      }

      cart.items[cartIndex].quantity += 1;
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    cart.calculateTotals(0, 0);
    await cart.save();

    wishlist.wishlistItems.splice(itemIndex, 1);
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Item moved to cart',
      cart,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};
