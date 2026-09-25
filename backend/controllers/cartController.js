const Cart = require("../models/CartModels");

// Get the logged-in user's cart
// GET /api/cart
const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product");

        // If the user does not have a cart yet
        if (!cart) {
            return res.status(200).json({
                success: true,
                data: {
                    user: req.user._id,
                    items: []
                }
            });
        }

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        next(error);
    }
};


// Add a product to the cart
// POST /api/cart
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // Check that product ID was provided
        if (!productId) {
            res.status(400);
            return next(new Error("Product ID is required"));
        }

        // If quantity is not provided, use 1
        const cartQuantity = quantity || 1;

        // Quantity cannot be less than 1
        if (cartQuantity < 1) {
            res.status(400);
            return next(new Error("Quantity must be at least 1"));
        }

        // Find the logged-in user's cart
        let cart = await Cart.findOne({ user: req.user._id });

        // If the user does not have a cart, create one
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [
                    {
                        product: productId,
                        quantity: cartQuantity
                    }
                ]
            });

        } else {

            // Check if the product is already in the cart
            const existingItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingItem) {
                // If it already exists, increase the quantity
                existingItem.quantity += cartQuantity;
            } else {
                // Otherwise add a new product
                cart.items.push({
                    product: productId,
                    quantity: cartQuantity
                });
            }

            await cart.save();
        }

        // Get the updated cart and include product information
        const updatedCart = await Cart.findById(cart._id)
            .populate("items.product");

        res.status(200).json({
            success: true,
            data: updatedCart
        });

    } catch (error) {
        next(error);
    }
};


// Update the quantity of a product in the cart
// PUT /api/cart/:productId
const updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        // Check quantity
        if (quantity === undefined || quantity < 1) {
            res.status(400);
            return next(new Error("Quantity must be at least 1"));
        }

        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            res.status(404);
            return next(new Error("Cart not found"));
        }

        // Find the product inside the cart
        const item = cart.items.find(
            item => item.product.toString() === req.params.productId
        );

        if (!item) {
            res.status(404);
            return next(new Error("Product not found in cart"));
        }

        // Update quantity
        item.quantity = quantity;

        await cart.save();

        // Return updated cart
        const updatedCart = await Cart.findById(cart._id)
            .populate("items.product");

        res.status(200).json({
            success: true,
            data: updatedCart
        });

    } catch (error) {
        next(error);
    }
};


// Remove a product from the cart
// DELETE /api/cart/:productId
const removeFromCart = async (req, res, next) => {
    try {

        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            res.status(404);
            return next(new Error("Cart not found"));
        }

        const originalLength = cart.items.length;

        // Remove the selected product
        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        // Check if the product was actually in the cart
        if (cart.items.length === originalLength) {
            res.status(404);
            return next(new Error("Product not found in cart"));
        }

        await cart.save();

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        next(error);
    }
};


// Export the controller functions
module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};