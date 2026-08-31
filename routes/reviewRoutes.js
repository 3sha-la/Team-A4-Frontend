const express = require("express");
const { body } = require("express-validator");

const {
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
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { validate } = require("../middleware/validateMiddleware");

const router = express.Router();

// =============================================
// ADMIN ROUTES
// =============================================

// Get dashboard counts
router.get("/admin/stats", protect, adminOnly, getReviewStats);

// Get all reviews
router.get("/admin/all", protect, adminOnly, getAllReviews);

// Approve / Reject
router.patch("/admin/:id/status", protect, adminOnly, updateReviewStatus);

// Admin delete review
router.delete("/admin/:id", protect, adminOnly, adminDeleteReview);

// =============================================
// USER ROUTES
// =============================================

// Get logged-in user's reviews
router.get("/my-reviews", protect, getMyReviews);

// Add review
router.post(
  "/:productId",
  protect,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),

    body("review").notEmpty().withMessage("Review is required"),
  ],
  validate,
  addReview,
);

// Edit review
router.put(
  "/:id",
  protect,
  [
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),

    body("review").optional().notEmpty().withMessage("Review cannot be empty"),
  ],
  validate,
  editReview,
);

// Delete own review
router.delete("/:id", protect, deleteReview);

// =============================================
// PUBLIC ROUTES
// =============================================

// Get approved reviews for product
router.get("/product/:productId", getProductReviews);

// Get rating calculation
router.get("/product/:productId/rating", getProductRating);

module.exports = router;
