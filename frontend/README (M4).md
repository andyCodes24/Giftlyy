# Giftly Frontend

React implementation of the Figma prototype: Home, Products, Recommendation,
Cart, My Order, Login, and Register — all wired together with working state
(cart, auth) instead of static mockups.

## Setup

1. Copy the `src/` folder into your team's existing React app (merge with
   what's already there — don't overwrite `App.jsx` blindly if teammates have
   added other routes).
2. Install the one extra dependency this uses:
   ```
   npm install react-router-dom
   ```
3. Set your backend API URL as an environment variable in `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   (Defaults to `http://localhost:5000/api` if not set.)
4. `npm start`

## What's wired up vs. what needs your team's endpoints

- **Login / Register** call `POST /api/auth/login` and `POST /api/auth/register`
  and expect a response shaped like `{ user: {...}, token: "..." }`. If your
  teammate's auth routes return a different shape, adjust `AuthContext.jsx`.
- **Products** tries `GET /api/products` first and falls back to the local
  placeholder catalogue (`src/data/products.js`) if that request fails —
  so the page works today and switches over automatically once the Product
  API is live.
- **Cart / Checkout** is fully client-side (persisted to `localStorage`) and
  optionally POSTs to `/api/orders` on checkout if the user is logged in —
  wrap that in a try/catch removal once that endpoint exists and you want it
  to be required rather than best-effort.
- **My Order** currently reads from the same local cart/orders state. Once
  there's a `GET /api/orders` endpoint, swap that in to fetch the logged-in
  user's real order history.

## Design notes

Palette and type were tightened up from the Figma greys into an actual
lilac/plum gift-shop look (Playfair Display for headings, Poppins for body),
but the structure — nav order, page names, occasion categories, budget
recommender — follows the prototype exactly.
