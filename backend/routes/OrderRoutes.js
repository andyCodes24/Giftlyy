const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Create an order / checkout
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/", protect, getOrders);

// Get one order
router.get("/:id", protect, getOrderById);

// Cancel an order
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;