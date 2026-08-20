import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-gray-900 font-sans">
      <section className="px-4 md:px-12 py-20 text-center max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
          High Performance Gear
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          ENGINEERED FOR MOTION.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Minimalist, durable, and precision-crafted tools built for developers,
          creators, and modern workflows.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-[#FFD600] text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-[#e6c200] transition"
        >
          Explore All Products
        </Link>
      </section>

      <section className="px-4 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black uppercase">
              Featured Essentials
            </h2>
            <p className="text-sm text-gray-500">
              Handpicked gear for your daily setup.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-black hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-lg transition"
            >
              <div className="bg-gray-100 rounded-xl overflow-hidden h-[280px] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {product.category}
              </p>
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="font-bold text-gray-900">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
