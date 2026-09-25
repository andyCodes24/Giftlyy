const express = require("express");

const router = express.Router();

const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Get the logged-in user's cart
router.get("/", protect, getCart);

// Add a product to the cart
router.post("/", protect, addToCart);

// Update product quantity
router.put("/:productId", protect, updateCartItem);

// Remove product from cart
router.delete("/:productId", protect, removeFromCart);

module.exports = router;