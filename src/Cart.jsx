import React, { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Luxury Handwoven Linen Shirt', qty: 1, price: 3790.00, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400' },
    { id: 2, name: 'Premium Designer Leather Heels', qty: 1, price: 5990.00, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400' },
    { id: 3, name: 'Elegance Italian Leather Handbag', qty: 1, price: 4900.00, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400' },
    { id: 4, name: 'Signature Tailored Blazer', qty: 1, price: 14900.00, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400' },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = cartItems.length > 0 ? 1650.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen bg-[#F4F4F4] font-sans text-gray-900">
      
      {/* Left Sidebar (Black) */}
      <aside className="w-72 bg-black text-white flex flex-col justify-between p-6 fixed h-full">
        <div>
          <div className="mb-10">
            <h2 className="font-black text-lg tracking-wide uppercase text-[#FFD700]">HOUSE OF SALAGA</h2>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">LUXURY HERITAGE WEAR</p>
          </div>

          <nav className="space-y-4 text-sm font-medium">
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>🏠</span> Home Collection</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>📦</span> All Product</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>🛍️</span> My Orders</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>🤍</span> My Wishlist</a>
            <a href="#" className="flex items-center gap-3 bg-[#1A1A1A] text-[#FFD700] px-4 py-3 rounded-xl font-bold border-l-4 border-[#FFD700]"><span>🛒</span> Shopping Cart</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>⭐</span> Reviews & Ratings</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>👤</span> My Profile</a>
          </nav>
        </div>

        <div className="bg-[#121212] p-4 rounded-xl flex items-center justify-between border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black font-black flex items-center justify-center">AS</div>
            <div>
              <h4 className="text-sm font-bold text-white">Amara Silva</h4>
              <span className="text-[11px] text-red-500 font-medium cursor-pointer">Sign Out</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 p-10 max-w-[1200px]">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-black tracking-tight">Cart</h1>
          <p className="text-sm text-gray-500 mt-1">Review items, adjust quantity, and proceed to secure checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 py-10 font-medium">Your cart is empty.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-xl bg-gray-50" />
                      <div>
                        <h3 className="text-sm font-bold text-black">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="text-xs text-red-500 hover:underline mt-1 font-medium block">
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold">-</button>
                        <span className="px-3 text-sm font-bold">{item.qty}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold">+</button>
                      </div>

                      <span className="text-sm font-bold text-black w-24 text-right">
                        LKR {(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <h3 className="text-lg font-black text-black mb-6">Order summary</h3>
            
            <div className="space-y-4 text-sm font-medium text-gray-600 border-b border-gray-100 pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-black">LKR {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-black">LKR {shipping.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6 text-base font-black text-black">
              <span>Total</span>
              <span className="text-[#D4AF37]">LKR {total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-[#FFD700] hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition shadow-sm">
              Proceed to checkout
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}