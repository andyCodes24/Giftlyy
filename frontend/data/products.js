// src/data/products.js
//
// Placeholder catalogue matching the Figma prototype. Once Member 4's
// Product API is live, replace this with a fetch to GET /api/products
// (see Products.jsx — the fetch call is already stubbed in there).

export const OCCASIONS = ["Birthday", "Wedding", "Valentines Day", "Anniversary Day"];

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
    occasion: "Valentines Day",
    name: "Valentines Gift",
    price: 400,
  },
  {
    id: 4,
    occasion: "Anniversary Day",
    name: "Anniversary Gift",
    price: 500,
  },
  {
    id: 5,
    occasion: "Valentines Day",
    name: "Love and Chocolate Box",
    price: 350,
  },
  {
    id: 6,
    occasion: "Valentines Day",
    name: "Valentine's Keepsake",
    price: 400,
  },
];
