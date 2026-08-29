import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

// @desc    Get admin dashboard statistics (Revenue, Orders, Users, Products)
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getAdminDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        const revenueData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' }
                }
            }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        res.status(200).json({
            success: true,
            stats: {
                totalRevenue,
                totalOrders,
                totalUsers,
                totalProducts
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private/Admin
export const getAdminProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category', 'name');
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new product
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json({ success: true, product: createdProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Private/Admin
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new category
// @route   POST /api/admin/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = await Category.create({ name, description });
        res.status(201).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/admin/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update product stock
// @route   PUT /api/admin/stock/:id
// @access  Private/Admin
export const updateStock = async (req, res) => {
    try {
        const { countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: 'Stock updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAdminOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = req.body.status || order.status;
        
        if (req.body.status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.status(200).json({ success: true, message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get sales and performance reports
// @route   GET /api/admin/reports/sales
// @access  Private/Admin
export const getSalesReports = async (req, res) => {
    try {
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    totalSales: { $sum: '$totalPrice' },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            salesData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};