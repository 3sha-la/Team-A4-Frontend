import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setQuery(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  const filteredProducts = products.filter((product) => {
    if (!query.trim()) return true;
    const search = query.toLowerCase();
    return (
      product.name?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 font-sans text-gray-900">
      <div className="w-[90%] mx-auto">
        {/* Title Section */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            FIND YOUR NEXT ESSENTIAL
          </p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            SEARCH VOLT.
          </h1>
        </div>

        {/* Search Input Box */}
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
                placeholder="Search headphones, audio, chargers..."
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
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-black uppercase tracking-tight">
            {query ? (
              <>
                Results for <span className="underline">“{query}”</span> ·{" "}
                {filteredProducts.length} FOUND
              </>
            ) : (
              <>ALL PRODUCTS · {filteredProducts.length} FOUND</>
            )}
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setQuery("");
            }}
            className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl text-xs font-bold hover:border-black transition"
          >
            Clear Search
          </button>
        </div>

        {/* Results Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 hover:shadow-md transition items-center"
              >
                <div className="w-32 h-32 bg-[#EFECE6] rounded-xl overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {product.category || "Audio"}{" "}
                    {product.tag ? `· ${product.tag}` : ""}
                  </p>
                  <h3 className="font-black text-lg text-black mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {product.description ||
                      "High-performance gear designed for daily workflow and focus."}
                  </p>
                  <p className="font-black text-black text-base">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 mb-12">
            <p className="text-lg font-bold text-gray-800 mb-2">
              No products found
            </p>
            <p className="text-sm text-gray-500">
              Try searching with another keyword like "headphone", "audio", or
              "charger".
            </p>
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="bg-[#FFED94] p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="font-black text-lg mb-1">Not finding it?</h4>
            <p className="text-xs text-gray-700">
              Browse every charger, audio tool and desk essential in the shop.
            </p>
          </div>
          <Link
            to="/shop"
            className="bg-black text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-gray-800 transition"
          >
            Explore all tech
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
