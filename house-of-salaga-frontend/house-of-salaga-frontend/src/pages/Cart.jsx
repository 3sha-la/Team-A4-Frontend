import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiFetch } from "../lib/api";
import { normalizeCartItem } from "../lib/normalizers";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const data = await apiFetch("/cart", {
        auth: true,
      });

      setCartItems((data.cart?.items || []).map(normalizeCartItem));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (id, delta) => {
    const item = cartItems.find((entry) => entry.id === id);

    if (!item) return;

    const quantity = item.qty + delta;

    if (quantity <= 0) return;

    try {
      const data = await apiFetch("/cart/update-quantity", {
        method: "PUT",
        auth: true,
        body: {
          productId: id,
          quantity,
        },
      });

      setCartItems((data.cart?.items || []).map(normalizeCartItem));
    } catch (error) {
      alert(error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const data = await apiFetch(`/cart/remove/${id}`, {
        method: "DELETE",
        auth: true,
      });

      setCartItems((data.cart?.items || []).map(normalizeCartItem));
    } catch (error) {
      alert(error.message);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const shipping = cartItems.length > 0 ? 1650.0 : 0;

  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen bg-[#F4F4F4] font-sans text-gray-900">
      {/* SAME CUSTOMER SIDEBAR */}
      <Sidebar />

      {/* CART CONTENT */}
      <main className="flex-1 min-w-0 p-10">
        <div className="max-w-[92%] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-black tracking-tight">
              Cart
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Review items, adjust quantity, and proceed to secure checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-400 py-10 font-medium">
                  Your cart is empty.
                </p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="py-5 first:pt-0 last:pb-0 flex items-center justify-between"
                    >
                      {/* Product */}
                      <div className="flex items-center gap-4">
                        {item.img ? (
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-xl bg-gray-50"
                          />
                        ) : (
                          <div className="w-16 h-20 rounded-xl bg-gray-50" />
                        )}

                        <div>
                          <h3 className="text-sm font-bold text-black">
                            {item.name}
                          </h3>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 hover:underline mt-1 font-medium block"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity + Price */}
                      <div className="flex items-center gap-8">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                          >
                            -
                          </button>

                          <span className="px-3 text-sm font-bold">
                            {item.qty}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                          >
                            +
                          </button>
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
              <h3 className="text-lg font-black text-black mb-6">
                Order summary
              </h3>

              <div className="space-y-4 text-sm font-medium text-gray-600 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span className="font-bold text-black">
                    LKR {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span className="font-bold text-black">
                    LKR {shipping.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6 text-base font-black text-black">
                <span>Total</span>

                <span className="text-[#D4AF37]">LKR {total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/payment")}
                disabled={cartItems.length === 0}
                className="w-full bg-[#FFD700] hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
