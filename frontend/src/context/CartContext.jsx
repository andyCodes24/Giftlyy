// src/context/CartContext.jsx
//
// Client-side cart state shared across Products, Recommendation, Cart
// and My Order pages. Persisted to localStorage so the cart survives
// a refresh. Checkout is wired to POST /orders when the user is
// logged in; if that endpoint isn't ready yet on the backend, it
// still records the order locally so My Order has something to show.

import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("giftly_cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem("giftly_orders");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("giftly_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("giftly_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const checkout = async (shippingAddress = "") => {
    if (items.length === 0) return null;

    const order = {
      id: Date.now(),
      items,
      total,
      shippingAddress,
      placedAt: new Date().toISOString(),
    };

    // Try to save the order to the backend if the user is logged in and
    // the endpoint exists yet. Falls back to a local-only record either way,
    // so checkout never dead-ends the user.
    if (token) {
      try {
        await api.post("/orders", { items, total, shippingAddress }, token);
      } catch {
        // Backend order endpoint may not be wired up yet — keep going.
      }
    }

    setOrders((prev) => [order, ...prev]);
    setItems([]);
    return order;
  };

  return (
    <CartContext.Provider
      value={{ items, orders, addToCart, removeFromCart, updateQty, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
