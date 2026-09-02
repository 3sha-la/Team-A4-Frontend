import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { apiFetch, getAuthToken } from "../lib/api";

import { normalizeProduct } from "../lib/normalizers";
import { useWishlist } from "../context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);

  const [rating, setRating] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  const [selectedColor, setSelectedColor] = useState("Black");

  // REVIEW STATES
  const [userRating, setUserRating] = useState(0);

  const [reviewText, setReviewText] = useState("");

  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([
      apiFetch(`/products/${id}`),

      apiFetch(`/reviews/product/${id}/rating`).catch(() => ({
        averageRating: 0,
        totalReviews: 0,
      })),
    ])
      .then(([productData, ratingData]) => {
        if (!active) return;

        setProduct(normalizeProduct(productData.data));

        setRating({
          averageRating: Number(ratingData.averageRating) || 0,

          totalReviews: Number(ratingData.totalReviews) || 0,
        });
      })
      .catch(() => {
        if (active) {
          setProduct(null);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToBag = async () => {
    if (!getAuthToken()) {
      navigate("/login");
      return;
    }

    try {
      await apiFetch("/cart/add", {
        method: "POST",
        auth: true,
        body: {
          productId: product.id,
          quantity: 1,
        },
      });

      navigate("/cart");
    } catch (error) {
      alert(error.message);
    }
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = async () => {
    if (!getAuthToken()) {
      navigate("/login");
      return;
    }

    try {
      await toggleWishlist(product);
    } catch (error) {
      alert(error.message);
    }
  };

  // =========================
  // SUBMIT REVIEW
  // =========================
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    setReviewMessage("");

    if (!getAuthToken()) {
      navigate("/login");
      return;
    }

    if (userRating < 1) {
      setReviewMessage("Please select a rating.");
      return;
    }

    if (!reviewText.trim()) {
      setReviewMessage("Please write your review.");
      return;
    }

    try {
      setReviewSubmitting(true);

      const data = await apiFetch(`/reviews/${product.id}`, {
        method: "POST",
        auth: true,

        // IMPORTANT:
        // backend expects "review", not "comment"
        body: {
          rating: userRating,
          review: reviewText.trim(),
        },
      });

      setReviewMessage(
        data.message ||
          "Review submitted successfully. Waiting for admin approval.",
      );

      // clear form
      setUserRating(0);
      setReviewText("");

      // reload rating
      // Note: pending review will not affect average
      // until admin approves it
      const ratingData = await apiFetch(
        `/reviews/product/${product.id}/rating`,
      );

      setRating({
        averageRating: Number(ratingData.averageRating) || 0,

        totalReviews: Number(ratingData.totalReviews) || 0,
      });
    } catch (error) {
      setReviewMessage(error.message || "Unable to submit review.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  // =========================
  // PRODUCT NOT FOUND
  // =========================
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>

        <Link
          to="/shop"
          className="bg-[#FFD600] px-6 py-2 rounded-full font-bold"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const saved = isInWishlist(product.id);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans text-gray-900">
      <div className="w-[90%] mx-auto">
        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:opacity-75"
          >
            ← Back to shop
          </Link>
        </div>

        {/* ========================= */}
        {/* PRODUCT SECTION */}
        {/* ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* PRODUCT IMAGE */}
          <div className="bg-[#EFECE6] rounded-2xl p-4 overflow-hidden">
            {product.image || product.img ? (
              <img
                src={product.image || product.img}
                alt={product.name}
                className="w-full h-[520px] object-cover rounded-xl"
              />
            ) : (
              <div
                className="w-full h-[520px] rounded-xl"
                style={{
                  backgroundImage: product.swatch,
                }}
              />
            )}
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="flex flex-col pt-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              {product.category || "AUDIO"} • {product.code || "BEST SELLER"}
            </p>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3 leading-none">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mb-4 text-xs font-bold">
              <div className="text-yellow-400 tracking-widest">★★★★★</div>

              <span>
                {rating.averageRating.toFixed(1)} • {rating.totalReviews}{" "}
                reviews
              </span>
            </div>

            {/* PRICE */}
            <div className="text-3xl font-black mb-4">
              LKR {Number(product.price || 0).toLocaleString()}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description ||
                "Deep, detailed sound with adaptive noise cancellation and a 35-hour battery. Built for the ride, the focus session and the encore."}
            </p>

            {/* COLOR */}
            <div className="mb-6">
              <p className="text-xs font-bold mb-3">
                Finish •{" "}
                <span className="text-gray-500 font-normal">
                  {selectedColor}
                </span>
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedColor("Black")}
                  className={`w-8 h-8 rounded-full bg-black border-2 ${
                    selectedColor === "Black"
                      ? "ring-2 ring-black ring-offset-2"
                      : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setSelectedColor("White")}
                  className={`w-8 h-8 rounded-full bg-[#EFECE6] border border-gray-300 ${
                    selectedColor === "White"
                      ? "ring-2 ring-black ring-offset-2"
                      : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setSelectedColor("Yellow")}
                  className={`w-8 h-8 rounded-full bg-[#FFD600] ${
                    selectedColor === "Yellow"
                      ? "ring-2 ring-black ring-offset-2"
                      : ""
                  }`}
                />
              </div>
            </div>

            {/* CART + WISHLIST */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToBag}
                className="flex-1 bg-[#FFD600] hover:bg-[#e6c200] text-black font-extrabold py-3.5 rounded-full text-sm transition"
              >
                Add to bag • LKR {Number(product.price || 0).toLocaleString()}
              </button>

              <button
                onClick={handleWishlist}
                className={`p-3.5 border rounded-2xl transition flex items-center justify-center text-xl ${
                  saved
                    ? "bg-[#FFD600] border-[#FFD600]"
                    : "border-gray-200 hover:border-black"
                }`}
              >
                {saved ? "♥" : "♡"}
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-200 py-6 mb-6 text-center">
              <div>
                <div className="text-lg font-bold mb-1">⚡</div>

                <p className="text-[10px] font-black uppercase tracking-wider text-gray-700">
                  35H BATTERY
                </p>
              </div>

              <div>
                <div className="text-lg font-bold mb-1">🔇</div>

                <p className="text-[10px] font-black uppercase tracking-wider text-gray-700">
                  ADAPTIVE ANC
                </p>
              </div>

              <div>
                <div className="text-lg font-bold mb-1">📶</div>

                <p className="text-[10px] font-black uppercase tracking-wider text-gray-700">
                  BT 5.3
                </p>
              </div>
            </div>

            {/* DELIVERY */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase mb-1">
                Delivery & returns
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                Ships today when ordered before 2pm. Free delivery on this item,
                with 30-day returns.
              </p>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* RATE & REVIEW - TWO SIDE LAYOUT */}
        {/* ================================= */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm mb-16">
          <div className="mb-7">
            <h2 className="text-2xl font-black text-black">Rate & Review</h2>

            <p className="text-sm text-gray-500 mt-1">
              Share your experience with this product.
            </p>
          </div>

          <form onSubmit={handleSubmitReview}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT SIDE - RATING */}
              <div className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-7 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                  Your Rating
                </p>

                <div className="flex items-center gap-2 mb-5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className={`text-4xl md:text-5xl leading-none transition ${
                        star <= userRating
                          ? "text-[#FFD600]"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-black">
                    {userRating > 0 ? userRating : "0"}
                  </span>

                  <span className="text-sm text-gray-500 mb-1">/ 5</span>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Click one of the stars above to select your rating.
                </p>
              </div>

              {/* RIGHT SIDE - REVIEW */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Your Review
                </label>

                <textarea
                  rows="7"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us what you think about this product..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-4 text-sm text-black outline-none transition focus:border-[#FFD600] focus:bg-white"
                />

                {/* MESSAGE */}
                {reviewMessage && (
                  <p
                    className={`mt-3 text-xs font-semibold ${
                      reviewMessage.toLowerCase().includes("successfully")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {reviewMessage}
                  </p>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="mt-4 w-full rounded-xl bg-[#FFD600] py-3.5 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {reviewSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ========================= */}
        {/* PAIR IT WITH */}
        {/* ========================= */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase">Pair it with.</h2>

            <Link to="/shop" className="text-xs font-bold uppercase underline">
              See all accessories
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Fuse 3-in-1 Dock</p>

                <p className="text-xs text-gray-500">LKR 8,900 • Charging</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Arc Headphone Stand</p>

                <p className="text-xs text-gray-500">LKR 3,900 • Desk</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Field Tech Pouch</p>

                <p className="text-xs text-gray-500">LKR 4,500 • Travel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
