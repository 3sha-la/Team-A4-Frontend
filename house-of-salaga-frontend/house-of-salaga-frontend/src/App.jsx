import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { getAuthToken, getStoredUser } from "./lib/api";

import AdminSidebar from "./components/AdminSidebar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import AllProductsPage from "./pages/AllProductsPage";
import Cart from "./pages/Cart";
import WishlistPage from "./pages/WishlistPage";
import OrderHistory from "./pages/OrderHistory";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import MyReviews from "./pages/MyReviews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProductManagement from "./pages/ProductManagement";
import ReviewManagement from "./pages/ReviewManagement";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminStock from "./pages/admin/AdminStock";

function ProtectedRoute({ children, admin = false }) {
  const token = getAuthToken();
  const user = getStoredUser();

  if (!token) return <Navigate to="/login" replace />;
  if (admin && user?.role !== "admin")
    return <Navigate to="/dashboard" replace />;
  return children;
}

function CustomerShell({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f6f3ee]">
      <Sidebar />
      {children}
    </div>
  );
}

function AdminShell({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F4F4F4]">
      <AdminSidebar />
      <main className="flex-1 py-10 overflow-x-hidden">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CustomerShell>
                <Dashboard />
              </CustomerShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <CustomerShell>
                <AllProductsPage />
              </CustomerShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <CustomerShell>
                <WishlistPage />
              </CustomerShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <CustomerShell>
                <PaymentPage />
              </CustomerShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <CustomerShell>
                <UserManagement />
              </CustomerShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <CustomerShell>
                <MyReviews />
              </CustomerShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute admin>
              <AdminShell>
                <AdminDashboard />
              </AdminShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute admin>
              <AdminShell>
                <AdminOrders />
              </AdminShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute admin>
              <AdminShell>
                <AdminAnalytics />
              </AdminShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute admin>
              <AdminShell>
                <AdminCategories />
              </AdminShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <ProtectedRoute admin>
              <AdminShell>
                <AdminStock />
              </AdminShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute admin>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute admin>
              <ReviewManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute admin>
              <AdminShell>
                <UserManagement />
              </AdminShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute admin>
              <AdminShell>
                <UserManagement />
              </AdminShell>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
