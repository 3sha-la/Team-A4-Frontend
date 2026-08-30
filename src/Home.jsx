import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-gray-900 pb-10">
      
      {/* Top Navbar */}
      <header className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center bg-white mt-4 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="bg-[#FFD600] text-black font-black px-2.5 py-1 rounded text-lg">H</div>
          <span className="font-black text-xl tracking-wide uppercase">House of Salaga</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-bold items-center">
          <Link to="/" className="hover:text-gray-600 transition">Home</Link>
          <Link to="/shop" className="hover:text-gray-600 transition">Shop</Link>
          <a href="#" className="hover:text-gray-600 transition">Campaigns</a>
          <a href="#" className="hover:text-gray-600 transition">Search</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <button className="bg-[#FFD600] text-black px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-yellow-400 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            Bag 0
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 bg-white pb-16 rounded-b-xl shadow-sm">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-[#FFD600] rounded-2xl p-10 md:p-14 flex flex-col justify-center items-start">
            <span className="text-[11px] font-black tracking-widest uppercase mb-4">Drop 04 · Everyday Tech</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] uppercase mb-8">
              Power up<br/>your<br/>setup.
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="bg-black text-white px-6 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition">
                Shop the drop <span className="text-lg leading-none">→</span>
              </Link>
              <button className="border-2 border-black text-black px-6 py-3.5 rounded-full text-sm font-bold hover:bg-black hover:text-white transition">
                Watch campaign
              </button>
            </div>
          </div>

          <div className="bg-[#D4B925] rounded-2xl relative overflow-hidden h-[400px] md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop" 
              alt="Airpods" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" 
            />
            <div className="absolute bottom-6 left-6 bg-white px-5 py-3.5 rounded-xl shadow-sm">
              <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Featured</span>
              <span className="block font-black text-sm">Orbit ANC Headphones</span>
            </div>
          </div>
        </section>

        {/* Gear for every mode Section */}
        <section className="mt-20">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2 block">Shop by ritual</span>
              <h2 className="text-2xl font-black">Gear for every mode.</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold underline underline-offset-4 hover:text-gray-600">View all gear</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121212] text-white rounded-2xl p-8 flex flex-col justify-between h-[240px]">
              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <div>
                <h3 className="text-xl font-black uppercase mb-1">Listen</h3>
                <p className="text-sm text-gray-400">Audio that goes all in.</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-8 flex flex-col justify-between h-[240px]">
              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              <div>
                <h3 className="text-xl font-black uppercase mb-1">Charge</h3>
                <p className="text-sm text-gray-500">Power for the long haul.</p>
              </div>
            </div>
            <div className="bg-[#FFF8D6] rounded-2xl p-8 flex flex-col justify-between h-[240px]">
              <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <div>
                <h3 className="text-xl font-black uppercase mb-1">Desk</h3>
                <p className="text-sm text-gray-700">Make your space work harder.</p>
              </div>
            </div>
          </div>
        </section>

        {/* This week's signal Section */}
        <section className="mt-20">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-black">This week's signal.</h2>
            <Link to="/shop" className="text-xs font-bold underline underline-offset-4 hover:text-gray-600">Shop all</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400', cat: 'Audio', title: 'Orbit ANC Headphones', price: '$249' },
              { img: 'https://images.unsplash.com/photo-1585565804112-f201f68c48b4?q=80&w=400', cat: 'Charge', title: 'Fuse 3-in-1 Dock', price: '$89' },
              { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400', cat: 'Audio', title: 'Loop Mini Speaker', price: '$59' },
              { img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400', cat: 'Desk', title: 'Axis Laptop Stand', price: '$74' }
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] mb-4">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">{item.cat}</span>
                <h4 className="text-sm font-black text-black mb-1">{item.title}</h4>
                <p className="text-sm font-bold text-gray-700">{item.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between text-xs text-gray-400 font-medium gap-4">
        <p>House of Salaga — Tech that keeps up.</p>
        <p>Free shipping over $75 · 30-day returns</p>
      </footer>
    </div>
  );
}