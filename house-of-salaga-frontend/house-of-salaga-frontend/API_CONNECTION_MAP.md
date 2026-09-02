# API Connection Map

| Frontend | Backend |
|---|---|
| Login.jsx | POST `/api/auth/login` |
| Register.jsx | POST `/api/auth/register` |
| ForgotPassword.jsx | POST `/api/users/forgot-password` |
| Profile.jsx | GET/PUT `/api/users/profile` |
| Shop.jsx | GET `/api/products` |
| AllProductsPage.jsx | GET `/api/products` |
| Search.jsx | GET `/api/products?search=...` |
| ProductDetails.jsx | GET `/api/products/:id`, GET rating, POST cart |
| WishlistContext.jsx | GET/POST/DELETE `/api/wishlist`, move-to-cart |
| Cart.jsx | GET/PUT/DELETE `/api/cart` |
| PaymentPage.jsx | GET cart, POST checkout, POST order, POST confirm, POST delivery |
| OrderHistory.jsx | GET `/api/orders/myorders` |
| MyReviews.jsx | GET `/api/reviews/my-reviews` |
| ProductManagement.jsx | Admin product CRUD |
| ReviewManagement.jsx | Admin review list/status/delete |
| AdminDashboard.jsx | Admin dashboard/products/sales |
| AdminOrders.jsx | Admin orders + status updates |
| AdminStock.jsx | Admin products + stock updates |
| AdminCategories.jsx | Admin categories/products |
| AdminAnalytics.jsx | Dashboard/sales/orders/products |
