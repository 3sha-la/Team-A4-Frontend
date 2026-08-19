import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(
    (item) => item.id === parseInt(id) || item.id === String(id),
  );
  const [selectedColor, setSelectedColor] = useState("Black");

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

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 font-sans text-gray-900">
      <div className="w-[90%] mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:opacity-75"
          >
            ← Back to shop
          </Link>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left - Image Container */}
          <div className="bg-[#EFECE6] rounded-2xl p-4 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[520px] object-cover rounded-xl"
            />
          </div>

          {/* Right - Product Details */}
          <div className="flex flex-col pt-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              {product.category || "AUDIO"} • {product.tag || "BEST SELLER"}
            </p>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3 leading-none">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4 text-xs font-bold">
              <div className="text-yellow-400 tracking-widest">☆☆☆☆☆</div>
              <span>4.9 • 218 reviews</span>
            </div>

            <div className="text-3xl font-black mb-4">${product.price}</div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description ||
                "Deep, detailed sound with adaptive noise cancellation and a 35-hour battery. Built for the ride, the focus session and the encore."}
            </p>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="text-xs font-bold mb-3">
                Finish •{" "}
                <span className="text-gray-500 font-normal">
                  {selectedColor}
                </span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedColor("Black")}
                  className={`w-8 h-8 rounded-full bg-black border-2 ${selectedColor === "Black" ? "ring-2 ring-black ring-offset-2" : ""}`}
                />
                <button
                  onClick={() => setSelectedColor("White")}
                  className={`w-8 h-8 rounded-full bg-[#EFECE6] border border-gray-300 ${selectedColor === "White" ? "ring-2 ring-black ring-offset-2" : ""}`}
                />
                <button
                  onClick={() => setSelectedColor("Yellow")}
                  className={`w-8 h-8 rounded-full bg-[#FFD600] ${selectedColor === "Yellow" ? "ring-2 ring-black ring-offset-2" : ""}`}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 bg-[#FFD600] hover:bg-[#e6c200] text-black font-extrabold py-3.5 rounded-full text-sm transition">
                Add to bag • ${product.price}
              </button>
              <button className="p-3.5 border border-gray-200 rounded-2xl hover:border-black transition flex items-center justify-center">
                ♡
              </button>
            </div>

            {/* Tech Specs */}
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

            {/* Delivery Card */}
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

        {/* Pair It With Section */}
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
                <p className="text-xs text-gray-500">$89 • Charging</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Arc Headphone Stand</p>
                <p className="text-xs text-gray-500">$39 • Desk</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Field Tech Pouch</p>
                <p className="text-xs text-gray-500">$45 • Travel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
