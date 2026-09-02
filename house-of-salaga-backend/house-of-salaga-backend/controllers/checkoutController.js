import Checkout from '../models/checkoutModel.js';

export const createCheckout = async (req, res, next) => {
  try {
    const { cartItems, totalAmount, shippingAddress } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart items are required',
      });
    }

    if (totalAmount === undefined || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Total amount and shipping address are required',
      });
    }

    const checkout = await Checkout.create({
      user: req.user._id,
      cartItems,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({
      success: true,
      message: 'Checkout initiated successfully',
      data: checkout,
    });
  } catch (error) {
    next(error);
  }
};

export const getCheckout = async (req, res, next) => {
  try {
    const checkout = await Checkout.findById(req.params.checkoutId);

    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: 'Checkout not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      checkout.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this checkout',
      });
    }

    res.json({
      success: true,
      data: checkout,
    });
  } catch (error) {
    next(error);
  }
};
