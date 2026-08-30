import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import ReviewManagement from "./ReviewManagement";
import ProductManagement from "./ProductManagement";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reviews" element={<ReviewManagement />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/admin/products" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
}
