import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, min: 1 },
        image: { type: String, default: '' },
        price: { type: Number, required: true, min: 0 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      postalCode: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    paymentMethod: {
      type: String,
      default: 'Cash on Delivery',
    },
    itemsPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
