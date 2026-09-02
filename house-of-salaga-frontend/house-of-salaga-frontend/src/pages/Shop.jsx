import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiFetch, getAuthToken } from "../lib/api";
import { normalizeProduct } from "../lib/normalizers";
import { useWishlist } from "../context/WishlistContext";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const navigate = useNavigate();

  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    let active = true;

    apiFetch("/products")
      .then((data) => {
        if (active) {
          setProducts((data.data || []).map(normalizeProduct));
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ],
    [products],
  );

  const visibleProducts = useMemo(() => {
    let list =
      selectedCategory === "All"
        ? [...products]
        : products.filter((product) => product.category === selectedCategory);

    // PRICE FILTER
    if (selectedPrice === "under10000") {
      list = list.filter((product) => Number(product.price) < 10000);
    }

    if (selectedPrice === "10000to25000") {
      list = list.filter(
        (product) =>
          Number(product.price) >= 10000 && Number(product.price) <= 25000,
      );
    }

    if (selectedPrice === "over25000") {
      list = list.filter((product) => Number(product.price) > 25000);
    }

    // SORT
    if (sortBy === "Price: Low to High") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "Price: High to Low") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [products, selectedCategory, selectedPrice, sortBy]);

  // WISHLIST
  const handleWishlist = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!getAuthToken()) {
      navigate("/login");
      return;
    }

    try {
      await toggleWishlist(product);
    } catch (error) {
      alert(error.message || "Unable to update wishlist.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      {/* CUSTOMER SIDEBAR */}
      <Sidebar />

      {/* SHOP PAGE */}
      <div className="flex-1 min-w-0 bg-[#FAF9F6] min-h-screen font-sans text-gray-900 pb-10">
        {/* TOP NAVBAR */}
        <header className="max-w-[92%] mx-auto px-6 py-4 flex justify-between items-center bg-white mt-4 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="bg-[#FFD600] text-black font-black px-2.5 py-1 rounded text-lg">
              H
            </div>

            <Link to="/" className="font-black text-xl tracking-wide uppercase">
              House of Salaga
            </Link>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-bold items-center">
            <Link to="/" className="hover:text-gray-600 transition">
              Home
            </Link>

            <Link
              to="/shop"
              className="underline underline-offset-4 decoration-2"
            >
              Shop
            </Link>

            <Link to="#" className="hover:text-gray-600 transition">
              Campaigns
            </Link>

            <Link to="/search" className="hover:text-gray-600 transition">
              Search
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="bg-[#FFD600] text-black px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-yellow-400 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        </header>

        {/* MAIN SHOP CONTENT */}
        <main className="max-w-[92%] mx-auto px-6 bg-white pb-16 rounded-b-xl shadow-sm">
          {/* HEADING */}
          <section className="pt-12 pb-8 border-b border-gray-100 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2 block">
                All Gear
              </span>

              <h1 className="text-5xl font-black uppercase tracking-tight">
                Shop Tech.
              </h1>

              <p className="text-gray-500 text-sm mt-3">
                {products.length} pieces made for motion, focus and sound.
              </p>
            </div>

            <button
              type="button"
              className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </button>
          </section>

          <div className="flex flex-col lg:flex-row gap-10 mt-8">
            {/* FILTER SIDEBAR */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              {/* CATEGORY */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="font-bold text-sm mb-4">Browse by</h3>

                <ul className="space-y-1 text-sm">
                  <li>
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`w-full flex justify-between items-center px-3 py-2 rounded-lg font-bold ${
                        selectedCategory === "All"
                          ? "bg-[#FFD600]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>All products</span>

                      <span className="text-xs">{products.length}</span>
                    </button>
                  </li>

                  {categories.slice(0, 4).map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full flex justify-between items-center px-3 py-2 rounded-lg font-medium ${
                          selectedCategory === category
                            ? "bg-[#FFD600] font-bold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>{category}</span>

                        <span className="text-xs text-gray-400">
                          {
                            products.filter(
                              (product) => product.category === category,
                            ).length
                          }
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PRICE */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-sm mb-4">Price</h3>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPrice("All")}
                    className={`border px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      selectedPrice === "All"
                        ? "bg-[#FFD600] border-[#FFD600] text-black"
                        : "border-gray-200 hover:border-black"
                    }`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setSelectedPrice("under10000")}
                    className={`border px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      selectedPrice === "under10000"
                        ? "bg-[#FFD600] border-[#FFD600] text-black"
                        : "border-gray-200 hover:border-black"
                    }`}
                  >
                    Under LKR 10,000
                  </button>

                  <button
                    onClick={() => setSelectedPrice("10000to25000")}
                    className={`border px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      selectedPrice === "10000to25000"
                        ? "bg-[#FFD600] border-[#FFD600] text-black"
                        : "border-gray-200 hover:border-black"
                    }`}
                  >
                    LKR 10,000 - 25,000
                  </button>

                  <button
                    onClick={() => setSelectedPrice("over25000")}
                    className={`border px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      selectedPrice === "over25000"
                        ? "bg-[#FFD600] border-[#FFD600] text-black"
                        : "border-gray-200 hover:border-black"
                    }`}
                  >
                    Over LKR 25,000
                  </button>
                </div>
              </div>
            </aside>

            {/* PRODUCTS */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">
                  Showing {visibleProducts.length} products
                </span>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="border border-gray-200 text-sm font-medium rounded-lg px-3 py-2 bg-white focus:outline-none"
                >
                  <option>Newest</option>

                  <option>Price: Low to High</option>

                  <option>Price: High to Low</option>
                </select>
              </div>

              {/* PRODUCT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                {visibleProducts.length === 0 ? (
                  <div className="col-span-full bg-gray-50 rounded-2xl border border-gray-100 p-12 text-center">
                    <p className="text-lg font-bold text-gray-700 mb-2">
                      No products found
                    </p>

                    <p className="text-sm text-gray-500">
                      Try another category or price range.
                    </p>
                  </div>
                ) : (
                  visibleProducts.map((product) => {
                    const saved = isInWishlist(product.id);

                    return (
                      <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="group cursor-pointer"
                      >
                        {/* IMAGE AREA */}
                        <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                          {product.img || product.image ? (
                            <img
                              src={product.img || product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                          ) : (
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage: product.swatch,
                              }}
                            />
                          )}

                          {/* WISHLIST BUTTON */}
                          <button
                            type="button"
                            aria-label={
                              saved ? "Remove from wishlist" : "Add to wishlist"
                            }
                            onClick={(e) => handleWishlist(e, product)}
                            className={`absolute top-3 right-3 w-10 h-10 rounded-full shadow-md flex items-center justify-center text-xl transition z-10 ${
                              saved
                                ? "bg-[#FFD600] text-black"
                                : "bg-white text-black hover:bg-[#FFD600]"
                            }`}
                          >
                            {saved ? "♥" : "♡"}
                          </button>
                        </div>

                        {/* CATEGORY + CODE */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-gray-500 font-bold uppercase">
                            {product.category}
                          </span>

                          {product.code && (
                            <>
                              <span className="text-gray-300">•</span>

                              <span className="text-[10px] text-gray-500 font-bold uppercase">
                                {product.code}
                              </span>
                            </>
                          )}
                        </div>

                        {/* NAME */}
                        <h4 className="text-sm font-black text-black mb-1">
                          {product.name}
                        </h4>

                        {/* PRICE */}
                        <p className="text-sm font-bold text-gray-800">
                          LKR {Number(product.price || 0).toLocaleString()}
                        </p>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
