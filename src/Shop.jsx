import React from 'react';
import { Link } from 'react-router-dom';

export default function Shop() {
  const products = [
    { id: 1, name: 'Orbit ANC Headphones', category: 'Audio', tag: 'Best seller', price: '$249', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400' },
    { id: 2, name: 'Fuse 3-in-1 Dock', category: 'Charging', price: '$89', img: 'https://images.unsplash.com/photo-1585565804112-f201f68c48b4?q=80&w=400' },
    { id: 3, name: 'Loop Mini Speaker', category: 'Audio', price: '$59', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400' },
    { id: 4, name: 'Axis Laptop Stand', category: 'Desk', price: '$74', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400' },
    { id: 5, name: 'Flux USB-C Cable', category: 'Charging', price: '$24', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400' },
    { id: 6, name: 'Field Tech Pouch', category: 'Travel', price: '$45', img: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=400' },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-gray-900 pb-10">
      
      {/* Top Navbar with Home Button */}
      <header className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center bg-white mt-4 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="bg-[#FFD600] text-black font-black px-2.5 py-1 rounded text-lg">H</div>
          <Link to="/" className="font-black text-xl tracking-wide uppercase">House of Salaga</Link>
        </div>
        
        {/* Navigation Links including Home */}
        <nav className="hidden md:flex gap-8 text-sm font-bold items-center">
          <Link to="/" className="hover:text-gray-600 transition">Home</Link>
          <Link to="/shop" className="underline underline-offset-4 decoration-2">Shop</Link>
          <Link to="#" className="hover:text-gray-600 transition">Campaigns</Link>
          <Link to="#" className="hover:text-gray-600 transition">Search</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="bg-[#FFD600] text-black px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-yellow-400 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 bg-white pb-16 rounded-b-xl shadow-sm">
        
        {/* Header Section */}
        <section className="pt-12 pb-8 border-b border-gray-100 flex justify-between items-end">
          <div>
            <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2 block">All Gear</span>
            <h1 className="text-5xl font-black uppercase tracking-tight">Shop Tech.</h1>
            <p className="text-gray-500 text-sm mt-3">32 pieces made for motion, focus and sound.</p>
          </div>
          <button className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filters
          </button>
        </section>

        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="font-bold text-sm mb-4">Browse by</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <button className="w-full flex justify-between items-center bg-[#FFD600] px-3 py-2 rounded-lg font-bold">
                    <span>All products</span>
                    <span className="text-xs">32</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
                    <span>Audio</span>
                    <span className="text-xs text-gray-400">10</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
                    <span>Charging</span>
                    <span className="text-xs text-gray-400">8</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
                    <span>Desk</span>
                    <span className="text-xs text-gray-400">7</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
                    <span>Travel</span>
                    <span className="text-xs text-gray-400">7</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-sm mb-4">Price</h3>
              <div className="flex gap-2">
                <button className="border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium hover:border-black">Under $75</button>
                <button className="border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium hover:border-black">$75–150</button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500">Showing 32 products</span>
              <select className="border border-gray-200 text-sm font-medium rounded-lg px-3 py-2 bg-white focus:outline-none">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{product.category}</span>
                    {product.tag && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{product.tag}</span>
                      </>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-black mb-1">{product.name}</h4>
                  <p className="text-sm font-bold text-gray-800">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}