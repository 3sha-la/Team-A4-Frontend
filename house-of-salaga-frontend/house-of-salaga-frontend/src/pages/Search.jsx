import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiFetch } from "../lib/api";
import { normalizeProduct } from "../lib/normalizers";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all products once
  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await apiFetch("/products");

        if (active) {
          setProducts((data.data || []).map(normalizeProduct));
        }
      } catch (error) {
        console.error("Product load error:", error);

        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  // LIVE SEARCH
  // First letter එක type කරන ගමන්ම query update වෙනවා
  const handleInputChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);
    setQuery(value);
  };

  // Search button / Enter key
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm.trim());
  };

  // Clear search
  const handleClear = () => {
    setSearchTerm("");
    setQuery("");
  };

  // Filter products locally
  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product) => {
      const name = String(product.name || "").toLowerCase();

      const description = String(product.description || "").toLowerCase();

      const category = String(product.category || "").toLowerCase();

      const code = String(product.code || product.sku || "").toLowerCase();

      return (
        name.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword) ||
        code.includes(keyword)
      );
    });
  }, [products, query]);

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      {/* SAME CUSTOMER SIDEBAR */}
      <Sidebar />

      {/* SEARCH PAGE CONTENT */}
      <main className="flex-1 min-w-0 bg-[#FAF8F5] py-10 font-sans text-gray-900">
        <div className="w-[90%] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              FIND YOUR NEXT ESSENTIAL
            </p>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              SEARCH VOLT.
            </h1>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm mb-10">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  🔍
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search product name, category, code..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="bg-[#FFD600] hover:bg-[#e6c200] text-black font-extrabold px-8 py-3 rounded-xl text-sm transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6 gap-4">
            <p className="text-xl font-black uppercase tracking-tight">
              {query.trim() ? (
                <>
                  Results for <span className="underline">“{query}”</span> ·{" "}
                  {filteredProducts.length} FOUND
                </>
              ) : (
                <>ALL PRODUCTS · {filteredProducts.length} FOUND</>
              )}
            </p>

            <button
              onClick={handleClear}
              className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl text-xs font-bold hover:border-black transition whitespace-nowrap"
            >
              Clear Search
            </button>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 mb-12">
              <p className="text-sm font-bold text-gray-500">
                Loading products...
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            /* Search Results */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 hover:shadow-md transition items-center"
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-[#EFECE6] rounded-xl overflow-hidden shrink-0">
                    {product.image || product.img ? (
                      <img
                        src={product.image || product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: product.swatch,
                        }}
                      />
                    )}
                  </div>

                  {/* Product Information */}
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      {product.category || "Product"}

                      {product.code ? ` · ${product.code}` : ""}
                    </p>

                    <h3 className="font-black text-lg text-black mb-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {product.description ||
                        "Product description unavailable."}
                    </p>

                    <p className="font-black text-black text-base">
                      LKR {Number(product.price || 0).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 mb-12">
              <p className="text-lg font-bold text-gray-800 mb-2">
                No products found
              </p>

              <p className="text-sm text-gray-500">
                Try another product name, category, or product code.
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="bg-[#FFED94] p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="font-black text-lg mb-1">Not finding it?</h4>

              <p className="text-xs text-gray-700">
                Browse every product available in the shop.
              </p>
            </div>

            <Link
              to="/shop"
              className="bg-black text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-gray-800 transition"
            >
              Explore all products
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
