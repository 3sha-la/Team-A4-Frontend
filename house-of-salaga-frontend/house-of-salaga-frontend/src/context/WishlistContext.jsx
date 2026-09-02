import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch, getAuthToken } from '../lib/api';
import { normalizeWishlistItem } from '../lib/normalizers';

const WishlistContext = createContext(null);

export function WishlistProvider({ children, initialItems = [] }) {
  const [items, setItems] = useState(initialItems);

  const refreshWishlist = useCallback(async () => {
    if (!getAuthToken()) {
      setItems([]);
      return;
    }

    try {
      const data = await apiFetch('/wishlist', { auth: true });
      const list = data.wishlist?.wishlistItems || [];
      setItems(list.map(normalizeWishlistItem));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
    const onAuthChanged = () => refreshWishlist();
    window.addEventListener('hos-auth-changed', onAuthChanged);
    return () => window.removeEventListener('hos-auth-changed', onAuthChanged);
  }, [refreshWishlist]);

  const addToWishlist = useCallback(async (product) => {
    const productId = product._id || product.id;
    await apiFetch('/wishlist', {
      method: 'POST',
      auth: true,
      body: { productId },
    });
    await refreshWishlist();
  }, [refreshWishlist]);

  const removeFromWishlist = useCallback(async (productId) => {
    await apiFetch(`/wishlist/${productId}`, {
      method: 'DELETE',
      auth: true,
    });
    setItems((prev) => prev.filter((product) => product.id !== productId));
  }, []);

  const toggleWishlist = useCallback(async (product) => {
    const productId = product._id || product.id;
    const exists = items.some((item) => item.id === productId);

    if (exists) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(product);
    }
  }, [addToWishlist, items, removeFromWishlist]);

  const moveToCart = useCallback(async (product) => {
    const productId = product._id || product.id;
    await apiFetch(`/wishlist/move-to-cart/${productId}`, {
      method: 'POST',
      auth: true,
    });
    await refreshWishlist();
  }, [refreshWishlist]);

  const isInWishlist = useCallback(
    (productId) => items.some((product) => product.id === productId),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      moveToCart,
      isInWishlist,
      refreshWishlist,
    }),
    [items, addToWishlist, removeFromWishlist, toggleWishlist, moveToCart, isInWishlist, refreshWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
