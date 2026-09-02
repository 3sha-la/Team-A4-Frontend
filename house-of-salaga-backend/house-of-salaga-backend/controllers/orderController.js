import Order from '../models/orderModel.js';

function canAccessOrder(user, order) {
  return (
    user.role === 'admin' ||
    order.user.toString() === user._id.toString()
  );
}

export const createOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items provided',
      });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (!canAccessOrder(req.user, order)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order',
      });
    }

    order.status = 'Confirmed';

    // Do not mark an order as paid from a normal customer confirmation request.
    // Payment status should only be changed after trusted server-side payment
    // verification or by a protected admin/payment workflow.
    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Order confirmed successfully',
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderHistory = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderHistoryByUser = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        userId: req.params.userId,
        orders,
        totalOrders: orders.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      'user',
      'name email',
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const ownerId = order.user?._id || order.user;

    if (
      req.user.role !== 'admin' &&
      ownerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
