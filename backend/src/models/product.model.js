import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    swatch: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1 });
productSchema.index({ name: 'text', code: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);