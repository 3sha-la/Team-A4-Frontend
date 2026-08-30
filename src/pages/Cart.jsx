import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";

export default function CartPage({
  cartItems: initialCartItems = [],
  setCartItems: parentSetCartItems,
}) {
  const navigate = useNavigate();

  const [localCartItems, setLocalCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 1 },
  ]);

  const cartItems = parentSetCartItems ? initialCartItems : localCartItems;
  const setCartItems = parentSetCartItems || setLocalCartItems;

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
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0,
  );

  const total = cartItems.length > 0 ? subtotal + shippingFee : 0;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;

    const orderSummary = {
      cartItems,
      subtotal,
      shippingFee,
      total,
    };

    localStorage.setItem("checkoutData", JSON.stringify(orderSummary));

    navigate("/checkout", {
      state: orderSummary,
    });
  };

  return (
    <main className="flex-1 bg-[#f6f3ee] px-5 py-7 sm:px-8 sm:py-10 lg:px-12 min-h-screen text-[#28231d]">
      <div className="flex flex-col justify-between gap-5 border-b border-[#e7e0d5] pb-7 sm:flex-row sm:items-end mb-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8780c]">
            Shopping Bag
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-[#28231d] sm:text-4xl">
            Cart Summary
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#81796d]">
            Review items, adjust quantity, and proceed to secure checkout.
          </p>
        </div>
        <Link
          to="/wishlist"
          className="flex w-fit items-center gap-1.5 rounded-md border border-[#d8cdbd] bg-white px-3 py-2 text-xs font-semibold text-[#5d5549] hover:bg-[#fbfaf7] transition"
        >
          View Wishlist →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-xs rounded-xl p-4 flex items-center justify-between border border-[#e7e0d5] shadow-xs font-sans"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#f2ead8] rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#28231d] text-sm font-serif">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#81796d] uppercase mt-0.5">
                      {item.category || "Luxury Wear"}
                    </p>
                    <p className="text-xs text-[#a8780c] font-semibold mt-1">
                      LKR {Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-[#d8cdbd] rounded-lg bg-[#fbfaf7]">
                    <button
                      onClick={() => handleDecreaseQty(item.id)}
                      className="px-3 py-1 text-[#5d5549] hover:bg-[#e7e0d5] rounded-l-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-bold text-sm text-[#28231d]">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => handleIncreaseQty(item.id)}
                      className="px-3 py-1 text-[#5d5549] hover:bg-[#e7e0d5] rounded-r-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold text-[#28231d] text-sm min-w-[90px] text-right">
                    LKR{" "}
                    {(
                      Number(item.price) * (item.quantity || 1)
                    ).toLocaleString()}
                  </span>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-[#81796d] hover:text-red-600 text-lg px-1 transition"
                    title="Remove Item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center border border-dashed border-[#d8cdbd] bg-white/40 px-6 py-16 text-center rounded-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2ead8] text-xl text-[#a8780c]">
                🛍️
              </span>
              <h2 className="mt-4 text-2xl font-serif">Your cart is empty</h2>
              <p className="mt-2 text-sm text-[#81796d]">
                Explore your saved wishlist to add items here.
              </p>
              <Link
                to="/wishlist"
                className="mt-4 text-xs font-bold text-[#a8780c] underline"
              >
                Go to Wishlist →
              </Link>
            </div>
          )}
        </div>

        {/* Order Price Summary */}
        <div className="bg-white rounded-2xl p-6 border border-[#e7e0d5] shadow-xs font-sans">
          <h2 className="text-xl font-semibold font-serif mb-6 text-[#28231d]">
            Order summary
          </h2>

          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between text-[#5d5549]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#28231d]">
                LKR {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-[#5d5549]">
              <span>Shipping Fee</span>
              <span className="font-semibold text-[#28231d]">
                {cartItems.length > 0
                  ? `LKR ${shippingFee.toLocaleString()}`
                  : "LKR 0"}
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-[#d8cdbd] pt-4 mb-8 flex justify-between items-center">
            <span className="font-bold font-serif text-base text-[#28231d]">
              Total Cost
            </span>
            <span className="font-bold text-xl text-[#a8780c]">
              LKR {total.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleProceedToCheckout}
            disabled={cartItems.length === 0}
            className={`w-full font-bold py-3.5 rounded-lg text-xs tracking-wider uppercase transition shadow-xs ${
              cartItems.length > 0
                ? "bg-[#28231d] hover:bg-[#423b32] text-[#f6f3ee] cursor-pointer"
                : "bg-[#e7e0d5] text-[#81796d] cursor-not-allowed"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
