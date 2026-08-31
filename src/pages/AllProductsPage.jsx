import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

/**
 * Product catalog page — browse and tap the heart / "Add to Wishlist"
 * button on any card to save it (handled inside ProductCard via context).
 */
export default function AllProductsPage() {
  return (
    <main className="flex-1 bg-[#f6f3ee] px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
      <div className="flex flex-col justify-between gap-5 border-b border-[#e7e0d5] pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8780c]">The collection</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#28231d] sm:text-4xl">All Products</h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[#81796d]">
            Thoughtfully selected essentials inspired by Sri Lanka's rich craft and beauty traditions.
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a09483]">{products.length} pieces</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}