// src/data/products.js
//
// Placeholder catalogue matching the Figma prototype. Once Member 4's
// Product API is live, replace this with a fetch to GET /api/products
// (see Products.jsx — the fetch call is already stubbed in there).

// These must match the occasion strings stored on the backend
// (see backend/data/products.js) or the filter chips won't match anything
// once real API data is loaded.
export const OCCASIONS = ["Birthday", "Wedding", "Valentine's Day", "Anniversary"];

export const products = [
  {
    id: 1,
    occasion: "Birthday",
    name: "Birthday Gift Box",
    price: 350,
  },
  {
    id: 2,
    occasion: "Wedding",
    name: "Wedding Gift",
    price: 450,
  },
  {
    id: 3,
    occasion: "Valentine's Day",
    name: "Valentines Gift",
    price: 400,
  },
  {
    id: 4,
    occasion: "Anniversary",
    name: "Anniversary Gift",
    price: 500,
  },
  {
    id: 5,
    occasion: "Valentine's Day",
    name: "Love and Chocolate Box",
    price: 350,
  },
  {
    id: 6,
    occasion: "Valentine's Day",
    name: "Valentine's Keepsake",
    price: 400,
  },
];
