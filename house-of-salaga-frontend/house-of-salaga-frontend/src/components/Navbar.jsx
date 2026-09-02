import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, getAuthToken } from "../lib/api";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!getAuthToken()) return;
    apiFetch('/cart', { auth: true })
      .then((data) => setCartCount((data.cart?.items || []).reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)))
      .catch(() => setCartCount(0));
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 px-4 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-black uppercase tracking-tighter">
        TECH.CORE
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-700">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <Link to="/shop" className="hover:text-black">
          Shop
        </Link>
        <Link to="/dashboard" className="hover:text-black">
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-bold text-gray-700">
          Log in
        </Link>
        <Link
          to="/cart"
          className="bg-[#FFD600] text-black text-sm font-bold px-5 py-2.5 rounded-full"
        >
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
