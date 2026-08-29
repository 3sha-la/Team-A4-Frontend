// src/pages/Shop.jsx
import React from 'react';
import { products } from '../data/products';

const Shop = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen px-4 md:px-12 py-10 font-sans text-gray-900">
      
      {/* Header Section */}
      <div className="mb-10">
        <p className="text-sm font-bold text-gray-500 tracking-wider mb-2">ALL GEAR</p>
        <h1 className="text-5xl font-black tracking-tight mb-3">SHOP TECH.</h1>
        <p className="text-gray-600">32 pieces made for motion, focus and sound.</p>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Categories */}
            <h3 className="font-bold text-lg mb-4">Browse by</h3>
            <ul className="space-y-2 mb-8">
              <li className="flex justify-between items-center bg-[#FFD600] p-3 rounded-lg font-bold">
                <span>All products</span>
                <span>32</span>
              </li>
              <li className="flex justify-between items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span>Audio</span>
                <span>10</span>
              </li>
              <li className="flex justify-between items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span>Charging</span>
                <span>8</span>
              </li>
              <li className="flex justify-between items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span>Desk</span>
                <span>7</span>
              </li>
              <li className="flex justify-between items-center p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span>Travel</span>
                <span>7</span>
              </li>
            </ul>

            {/* Price Filter */}
            <h3 className="font-bold text-lg mb-4">Price</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 hover:border-black hover:text-black transition">
                Under $75
              </button>
              <button className="border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 hover:border-black hover:text-black transition">
                $75–150
              </button>
            </div>
          </div>
        </div>

        {/* Right Products Grid */}
        <div className="w-full lg:w-3/4">
          
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Showing {products.length} products</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold hover:border-black">
                <span className="text-lg">⚲</span> Filters
              </button>
              <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold hover:border-black">
                Newest <span className="text-xs">▼</span>
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 h-[300px] relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex gap-2 text-xs text-gray-500 mb-1">
                  <span>{product.category}</span>
                  {product.tag && (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-gray-700">{product.tag}</span>
                    </>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 text-lg">{product.name}</h4>
                <p className="font-bold mt-1">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;