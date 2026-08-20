import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminSidebar from "./components/AdminSidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Cart from "./pages/Cart";

import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminStock from "./pages/admin/AdminStock";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminDashboard from "./pages/admin/AdminDashboard";

const Layout = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isCartPage = location.pathname === "/cart";

  return (
    <div className="min-h-screen bg-[#F4F4F3] w-full font-sans">
      {isAdminRoute ? (
        <div className="flex min-h-screen w-full">
          <AdminSidebar />

          <main className="flex-1 p-8 overflow-x-auto">
            <Routes>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/stock" element={<AdminStock />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
            </Routes>
          </main>
        </div>
      ) : (
        <>
          {!isCartPage && <Navbar />}

          {isCartPage ? (
            <div className="flex min-h-screen w-full">
              <Sidebar cartCount={4} />

              <main className="flex-1 pl-12 pr-8 py-8 overflow-x-hidden">
                <Routes>
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </main>
            </div>
          ) : (
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </main>
          )}
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
