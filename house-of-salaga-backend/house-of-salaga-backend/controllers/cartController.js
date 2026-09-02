import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

function recalculate(cart) {
  cart.calculateTotals(0, 0);
}

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price image stock isActive',
    );

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product._id.toString(),
    );

    const existingQuantity = itemIndex >= 0 ? cart.items[itemIndex].quantity : 0;

    if (existingQuantity + qty > product.stock) {
      return res.status(400).json({
        success: false,
        message: 'Requested quantity exceeds available stock',
      });
    }

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += qty;
      cart.items[itemIndex].price = product.price;
      cart.items[itemIndex].name = product.name;
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
      });
    }

    recalculate(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!Number.isInteger(qty)) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be an integer',
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex < 0) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    if (qty <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      const product = await Product.findById(productId);

      if (!product || !product.isActive) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      if (qty > product.stock) {
        return res.status(400).json({
          success: false,
          message: 'Requested quantity exceeds available stock',
        });
      }

      cart.items[itemIndex].quantity = qty;
      cart.items[itemIndex].price = product.price;
    }

    recalculate(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    recalculate(cart);
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};
