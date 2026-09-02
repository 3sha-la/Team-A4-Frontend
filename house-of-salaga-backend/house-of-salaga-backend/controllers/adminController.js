import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const [totalOrders, totalUsers, totalProducts, revenueData] =
      await Promise.all([
        Order.countDocuments(),
        User.countDocuments(),
        Product.countDocuments({ isActive: true }),
        Order.aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: '$totalPrice' },
            },
          },
        ]),
      ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalUsers,
        totalProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product removed successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({
      name: new RegExp(`^${name.trim()}$`, 'i'),
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateStock = async (req, res, next) => {
  try {
    const { stock } = req.body;

    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock must be a non-negative integer',
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    product.stock = Number(stock);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const allowed = [
      'Pending',
      'Confirmed',
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
    ];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status',
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = req.body.status;

    if (req.body.status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    } else if (order.isDelivered && req.body.status !== 'Delivered') {
      order.isDelivered = false;
      order.deliveredAt = undefined;
    }

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getSalesReports = async (req, res, next) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          totalSales: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      salesData,
    });
  } catch (error) {
    next(error);
  }
};
