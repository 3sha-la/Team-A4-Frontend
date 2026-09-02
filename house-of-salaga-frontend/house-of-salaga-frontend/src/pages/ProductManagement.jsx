import React, { useEffect, useMemo, useState } from "react";

import { apiFetch } from "../lib/api";
import { normalizeProduct } from "../lib/normalizers";
import AdminSidebar from "../components/AdminSidebar";

export default function ProductManagement() {
  // =========================
  // STATES
  // =========================

  const [products, setProducts] = useState([]);

  // Categories now come from MongoDB
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [modalMode, setModalMode] = useState(null);

  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    sku: "",
  });

  const [deleteId, setDeleteId] = useState(null);

  const [loadingProducts, setLoadingProducts] = useState(true);

  const [loadingCategories, setLoadingCategories] = useState(true);

  // =========================
  // LOAD PRODUCTS
  // =========================

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);

      const data = await apiFetch("/admin/products", {
        auth: true,
      });

      const productList = Array.isArray(data) ? data : data.products || [];

      setProducts(
        productList
          .filter((item) => item.isActive !== false)
          .map(normalizeProduct),
      );
    } catch (error) {
      alert(error.message || "Unable to load products.");

      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  // =========================
  // LOAD CATEGORIES
  // =========================

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);

      const data = await apiFetch("/admin/categories", {
        auth: true,
      });

      const categoryList = Array.isArray(data) ? data : data.categories || [];

      setCategories(categoryList);
    } catch (error) {
      console.error("Category loading error:", error);

      setCategories([]);

      alert(error.message || "Unable to load categories.");
    } finally {
      setLoadingCategories(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // =========================
  // OPEN ADD PRODUCT
  // =========================

  const handleOpenAddModal = () => {
    setCurrentProduct({
      id: null,
      name: "",
      category: categories[0]?.name || "",
      price: "",
      stock: "",
      description: "",
      image: "",
      sku: "",
    });

    setModalMode("add");
  };

  // =========================
  // OPEN EDIT PRODUCT
  // =========================

  const handleOpenEditModal = (product) => {
    setCurrentProduct({
      id: product.id,

      name: product.name || "",

      category: product.category || "",

      price: product.price ?? "",

      stock: product.stock ?? "",

      description: product.description || "",

      image: product.image || product.img || "",

      sku: product.sku || product.code || "",
    });

    setModalMode("edit");
  };

  // =========================
  // SAVE PRODUCT
  // =========================

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!currentProduct.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!currentProduct.category) {
      alert("Please select a category.");
      return;
    }

    try {
      const payload = {
        code:
          currentProduct.sku ||
          `HOS-PR-${Math.floor(100 + Math.random() * 900)}`,

        name: currentProduct.name.trim(),

        category: currentProduct.category,

        price: Number(currentProduct.price) || 0,

        stock: Number(currentProduct.stock) || 0,

        description:
          currentProduct.description?.trim() || "No description provided.",

        image: currentProduct.image || "",
      };

      // ADD PRODUCT
      if (modalMode === "add") {
        await apiFetch("/admin/products", {
          method: "POST",
          auth: true,
          body: payload,
        });
      }

      // UPDATE PRODUCT
      if (modalMode === "edit") {
        await apiFetch(`/admin/products/${currentProduct.id}`, {
          method: "PUT",
          auth: true,
          body: payload,
        });
      }

      await loadProducts();

      setModalMode(null);
    } catch (error) {
      alert(error.message || "Unable to save product.");
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const executeDelete = async () => {
    if (!deleteId) return;

    try {
      await apiFetch(`/admin/products/${deleteId}`, {
        method: "DELETE",
        auth: true,
      });

      setProducts((prev) => prev.filter((product) => product.id !== deleteId));

      setDeleteId(null);
    } catch (error) {
      alert(error.message || "Unable to delete product.");
    }
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const name = String(item.name || "").toLowerCase();

      const sku = String(item.sku || item.code || "").toLowerCase();

      const category = String(item.category || "").toLowerCase();

      const search = searchTerm.toLowerCase();

      const matchesSearch = name.includes(search) || sku.includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        category === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // =========================
  // CATEGORY BREAKDOWN
  // =========================

  const categoryBreakdown = useMemo(() => {
    return categories.map((category) => {
      const count = products.filter(
        (product) =>
          String(product.category || "").toLowerCase() ===
          String(category.name || "").toLowerCase(),
      ).length;

      const percentage =
        products.length > 0 ? Math.round((count / products.length) * 100) : 0;

      return {
        ...category,
        count,
        percentage,
      };
    });
  }, [categories, products]);

  const categoryColors = [
    "bg-[#FFD700]",
    "bg-[#333333]",
    "bg-[#6B6B6B]",
    "bg-[#A8780C]",
    "bg-[#D8CDBD]",
  ];

  // =========================
  // UI
  // =========================

  return (
    <div className="flex min-h-screen bg-[#F4F4F4] font-sans text-gray-900">
      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 p-10">
        <div className="max-w-[92%] mx-auto">
          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-black text-black tracking-tight">
                Product management
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Add, edit, and remove products from the catalog.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              disabled={loadingCategories || categories.length === 0}
              className="bg-[#FFD700] hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-sm transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Product
            </button>
          </div>

          {/* CATEGORY WARNING */}

          {!loadingCategories && categories.length === 0 && (
            <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 px-5 py-4 text-sm text-yellow-800">
              No categories found in the database. Please add a category from
              Category Management before adding products.
            </div>
          )}

          {/* ========================= */}
          {/* STAT CARDS */}
          {/* ========================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* TOTAL PRODUCTS */}
            <div className="bg-[#1E1E1E] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>Total Products</span>
                <span>↗</span>
              </div>

              <div className="text-4xl font-black">{products.length}</div>

              <div className="absolute right-4 bottom-4 opacity-10 text-6xl">
                📦
              </div>
            </div>

            {/* OUT OF STOCK */}
            <div className="bg-[#1E1E1E] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>Out of Stock Items</span>
                <span>↗</span>
              </div>

              <div className="text-4xl font-black">
                {
                  products.filter((product) => Number(product.stock) === 0)
                    .length
                }

                <span className="text-sm font-normal text-gray-400 ml-1">
                  item
                </span>
              </div>
            </div>

            {/* LOW STOCK */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>Low Stock Items</span>
                <span>↗</span>
              </div>

              <div className="text-4xl font-black text-black">
                {
                  products.filter(
                    (product) =>
                      Number(product.stock) > 0 && Number(product.stock) <= 5,
                  ).length
                }

                <span className="text-sm font-normal text-gray-500 ml-1">
                  items
                </span>
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* SEARCH + CATEGORY FILTER */}
          {/* ========================= */}

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* SEARCH */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product"
              className="flex-1 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-black shadow-sm"
            />

            {/* DATABASE CATEGORY FILTER */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-200 px-6 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm focus:outline-none"
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option
                  key={category._id || category.id || category.name}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>

            {/* RESET */}
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-white border border-gray-200 px-6 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              Reset Filter
            </button>
          </div>

          {/* ========================= */}
          {/* TABLE + RIGHT WIDGETS */}
          {/* ========================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* PRODUCT TABLE */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead>
                    <tr className="bg-[#6B6B6B] text-white text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-4 px-6">Product</th>

                      <th className="py-4 px-6">Category</th>

                      <th className="py-4 px-6">Price</th>

                      <th className="py-4 px-6">Stock</th>

                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 text-sm">
                    {loadingProducts ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-12 text-gray-400 font-medium"
                        >
                          Loading products...
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-10 text-gray-400 font-medium"
                        >
                          No products found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50/50 transition"
                        >
                          {/* PRODUCT */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {item.image || item.img ? (
                                <img
                                  src={item.image || item.img}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover border"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gray-100 border flex items-center justify-center text-gray-400">
                                  📦
                                </div>
                              )}

                              <div>
                                <div className="font-bold text-black">
                                  {item.name}
                                </div>

                                <div className="text-xs text-gray-400">
                                  {item.sku || item.code || ""}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* CATEGORY */}
                          <td className="py-4 px-6">
                            <span className="border border-yellow-500/50 text-yellow-800 bg-yellow-50/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                              {item.category}
                            </span>
                          </td>

                          {/* PRICE */}
                          <td className="py-4 px-6 font-bold text-black whitespace-nowrap">
                            LKR {Number(item.price || 0).toLocaleString()}
                          </td>

                          {/* STOCK */}
                          <td className="py-4 px-6">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                                Number(item.stock) > 10
                                  ? "bg-green-50 text-green-700"
                                  : Number(item.stock) > 0
                                    ? "bg-yellow-50 text-yellow-800"
                                    : "bg-red-50 text-red-600"
                              }`}
                            >
                              {Number(item.stock) > 10
                                ? `IN STOCK (${item.stock})`
                                : Number(item.stock) > 0
                                  ? `LOW STOCK (${item.stock})`
                                  : "OUT OF STOCK (0)"}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(item)}
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition"
                                title="Edit"
                              >
                                ✏️
                              </button>

                              <button
                                type="button"
                                onClick={() => confirmDelete(item.id)}
                                className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition"
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* TABLE FOOTER */}
              <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 bg-gray-50/30">
                <span>
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </span>

                <div className="space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 border rounded bg-white"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    className="px-3 py-1 bg-[#FFD700] text-black font-bold rounded"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* ========================= */}
            {/* RIGHT SIDE */}
            {/* ========================= */}

            <div className="space-y-6">
              {/* CATEGORY BREAKDOWN */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-base mb-4">Category Breakdown</h3>

                <div className="flex justify-center my-4 relative">
                  <div className="w-36 h-36 rounded-full border-[14px] border-[#FFD700] border-r-[#6B6B6B] border-b-[#333333] flex flex-col items-center justify-center shadow-inner">
                    <span className="font-black text-2xl">
                      {categories.length}
                    </span>

                    <span className="text-[10px] uppercase font-bold text-gray-500">
                      Categories
                    </span>
                  </div>
                </div>

                {/* DATABASE CATEGORIES */}
                <div className="space-y-3 text-xs font-medium pt-2">
                  {loadingCategories ? (
                    <p className="text-gray-400 text-center py-4">
                      Loading categories...
                    </p>
                  ) : categoryBreakdown.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">
                      No categories found.
                    </p>
                  ) : (
                    categoryBreakdown.map((category, index) => (
                      <div
                        key={category._id || category.id || category.name}
                        className="flex justify-between items-center"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-sm ${
                              categoryColors[index % categoryColors.length]
                            }`}
                          />

                          {category.name}
                        </span>

                        <span className="text-gray-500">
                          {category.percentage}%{" "}
                          <span className="text-gray-400">
                            ({category.count})
                          </span>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* STOCK VALUE TREND */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-base mb-4">Stock Value Trend</h3>

                <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2 border-b border-gray-100">
                  {[
                    {
                      month: "Jan",
                      h: "45%",
                      col: "bg-[#FFD700]",
                    },
                    {
                      month: "Feb",
                      h: "75%",
                      col: "bg-[#1E1E1E]",
                    },
                    {
                      month: "Mar",
                      h: "35%",
                      col: "bg-[#FFD700]",
                    },
                    {
                      month: "Apr",
                      h: "90%",
                      col: "bg-[#1E1E1E]",
                    },
                    {
                      month: "May",
                      h: "65%",
                      col: "bg-[#FFD700]",
                    },
                    {
                      month: "Jun",
                      h: "100%",
                      col: "bg-[#1E1E1E]",
                    },
                  ].map((bar, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1 flex-1 h-full justify-end"
                    >
                      <div
                        className={`w-full rounded-t-md ${bar.col} transition-all duration-300 hover:opacity-80`}
                        style={{
                          height: bar.h,
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[10px] text-gray-400 font-bold pt-2 px-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================= */}
      {/* ADD / EDIT MODAL */}
      {/* ========================= */}

      {modalMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl max-h-[95vh] overflow-y-auto p-8 rounded-3xl shadow-2xl relative">
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setModalMode(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-2xl font-black mb-1">
              {modalMode === "add" ? "Add New Product" : "Update Product"}
            </h2>

            <p className="text-xs text-gray-400 mb-6">
              HOUSE OF SALAGA — INVENTORY MANAGER
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* PRODUCT NAME */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Product name *
                </label>

                <input
                  type="text"
                  required
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Adire wrap dress"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* CATEGORY + SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CATEGORY */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Category *
                  </label>

                  <select
                    required
                    value={currentProduct.category}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category._id || category.id || category.name}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>

                  {categories.length === 0 && (
                    <p className="text-[10px] text-red-500 mt-1">
                      No categories available. Add one from Category Management
                      first.
                    </p>
                  )}
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    SKU
                  </label>

                  <input
                    type="text"
                    disabled
                    value={
                      modalMode === "edit" && currentProduct.sku
                        ? currentProduct.sku
                        : "Generated on save"
                    }
                    className="w-full bg-gray-100 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* PRICE + STOCK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PRICE */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Price (LKR) *
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="12500"
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                </div>

                {/* STOCK */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Stock quantity *
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={currentProduct.stock}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        stock: e.target.value,
                      })
                    }
                    placeholder="14"
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Product Image URL
                </label>

                <input
                  type="text"
                  value={currentProduct.image}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* IMAGE PREVIEW */}
              {currentProduct.image && (
                <div className="border border-gray-100 bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">
                    Image Preview
                  </p>

                  <img
                    src={currentProduct.image}
                    alt="Preview"
                    className="w-full h-40 object-contain rounded-lg bg-white"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* DESCRIPTION */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={currentProduct.description}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Short product description"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black resize-none"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!currentProduct.category}
                  className="px-6 py-2.5 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black text-sm font-bold transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modalMode === "add" ? "Save Product" : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* DELETE MODAL */}
      {/* ========================= */}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-xl text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              ⚠️
            </div>

            <h3 className="text-lg font-bold mb-2">Are you sure?</h3>

            <p className="text-xs text-gray-500 mb-6">
              Do you really want to remove this product from the inventory
              catalog? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={executeDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
