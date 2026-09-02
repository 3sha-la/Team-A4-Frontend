# House of Salaga Frontend - Backend Connected

This frontend keeps the supplied page/component UI structure and connects the data layer to the corrected House of Salaga backend.

## Run

1. Start the backend on port `5000`.
2. In this frontend folder, copy `.env.example` to `.env`.
3. Install dependencies:

```bash
npm install
```

4. Start Vite:

```bash
npm run dev
```

Default frontend: `http://localhost:5173`
Default API: `http://localhost:5000/api`

## Environment

```env
VITE_API_URL=http://localhost:5000/api
```

## Connected features

- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- User profile read/update: `/api/users/profile`
- Forgot password request: `/api/users/forgot-password`
- Product listing/details/search: `/api/products`
- Cart read/add/update/remove: `/api/cart`
- Wishlist read/add/remove/move-to-cart: `/api/wishlist`
- User orders/history: `/api/orders`
- Checkout persistence: `/api/checkout`
- Delivery creation: `/api/delivery`
- User reviews list and product rating: `/api/reviews`
- Admin dashboard/products/categories/stock/orders/reviews/reports: `/api/admin` + review admin routes

## Authentication

JWT is stored in localStorage when "Remember me" is checked, otherwise sessionStorage is used. Authenticated API calls automatically send:

```text
Authorization: Bearer <token>
```

Admin routes are protected in both the frontend route guard and backend middleware.

## Static test data

The original `src/data/adminData.js`, `src/data/products.js`, and `src/data/products.jsx` are retained only as reference. The connected pages no longer import them for live catalog/admin data.

## Current backend limitations

These were not silently faked because the supplied/corrected backend does not expose the required service:

1. **Admin user list/CRUD** - the backend has a total user count but no `/api/admin/users` listing/management endpoint. The existing `UserManagement` UI is an account-centre style page, not a true admin user table.
2. **Profile phone and billing fields** - the backend User model currently stores only name, email, password, and role. Phone/billing UI values are retained locally in the browser while name/email are saved to MongoDB.
3. **Real card/PayPal charging** - no Stripe/PayPal server integration exists. The payment page validates its form, creates checkout/order records, confirms the order, and optionally creates delivery details, but it does not charge a real card.
4. **Forgot-password email delivery** - the backend currently returns a reset token instead of sending an email. The frontend calls the real endpoint and stores the returned token in sessionStorage, but a mail provider/reset-link flow still needs to be implemented for production.
5. **Category update endpoint** - the backend has category create/get/delete but no PUT. The existing category edit UI is supported using the available endpoints (create/delete plus product category updates) without changing its visual design.
6. **Historical percentage comparisons/activity feeds** - some labels such as “vs last month” and recent activity text remain visual placeholders because the backend does not expose prior-period comparison/activity-log endpoints.

## UI preservation

Existing Tailwind classes, inline styles, page layouts, cards, charts, spacing, colors, and primary views were kept. Changes are focused on API data, route wiring, authentication, navigation behavior, and state management.
