const Review = require("../models/Review");

// =============================================
// ADD REVIEW
// =============================================
const addReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, review } = req.body;

  try {
    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    const newReview = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      review,
      status: "Pending",
    });

    res.status(201).json({
      message: "Review submitted successfully. Waiting for admin approval.",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// EDIT REVIEW
// =============================================
const editReview = async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;

  try {
    const existingReview = await Review.findById(id);

    if (!existingReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (existingReview.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only edit your own review",
      });
    }

    if (rating !== undefined) {
      existingReview.rating = rating;
    }

    if (review !== undefined) {
      existingReview.review = review;
    }

    // Review should be checked again after editing
    existingReview.status = "Pending";

    const updatedReview = await existingReview.save();

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// DELETE OWN REVIEW
// =============================================
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own review",
      });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// GET APPROVED REVIEWS FOR ONE PRODUCT
// =============================================
const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({
      product: productId,
      status: "Approved",
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// GET CURRENT USER REVIEWS
// =============================================
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user.id,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// RATING CALCULATION
// =============================================
const getProductRating = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({
      product: productId,
      status: "Approved",
    });

    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return res.status(200).json({
        averageRating: 0,
        totalReviews: 0,
      });
    }

    const ratingTotal = reviews.reduce(
      (total, review) => total + review.rating,
      0,
    );

    const averageRating = ratingTotal / totalReviews;

    res.status(200).json({
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// ADMIN - GET ALL REVIEWS
// =============================================
const getAllReviews = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const reviews = await Review.find(filter)
      .populate("user", "name email")
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// ADMIN - APPROVE / REJECT REVIEW
// =============================================
const updateReviewStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid review status",
      });
    }

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    review.status = status;

    const updatedReview = await review.save();

    res.status(200).json({
      message: `Review status changed to ${status}`,
      review: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// ADMIN - DELETE REVIEW
// =============================================
const adminDeleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
      message: "Review deleted successfully by admin",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================================
// ADMIN - REVIEW DASHBOARD STATISTICS
// =============================================
const getReviewStats = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();

    const pendingReviews = await Review.countDocuments({
      status: "Pending",
    });

    const approvedReviews = await Review.countDocuments({
      status: "Approved",
    });

    const rejectedReviews = await Review.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      totalReviews,
      pendingReviews,
      approvedReviews,
      rejectedReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  editReview,
  deleteReview,
  getProductReviews,
  getMyReviews,
  getProductRating,
  getAllReviews,
  updateReviewStatus,
  adminDeleteReview,
  getReviewStats,
};
