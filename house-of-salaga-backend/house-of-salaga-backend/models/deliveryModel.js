import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDate: Date,
    preferredTimeSlot: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['scheduled', 'processing', 'out-for-delivery', 'delivered', 'cancelled'],
      default: 'scheduled',
    },
  },
  { timestamps: true },
);

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;
