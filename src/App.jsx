import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Cart";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}