const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    method: {
      type: String,
      enum: ['card', 'paypal', 'cod'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    currency: { type: String, default: 'LKR' },
    confirmationCode: { type: String, default: '' },
    paymentReference: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
