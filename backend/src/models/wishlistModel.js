import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    wishlistItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
        }
    ]
}, {
    timestamps: true
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;