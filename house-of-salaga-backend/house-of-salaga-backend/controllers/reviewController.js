import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';

export const addReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { rating, review } = req.body;

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    const newReview = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      review,
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully. Waiting for admin approval.',
      review: newReview,
    });
  } catch (error) {
    next(error);
  }
};

export const editReview = async (req, res, next) => {
  try {
    const existingReview = await Review.findById(req.params.id);

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    if (existingReview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own review',
      });
    }

    if (req.body.rating !== undefined) {
      existingReview.rating = req.body.rating;
    }

    if (req.body.review !== undefined) {
      existingReview.review = req.body.review;
    }

    existingReview.status = 'Pending';
    const updatedReview = await existingReview.save();

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review: updatedReview,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own review',
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      status: 'Approved',
    })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      user: req.user._id,
    })
      .populate('product', 'name image price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductRating = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      status: 'Approved',
    });

    if (reviews.length === 0) {
      return res.status(200).json({
        success: true,
        averageRating: 0,
        totalReviews: 0,
      });
    }

    const total = reviews.reduce((sum, item) => sum + item.rating, 0);

    res.status(200).json({
      success: true,
      averageRating: Number((total / reviews.length).toFixed(1)),
      totalReviews: reviews.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const reviews = await Review.find(filter)
      .populate('user', 'name email')
      .populate('product', 'name image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReviewStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid review status',
      });
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    review.status = status;
    const updatedReview = await review.save();

    res.status(200).json({
      success: true,
      message: `Review status changed to ${status}`,
      review: updatedReview,
    });
  } catch (error) {
    next(error);
  }
};

export const adminDeleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully by admin',
    });
  } catch (error) {
    next(error);
  }
};

export const getReviewStats = async (req, res, next) => {
  try {
    const [totalReviews, pendingReviews, approvedReviews, rejectedReviews] =
      await Promise.all([
        Review.countDocuments(),
        Review.countDocuments({ status: 'Pending' }),
        Review.countDocuments({ status: 'Approved' }),
        Review.countDocuments({ status: 'Rejected' }),
      ]);

    res.status(200).json({
      success: true,
      totalReviews,
      pendingReviews,
      approvedReviews,
      rejectedReviews,
    });
  } catch (error) {
    next(error);
  }
};
