import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 1 },
    { ...products[2], quantity: 1 },
    { ...products[3], quantity: 1 },
  ]);

  const shippingFee = 1650;

  const handleIncreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  const total = cartItems.length > 0 ? subtotal + shippingFee : 0;

  return (
    <div className="w-full min-h-screen bg-[#F4F4F3] p-6 md:p-10 font-serif text-gray-900">
      <div className="mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold font-serif mb-1">Cart</h1>
        <p className="text-gray-500 text-sm font-sans">
          Review items, adjust quantity, and proceed to secure checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 font-sans"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm font-serif">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 uppercase mt-0.5">
                      {item.category || "Luxury Wear"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                    <button
                      onClick={() => handleDecreaseQty(item.id)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-l-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-bold text-sm text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQty(item.id)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-r-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold text-gray-900 text-sm min-w-[90px] text-right">
                    LKR {(Number(item.price) * item.quantity).toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500 text-lg px-1 transition"
                    title="Remove Item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center text-gray-500 font-sans border border-gray-100">
              <p className="text-base font-bold text-gray-700 mb-2">
                Your cart is empty
              </p>
              <Link
                to="/shop"
                className="inline-block mt-2 text-xs font-bold text-[#E5A800] underline"
              >
                Explore Products →
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 font-sans">
          <h2 className="text-xl font-bold font-serif mb-6 text-gray-900">
            Order summary
          </h2>

          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                LKR {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">
                {cartItems.length > 0
                  ? `LKR ${shippingFee.toLocaleString()}`
                  : "LKR 0"}
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4 mb-8 flex justify-between items-center">
            <span className="font-bold font-serif text-base text-gray-900">
              Total
            </span>
            <span className="font-bold text-xl text-[#D49E00]">
              LKR {total.toLocaleString()}
            </span>
          </div>

          <button
            disabled={cartItems.length === 0}
            className={`w-full font-bold py-3.5 rounded-lg text-sm transition shadow-sm ${
              cartItems.length > 0
                ? "bg-[#E5A800] hover:bg-[#c99300] text-black cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
