# House of Salaga Backend

Corrected full backend based on the supplied backend files.

## Main fixes included

- One module system everywhere: ES Modules
- All routes mounted in `app.js`
- JWT middleware loads the current user
- Admin-only protection
- Cart and review import paths corrected
- `stock` field used consistently
- Wishlist routes protected
- Order ownership checks added
- Checkout persistence added
- Delivery persistence added
- Centralized error handling
- Input validation for auth/reviews
- Soft-delete behavior for products

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI`.
3. Set a strong `JWT_SECRET`.
4. Run:

```bash
npm install
npm run dev
```

Default URL:

```text
http://localhost:5000
```

## Main routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### User

- `GET /api/users/profile`
- `PUT /api/users/profile`
- `POST /api/users/forgot-password`
- `POST /api/users/reset-password`

### Products

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` Admin
- `PUT /api/products/:id` Admin
- `PATCH /api/products/:id` Admin
- `DELETE /api/products/:id` Admin

### Categories

- `GET /api/categories`

### Cart

- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/update-quantity`
- `DELETE /api/cart/remove/:productId`

### Wishlist

- `GET /api/wishlist`
- `POST /api/wishlist`
- `POST /api/wishlist/move-to-cart/:id`
- `DELETE /api/wishlist/:id`

### Reviews

- `GET /api/reviews/product/:productId`
- `GET /api/reviews/product/:productId/rating`
- `GET /api/reviews/my-reviews`
- `POST /api/reviews/:productId`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`

### Orders

- `POST /api/orders`
- `GET /api/orders/myorders`
- `GET /api/orders/history`
- `GET /api/orders/:orderId`
- `POST /api/orders/:orderId/confirm`

### Checkout

- `POST /api/checkout`
- `GET /api/checkout/:checkoutId`

### Delivery

- `POST /api/delivery`
- `GET /api/delivery/:orderId`
- `PUT /api/delivery/:deliveryId`

### Admin

- `GET /api/admin/dashboard`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT /api/admin/products/:id`
- `DELETE /api/admin/products/:id`
- `GET /api/admin/categories`
- `POST /api/admin/categories`
- `DELETE /api/admin/categories/:id`
- `PUT /api/admin/stock/:id`
- `GET /api/admin/orders`
- `PUT /api/admin/orders/:id/status`
- `GET /api/admin/reports/sales`

## Create the first admin

Register a normal account first, then change its `role` field in MongoDB from:

```text
customer
```

to:

```text
admin
```

This intentionally prevents public users from registering themselves as administrators.

## Important note

The forgot-password route returns a reset token in the API response because the supplied backend did not include an email service. For production use, send that token through a verified email flow instead.
