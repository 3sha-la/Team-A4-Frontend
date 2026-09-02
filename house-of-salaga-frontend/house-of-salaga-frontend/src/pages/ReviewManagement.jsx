import React, { useEffect, useState } from "react";

import { apiFetch } from "../lib/api";
import AdminSidebar from "../components/AdminSidebar";

export default function ReviewManagement() {
  const [reviews, setReviews] = useState([]);

  const [filter, setFilter] = useState("All");

  // =========================
  // MAP BACKEND REVIEW
  // =========================
  const mapReview = (item) => ({
    id: item._id || item.id,

    product: item.product?.name || "Product",

    customer: item.user?.name || "Customer",

    rating: `${"★".repeat(Number(item.rating) || 0)}${"☆".repeat(
      Math.max(0, 5 - (Number(item.rating) || 0)),
    )}`,

    // IMPORTANT:
    // backend stores review text in "review"
    review: item.review || "No review",

    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "",

    status: item.status === "Rejected" ? "Removed" : item.status || "Pending",
  });

  // =========================
  // LOAD REVIEWS
  // =========================
  const loadReviews = async () => {
    try {
      const data = await apiFetch("/reviews/admin/all", {
        auth: true,
      });

      // Backend may return:
      // [...]
      // or { reviews: [...] }
      const reviewList = Array.isArray(data) ? data : data.reviews || [];

      setReviews(reviewList.map(mapReview));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // =========================
  // STATUS CHANGE
  // =========================
  const handleStatusChange = async (id, newStatus) => {
    try {
      const backendStatus = newStatus === "Removed" ? "Rejected" : newStatus;

      await apiFetch(`/reviews/admin/${id}/status`, {
        method: "PATCH",
        auth: true,
        body: {
          status: backendStatus,
        },
      });

      setReviews((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: newStatus,
              }
            : item,
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // =========================
  // DELETE REVIEW
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) return;

    try {
      await apiFetch(`/reviews/admin/${id}`, {
        method: "DELETE",
        auth: true,
      });

      setReviews((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredReviews = reviews.filter((item) => {
    if (filter === "All") {
      return true;
    }

    return item.status?.toLowerCase() === filter.toLowerCase();
  });

  // =========================
  // COUNTS
  // =========================
  const totalReviews = reviews.length;

  const pendingCount = reviews.filter(
    (review) => review.status === "Pending",
  ).length;

  const approvedCount = reviews.filter(
    (review) => review.status === "Approved",
  ).length;

  const removedCount = reviews.filter(
    (review) => review.status === "Removed",
  ).length;

  return (
    <div className="flex min-h-screen bg-[#F4F4F4] font-sans text-gray-900">
      {/* SAME ADMIN SIDEBAR */}
      <AdminSidebar />

      {/* REVIEW PAGE CONTENT */}
      <main className="flex-1 min-w-0 p-10">
        <div className="max-w-[92%] mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-black tracking-tight">
              Review Moderation
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Approve, reject, or manage customer product reviews
            </p>
          </div>

          {/* ========================= */}
          {/* STAT CARDS */}
          {/* ========================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* TOTAL */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h4 className="text-sm font-bold text-gray-600 mb-2">
                Total Reviews
              </h4>

              <span className="text-4xl font-black text-black">
                {totalReviews}
              </span>
            </div>

            {/* PENDING */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h4 className="text-sm font-bold text-gray-600 mb-2">Pending</h4>

              <span className="text-4xl font-black text-black">
                {pendingCount}
              </span>
            </div>

            {/* APPROVED */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h4 className="text-sm font-bold text-gray-600 mb-2">Approved</h4>

              <span className="text-4xl font-black text-black">
                {approvedCount}
              </span>
            </div>

            {/* REMOVED */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h4 className="text-sm font-bold text-gray-600 mb-2">Removed</h4>

              <span className="text-4xl font-black text-black">
                {removedCount}
              </span>
            </div>
          </div>

          {/* ========================= */}
          {/* FILTER BUTTONS */}
          {/* ========================= */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {["All", "Pending", "Approved", "Removed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition ${
                  filter === tab
                    ? "bg-[#FFD700] text-black shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ========================= */}
          {/* REVIEW TABLE */}
          {/* ========================= */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-max">
              {/* TABLE HEADER */}
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Product</th>

                  <th className="py-4 px-6">Customer</th>

                  <th className="py-4 px-6">Rating</th>

                  <th className="py-4 px-6">Review</th>

                  <th className="py-4 px-6">Date</th>

                  <th className="py-4 px-6">Status</th>

                  <th className="py-4 px-6 text-right min-w-[200px]">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredReviews.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-400 font-medium"
                    >
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  filteredReviews.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition"
                    >
                      {/* PRODUCT */}
                      <td className="py-4 px-6 font-bold text-black">
                        {item.product}
                      </td>

                      {/* CUSTOMER */}
                      <td className="py-4 px-6 text-gray-600">
                        {item.customer}
                      </td>

                      {/* RATING */}
                      <td className="py-4 px-6 text-yellow-500 tracking-tighter whitespace-nowrap">
                        {item.rating}
                      </td>

                      {/* USER REVIEW */}
                      <td className="py-4 px-6 text-gray-700 max-w-[320px]">
                        <p className="whitespace-normal break-words leading-5">
                          {item.review}
                        </p>
                      </td>

                      {/* DATE */}
                      <td className="py-4 px-6 text-gray-500 text-xs whitespace-nowrap">
                        {item.date}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Removed"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex flex-row items-center justify-end gap-2">
                          {/* APPROVE / MODERATE */}
                          {item.status === "Approved" ? (
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Pending")
                              }
                              className="bg-[#FEF08A] hover:bg-yellow-200 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                            >
                              Moderate
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Approved")
                              }
                              className="bg-[#BBF7D0] hover:bg-green-200 text-green-800 text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                            >
                              Approve
                            </button>
                          )}

                          {/* REMOVE / REJECT */}
                          {item.status !== "Removed" && (
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "Removed")
                              }
                              className="bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                            >
                              Remove
                            </button>
                          )}

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-[#FFE4E6] hover:bg-red-200 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
