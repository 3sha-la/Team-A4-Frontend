import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  apiFetch,
  clearAuthSession,
  getAuthToken,
  getStoredUser,
} from "../lib/api";

const Sidebar = ({ cartCount = 0 }) => {
  const [liveCartCount, setLiveCartCount] = useState(cartCount);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = (user?.name || "AS")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const isActive = (path) => location.pathname === path;
  const handleSignOut = () => {
    clearAuthSession();
    navigate("/login");
  };

  useEffect(() => {
    if (!getAuthToken()) return;
    apiFetch("/cart", { auth: true })
      .then((data) =>
        setLiveCartCount(
          (data.cart?.items || []).reduce(
            (sum, item) => sum + (Number(item.quantity) || 0),
            0,
          ),
        ),
      )
      .catch(() => setLiveCartCount(cartCount));
  }, [cartCount, location.pathname]);

  return (
    <aside className="w-[420px] min-w-[420px] max-w-[420px] bg-black text-white p-8 flex flex-col justify-between shrink-0 min-h-screen border-r border-zinc-800 font-sans">
      <div>
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
            {liveCartCount > 0 && (
              <span className="text-xs bg-[#E5A800] text-black font-bold px-2.5 py-0.5 rounded-full">
                {liveCartCount}
              </span>
            )}
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

      <div className="border-t border-zinc-800 pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E5A800] text-black font-bold flex items-center justify-center text-xs">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-white">
            {user?.name || "Customer"}
          </p>
          <button
            onClick={handleSignOut}
            className="text-xs text-red-500 font-semibold hover:underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
