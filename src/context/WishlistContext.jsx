import { createContext, useContext, useMemo, useState } from "react";

const WishlistContext = createContext(null);

/**
 * Wraps the app and holds wishlist state so any page (product catalog,
 * wishlist page, navbar badge count) can read/update it.
 *
 * Swap the useState below for a real API call (fetch on mount, POST/DELETE
 * on add/remove) when wiring this up to a backend.
 */
export function WishlistProvider({ children, initialItems = [] }) {
  const [items, setItems] = useState(initialItems);

  const addToWishlist = (product) => {
    setItems((prev) => (prev.some((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const removeFromWishlist = (productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleWishlist = (product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isInWishlist = (productId) => items.some((p) => p.id === productId);

  const value = useMemo(
    () => ({ items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}