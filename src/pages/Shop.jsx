import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const Shop = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen px-4 md:px-12 py-10 font-sans text-gray-900">
      <div className="mb-10">
        <p className="text-sm font-bold text-gray-500 tracking-wider mb-2">
          ALL GEAR
        </p>
        <h1 className="text-5xl font-black tracking-tight mb-3">SHOP TECH.</h1>
        <p className="text-gray-600">
          {products.length} pieces made for motion, focus and sound.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Browse by</h3>
            <ul className="space-y-2 mb-8">
              <li className="flex justify-between items-center bg-[#FFD600] p-3 rounded-lg font-bold">
                <span>All products</span>
                <span>{products.length}</span>
              </li>
              <li className="flex justify-between items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span>Audio</span>
                <span>10</span>
              </li>
              <li className="flex justify-between items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span>Charging</span>
                <span>8</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group cursor-pointer bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition"
              >
                <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 h-[240px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex gap-2 text-xs text-gray-500 mb-1">
                  <span>{product.category}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base">
                  {product.name}
                </h4>
                <p className="font-bold mt-1 text-black">${product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
