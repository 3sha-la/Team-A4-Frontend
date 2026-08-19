import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

/**
 * Catalog product card. The heart button in the top-right corner
 * adds/removes this product from the wishlist (filled + gold when saved).
 */
export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  return (
    <article className="group overflow-hidden rounded-lg border border-[#e7e0d5] bg-white shadow-[0_4px_18px_rgba(55,42,22,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(55,42,22,0.1)]">
      <div className="relative aspect-[1.15] w-full overflow-hidden" style={{ backgroundImage: product.swatch }}>
        <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/0" />
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#5d5549] backdrop-blur">
          {product.code}
        </span>
        <button
          onClick={() => toggleWishlist(product)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#5d5549] shadow-sm transition-colors hover:text-[#b8860b]"
        >
          <Heart size={14} className={saved ? "fill-[#C9A227] text-[#C9A227]" : ""} />
        </button>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a09483]">
          {product.category}
        </p>
        <h3 className="mt-1 font-serif text-base font-semibold text-[#28231d]">{product.name}</h3>
        <p className="mt-2 text-sm font-semibold text-[#a8780c]">
          LKR {product.price.toLocaleString()}
        </p>
        <button
          onClick={() => toggleWishlist(product)}
          className={`mt-4 w-full rounded-md py-2.5 text-xs font-semibold transition-colors ${
            saved
              ? "border border-[#C9A227] text-[#B8860B] hover:bg-[#C9A227]/10"
              : "bg-[#C9A227] text-black hover:bg-[#B8860B]"
          }`}
        >
          {saved ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </article>
  );
}