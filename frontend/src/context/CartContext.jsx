// This file manages the shopping cart for the application.
//
// The cart is now stored in MongoDB through the backend API
// when the user is logged in.
//
// This means:
// Add to Cart → MongoDB cart
// Checkout → MongoDB order
//
// The frontend no longer creates fake/local orders when the
// backend fails.

import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();

  // Store the cart items displayed on the frontend.
  const [items, setItems] = useState([]);

  // Store orders returned from the backend.
  const [orders, setOrders] = useState([]);

  // Load the user's cart from MongoDB when they are logged in.
  useEffect(() => {
    if (!token) {
      setItems([]);
      return;
    }

    api
      .get("/cart", token)
      .then((res) => {
        const cart = res?.data;

        if (cart && Array.isArray(cart.items)) {
          // Convert the MongoDB cart format into the format
          // currently used by the frontend.
          const formattedItems = cart.items.map((item) => ({
            id: item.product?._id || item.product?.id,
            _id: item.product?._id,
            name: item.product?.name,
            price: item.product?.price,
            occasion: item.product?.occasion,
            stock: item.product?.stock,
            qty: item.quantity,
          }));

          setItems(formattedItems);
        } else {
          setItems([]);
        }
      })
      .catch((error) => {
        console.error("Failed to load cart:", error);
        setItems([]);
      });
  }, [token]);

  // Load the user's orders from MongoDB when they are logged in.
  useEffect(() => {
    if (!token) {
      setOrders([]);
      return;
    }

    api
      .get("/orders", token)
      .then((res) => {
        const orderList = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : [];

        setOrders(orderList);
      })
      .catch((error) => {
        console.error("Failed to load orders:", error);
        setOrders([]);
      });
  }, [token]);

  // Add a product to the MongoDB cart.
  const addToCart = async (product) => {
    if (!token) {
      throw new Error("Please log in before adding items to your cart.");
    }

    try {
      const res = await api.post(
        "/cart",
        {
          productId: product.id || product._id,
          quantity: 1,
        },
        token
      );

      const cart = res?.data;

      if (cart && Array.isArray(cart.items)) {
        const formattedItems = cart.items.map((item) => ({
          id: item.product?._id || item.product?.id,
          _id: item.product?._id,
          name: item.product?.name,
          price: item.product?.price,
          occasion: item.product?.occasion,
          stock: item.product?.stock,
          qty: item.quantity,
        }));

        setItems(formattedItems);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      throw error;
    }
  };

  // Remove a product from the MongoDB cart.
  const removeFromCart = async (id) => {
    if (!token) {
      throw new Error("Please log in before changing your cart.");
    }

    try {
      const res = await api.del(`/cart/${id}`, token);
      const cart = res?.data;

      if (cart && Array.isArray(cart.items)) {
        const formattedItems = cart.items.map((item) => ({
          id: item.product?._id || item.product?.id,
          _id: item.product?._id,
          name: item.product?.name,
          price: item.product?.price,
          occasion: item.product?.occasion,
          stock: item.product?.stock,
          qty: item.quantity,
        }));

        setItems(formattedItems);
      }
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
      throw error;
    }
  };

  // Update the quantity of a product in the MongoDB cart.
  const updateQty = async (id, delta) => {
    if (!token) {
      throw new Error("Please log in before changing your cart.");
    }

    const currentItem = items.find((item) => item.id === id);

    if (!currentItem) {
      return;
    }

    const newQuantity = Math.max(1, currentItem.qty + delta);

    try {
      const res = await api.put(
        `/cart/${id}`,
        {
          quantity: newQuantity,
        },
        token
      );

      const cart = res?.data;

      if (cart && Array.isArray(cart.items)) {
        const formattedItems = cart.items.map((item) => ({
          id: item.product?._id || item.product?.id,
          _id: item.product?._id,
          name: item.product?.name,
          price: item.product?.price,
          occasion: item.product?.occasion,
          stock: item.product?.stock,
          qty: item.quantity,
        }));

        setItems(formattedItems);
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
      throw error;
    }
  };

  // Calculate the cart total.
  const total = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.qty,
    0
  );

  // Create a real order in MongoDB.
  const checkout = async (shippingAddress = "") => {
    if (items.length === 0) {
      return null;
    }

    if (!token) {
      throw new Error("Please log in before checking out.");
    }

    try {
      // The backend gets the cart directly from MongoDB.
      // We only need to send the shipping address.
      const res = await api.post(
        "/orders",
        {
          shippingAddress,
        },
        token
      );

      const createdOrder = res?.data;

      // Add the newly created order to the frontend.
      if (createdOrder) {
        setOrders((prev) => [createdOrder, ...prev]);
      }

      // The backend empties the MongoDB cart after
      // successfully creating the order.
      setItems([]);

      return createdOrder;
    } catch (error) {
      console.error("Failed to create order:", error);

      // IMPORTANT:
      // Do not create a fake local order.
      // Show the actual backend error instead.
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        addToCart,
        removeFromCart,
        updateQty,
        total,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return ctx;
};