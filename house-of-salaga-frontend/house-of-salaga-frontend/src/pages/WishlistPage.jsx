import { Share2, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage({ onMoveToCart = null }) {
  const { items, removeFromWishlist, moveToCart } = useWishlist();

  const handleMoveToCart = onMoveToCart || moveToCart;

  const handleMove = async (product) => {
    try {
      await handleMoveToCart(product);
    } catch (error) {
      alert(error.message || "Unable to move product to cart.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      alert(error.message || "Unable to remove product from wishlist.");
    }
  };

  return (
    <main className="flex-1 bg-[#f6f3ee] px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 border-b border-[#e7e0d5] pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8780c]">
            Saved for later
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#28231d] sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#81796d]">
            Your considered selection of pieces worth keeping close.
          </p>
        </div>

        <button className="flex w-fit items-center gap-1.5 rounded-md border border-[#d8cdbd] bg-white px-3 py-2 text-xs font-semibold text-[#5d5549] hover:bg-[#fbfaf7]">
          <Share2 size={14} />
          Share Wishlist
        </button>
      </div>

      {/* EMPTY WISHLIST */}
      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center border border-dashed border-[#d8cdbd] bg-white/40 px-6 py-16 text-center">
          <HeartIcon />

          <h2 className="mt-4 text-2xl">Nothing saved yet</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#81796d]">
            Explore the collection and save the pieces that speak to you.
          </p>

          <Link
            to="/shop"
            className="mt-5 rounded-lg bg-[#FFD600] px-6 py-3 text-xs font-bold text-black hover:bg-yellow-400"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        /* WISHLIST PRODUCTS */
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((product) => {
            const imageUrl = product.img || product.image || "";

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#ddd5ca] bg-white shadow-sm transition hover:shadow-md"
              >
                {/* PRODUCT IMAGE */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-[280px] w-full overflow-hidden bg-[#f1eee8]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain object-center"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#eeeae4] text-sm text-gray-400">
                        No image available
                      </div>
                    )}
                  </div>
                </Link>

                {/* PRODUCT DETAILS */}
                <div className="p-4">
                  {/* CATEGORY */}
                  {product.category && (
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#9b8c78]">
                      {product.category}
                    </p>
                  )}

                  {/* NAME */}
                  <Link to={`/product/${product.id}`}>
                    <h3 className="mb-1 text-sm font-bold text-[#28231d] hover:underline">
                      {product.name}
                    </h3>
                  </Link>

                  {/* PRICE */}
                  <p className="mb-4 text-sm font-bold text-[#b47b00]">
                    LKR {Number(product.price || 0).toLocaleString()}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleMove(product)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#d4a817] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#c49a10]"
                    >
                      <ShoppingCart size={14} />
                      Move to cart
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(product.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-[#ddd5ca] bg-white text-gray-500 transition hover:border-red-400 hover:text-red-500"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

function HeartIcon() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2ead8] text-xl text-[#a8780c]">
      ♡
    </span>
  );
}
