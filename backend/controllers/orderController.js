const Order = require("../models/OrderModels");
const Cart = require("../models/CartModels");
const Product = require("../models/ProductModels");

// Create an order from the user's cart
// POST /api/orders
const createOrder = async (req, res, next) => {
    try {
        const { shippingAddress } = req.body;

        // Check shipping address
        if (!shippingAddress || shippingAddress.trim() === "") {
            res.status(400);
            return next(new Error("Shipping address is required"));
        }

        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product");

        if (!cart || cart.items.length === 0) {
            res.status(400);
            return next(new Error("Cart is empty"));
        }

        const orderItems = [];
        let totalAmount = 0;

        // Check each cart item
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);

            if (!product) {
                res.status(404);
                return next(new Error("Product not found"));
            }

            // Check stock
            if (product.stock < item.quantity) {
                res.status(400);
                return next(
                    new Error(`Not enough stock for ${product.name}`)
                );
            }

            // Save product, quantity and current price
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });

            // Calculate total
            totalAmount += product.price * item.quantity;
        }

        // Create the order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount: totalAmount,
            shippingAddress: shippingAddress
        });

        // Reduce product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: { stock: -item.quantity }
                }
            );
        }

        // Empty the cart after successful checkout
        cart.items = [];
        await cart.save();

        // Return the created order
        const createdOrder = await Order.findById(order._id)
            .populate("items.product");

        res.status(201).json({
            success: true,
            data: createdOrder
        });

    } catch (error) {
        next(error);
    }
};


// Get all orders belonging to the logged-in user
// GET /api/orders
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {
        next(error);
    }
};


// Get one order belonging to the logged-in user
// GET /api/orders/:id
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate("items.product");

        if (!order) {
            res.status(404);
            return next(new Error("Order not found"));
        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        next(error);
    }
};


// Cancel an order
// PUT /api/orders/:id/cancel
const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            res.status(404);
            return next(new Error("Order not found"));
        }

        if (order.status === "cancelled") {
            res.status(400);
            return next(new Error("Order is already cancelled"));
        }

        if (order.status === "delivered") {
            res.status(400);
            return next(new Error("Delivered orders cannot be cancelled"));
        }

        order.status = "cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder
};