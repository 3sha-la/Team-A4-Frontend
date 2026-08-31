import { Share2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import WishlistCard from "../components/WishlistCard";

/**
 * Wishlist page — grid of saved items, each with "Move to cart" and remove.
 * Pass onMoveToCart to hook this up to your real cart state/API.
 */
export default function WishlistPage({ onMoveToCart = () => {} }) {
  const { items, removeFromWishlist } = useWishlist();

  return (
    <main className="flex-1 bg-[#f6f3ee] px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
      <div className="flex flex-col justify-between gap-5 border-b border-[#e7e0d5] pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8780c]">Saved for later</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#28231d] sm:text-4xl">My Wishlist</h1>
          <p className="mt-2 text-sm leading-6 text-[#81796d]">Your considered selection of pieces worth keeping close.</p>
        </div>
        <button className="flex w-fit items-center gap-1.5 rounded-md border border-[#d8cdbd] bg-white px-3 py-2 text-xs font-semibold text-[#5d5549] hover:bg-[#fbfaf7]">
          <Share2 size={14} />
          Share Wishlist
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center border border-dashed border-[#d8cdbd] bg-white/40 px-6 py-16 text-center">
          <HeartIcon />
          <h2 className="mt-4 text-2xl">Nothing saved yet</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#81796d]">Explore the collection and save the pieces that speak to you.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onMoveToCart={onMoveToCart}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function HeartIcon() {
  return <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2ead8] text-xl text-[#a8780c]">♡</span>;
}