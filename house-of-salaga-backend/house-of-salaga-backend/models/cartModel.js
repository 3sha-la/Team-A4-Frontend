import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    itemTotal: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

cartSchema.methods.calculateTotals = function calculateTotals(taxRate = 0, shippingFee = 0) {
  this.subtotal = this.items.reduce((acc, item) => {
    item.itemTotal = item.price * item.quantity;
    return acc + item.itemTotal;
  }, 0);

  this.tax = this.subtotal * taxRate;
  this.shippingFee = shippingFee;
  this.total = this.subtotal + this.tax + this.shippingFee;
};

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
