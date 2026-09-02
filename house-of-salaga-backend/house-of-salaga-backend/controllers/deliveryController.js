import Delivery from '../models/deliveryModel.js';
import Order from '../models/orderModel.js';

export const createDelivery = async (req, res, next) => {
  try {
    const {
      orderId,
      address,
      preferredDate,
      preferredTimeSlot,
    } = req.body;

    if (!orderId || !address) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and delivery address are required',
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      order.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create delivery for this order',
      });
    }

    const exists = await Delivery.findOne({ order: orderId });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Delivery already exists for this order',
      });
    }

    const delivery = await Delivery.create({
      user: order.user,
      order: orderId,
      address,
      preferredDate,
      preferredTimeSlot,
    });

    res.status(201).json({
      success: true,
      message: 'Delivery details created successfully',
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

export const getDeliveryByOrder = async (req, res, next) => {
  try {
    const delivery = await Delivery.findOne({
      order: req.params.orderId,
    }).populate('order');

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      delivery.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this delivery',
      });
    }

    res.json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.deliveryId);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found',
      });
    }

    if (
      req.user.role !== 'admin' &&
      delivery.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this delivery',
      });
    }

    const {
      address,
      preferredDate,
      preferredTimeSlot,
      status,
    } = req.body;

    if (address !== undefined) delivery.address = address;
    if (preferredDate !== undefined) delivery.preferredDate = preferredDate;
    if (preferredTimeSlot !== undefined) {
      delivery.preferredTimeSlot = preferredTimeSlot;
    }

    if (status !== undefined) {
      if (
        req.user.role !== 'admin' &&
        !['scheduled', 'cancelled'].includes(status)
      ) {
        return res.status(403).json({
          success: false,
          message: 'Only admin can set this delivery status',
        });
      }

      delivery.status = status;
    }

    await delivery.save();

    res.json({
      success: true,
      message: 'Delivery details updated successfully',
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};
