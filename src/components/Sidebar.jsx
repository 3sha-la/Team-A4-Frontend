// src/components/Sidebar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ cartCount = 0 }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-[420px] min-w-[420px] max-w-[420px] bg-black text-white p-8 flex flex-col justify-between shrink-0 min-h-screen border-r border-zinc-800 font-sans">
      <div>
        {/* Brand Logo */}
        <div className="mb-10">
          <Link to="/">
            <h1 className="text-2xl font-bold tracking-tight text-[#E5A800] font-serif">
              House of Salaga
            </h1>
            <p className="text-[10px] tracking-widest text-gray-400 uppercase">
              LUXURY HERITAGE WEAR
            </p>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3 text-sm">
          <Link
            to="/"
            className={`flex items-center gap-3 p-3.5 rounded-lg transition ${
              isActive("/")
                ? "bg-zinc-800 text-[#E5A800] font-bold border-r-4 border-[#E5A800]"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span>🏠</span> Home Collection
          </Link>

          <Link
            to="/shop"
            className={`flex items-center gap-3 p-3.5 rounded-lg transition ${
              isActive("/shop")
                ? "bg-zinc-800 text-[#E5A800] font-bold border-r-4 border-[#E5A800]"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span>🛍️</span> All Products
          </Link>

          <Link
            to="/orders"
            className={`flex items-center gap-3 p-3.5 rounded-lg transition ${
              isActive("/orders")
                ? "bg-zinc-800 text-[#E5A800] font-bold border-r-4 border-[#E5A800]"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span>📦</span> My Orders
          </Link>

          <Link
            to="/wishlist"
            className={`flex items-center gap-3 p-3.5 rounded-lg transition ${
              isActive("/wishlist")
                ? "bg-zinc-800 text-[#E5A800] font-bold border-r-4 border-[#E5A800]"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span>♡</span> My Wishlist
          </Link>

          <Link
            to="/cart"
            className={`flex items-center justify-between p-3.5 rounded-lg transition ${
              isActive("/cart")
                ? "bg-zinc-800 text-[#E5A800] font-bold border-r-4 border-[#E5A800]"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <span>🛒</span> Shopping Cart
            </div>
            {cartCount > 0 && (
              <span className="text-xs bg-[#E5A800] text-black font-bold px-2.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/reviews"
            className={`flex items-center gap-3 p-3.5 rounded-lg transition ${
              isActive("/reviews")
                ? "bg-zinc-800 text-[#E5A800] font-bold border-r-4 border-[#E5A800]"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span>⭐</span> Reviews & Ratings
          </Link>

          <Link
            to="/profile"
            className={`flex items-center gap-3 p-3.5 rounded-lg transition ${
              isActive("/profile")
                ? "bg-zinc-800 text-[#E5A800] font-bold border-r-4 border-[#E5A800]"
                : "text-gray-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <span>👤</span> My Profile
          </Link>
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-zinc-800 pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E5A800] text-black font-bold flex items-center justify-center text-xs">
          AS
        </div>
        <div>
          <p className="text-sm font-bold text-white">Amara Silva</p>
          <button className="text-xs text-red-500 font-semibold hover:underline">
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
