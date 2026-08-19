import {
  Home,
  LayoutGrid,
  Package,
  Heart,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";

/**
 * Left navigation sidebar.
 * Props:
 *  - active: which nav key is highlighted ("wishlist" | "cart" | "home" | ...)
 *  - onNavigate(key): called when a nav item is clicked
 *  - wishlistCount, cartCount: badge numbers
 *  - userName
 */
export default function Sidebar({
  active = "wishlist",
  onNavigate = () => {},
  wishlistCount = 0,
  cartCount = 0,
  userName = "Amara Silva",
}) {
  const navItems = [
    { key: "home", label: "Home Collection", icon: Home },
    { key: "products", label: "All Product", icon: LayoutGrid },
    { key: "orders", label: "My Orders", icon: Package },
    { key: "wishlist", label: "My Wishlist", icon: Heart, badge: wishlistCount },
    { key: "cart", label: "Shopping Cart", icon: ShoppingCart, badge: cartCount },
    { key: "reviews", label: "Reviews & Ratings", icon: Star },
    { key: "profile", label: "My Profile", icon: User },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col justify-between bg-[#171512] lg:flex">
      <div>
        {/* Brand */}
        <div className="border-b border-white/10 px-8 pb-7 pt-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a227]">Est. 1947</p>
          <h1 className="mt-2 font-serif text-2xl font-semibold text-white">House of Salaga</h1>
          <p className="mt-1 text-[10px] tracking-[0.24em] text-stone-500">LUXURY HERITAGE WEAR</p>
        </div>

        {/* Nav */}
        <nav className="space-y-1 px-4 pt-7">
          {navItems.map(({ key, label, icon: Icon, badge }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-[#c9a227] font-semibold text-[#171512] shadow-[0_8px_20px_rgba(201,162,39,0.18)]"
                    : "text-stone-400 hover:bg-white/5 hover:text-[#e6c85c]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </span>
                {!!badge && (
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold ${
                      isActive ? "bg-black text-[#C9A227]" : "bg-[#C9A227] text-black"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User */}
      <div className="border-t border-white/10 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9a227] text-sm font-semibold text-[#171512]">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-stone-200">{userName}</p>
            <button className="text-xs font-medium text-stone-500 hover:text-[#e6c85c]">Sign Out</button>
          </div>
        </div>
      </div>
    </aside>
  );
}