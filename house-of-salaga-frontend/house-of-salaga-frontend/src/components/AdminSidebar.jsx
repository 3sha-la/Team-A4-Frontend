import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession, getStoredUser } from "../lib/api";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = (user?.name || "AU").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const isActive = (path) => location.pathname === path;
  const handleSignOut = () => { clearAuthSession(); navigate("/login"); };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Orders", path: "/admin/orders", icon: "📦" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Review Management", path: "/admin/reviews", icon: "⭐" },
    { name: "Sales Analytics", path: "/admin/analytics", icon: "📊" },
    { name: "Product Management", path: "/admin/products", icon: "🛍️" },
    { name: "Categories", path: "/admin/categories", icon: "📁" },
    { name: "Stock", path: "/admin/stock", icon: "🖤" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-[300px] min-w-[300px] bg-black text-white p-6 flex flex-col justify-between shrink-0 min-h-screen border-r border-zinc-900 font-sans">
      <div>
        <div className="mb-10 pl-2">
          <Link to="/admin/analytics">
            <h1 className="text-2xl font-bold tracking-tight text-[#E5A800] font-serif">
              House of Salaga
            </h1>
            <p className="text-[9px] tracking-widest text-gray-400 uppercase mt-0.5">
              LUXURY HERITAGE WEAR
            </p>
          </Link>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition text-sm font-medium ${
                  active
                    ? "bg-[#D4A359] text-black font-semibold"
                    : "text-gray-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {active && <div className="w-1.5 h-5 bg-black rounded-full" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-zinc-900 flex items-center gap-3 pl-2">
        <div className="w-9 h-9 rounded-full bg-[#D4A359] text-black font-bold flex items-center justify-center text-xs">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">{user?.name || "Admin User"}</span>
          <button onClick={handleSignOut} className="text-[11px] text-red-500 font-medium text-left hover:underline">
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
