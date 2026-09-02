import { ShoppingCart, Trash2 } from "lucide-react";

/**
 * Card used on the Wishlist page.
 * Props:
 *  - product: { id, code, category, name, price, swatch }
 *  - onMoveToCart(product), onRemove(productId)
 */
export default function WishlistCard({ product, onMoveToCart = (product) => product, onRemove = (productId) => productId }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="relative h-40 w-full" style={{ backgroundImage: product.swatch }}>
        <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {product.code}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
          {product.category}
        </p>
        <h3 className="mt-0.5 font-serif text-sm font-semibold text-neutral-900">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold text-[#B8860B]">
          LKR {product.price.toLocaleString()}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onMoveToCart(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#C9A227] py-2 text-xs font-semibold text-black transition-colors hover:bg-[#B8860B]"
          >
            <ShoppingCart size={13} />
            Move to cart
          </button>
          <button
            onClick={() => onRemove(product.id)}
            aria-label="Remove from wishlist"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors hover:border-red-300 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}