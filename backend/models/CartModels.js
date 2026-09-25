// Import Mongoose.
// Mongoose allows us to create relationships between MongoDB collections.
const mongoose = require("mongoose");

// Create a schema for one item inside a shopping cart.
const cartItemSchema = new mongoose.Schema(
    {
        // Stores the ID of the product being added to the cart.
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        // Stores how many of this product the customer wants.
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],
            default: 1
        }
    },
    {
        // We do not need a separate ID for each cart item.
        _id: false
    }
);

// Create the main Cart schema.
const cartSchema = new mongoose.Schema(
    {
        // Stores the ID of the user who owns this cart.
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        // Stores all products currently inside the cart.
        items: {
            type: [cartItemSchema],
            default: []
        }
    },
    {
        // Automatically creates createdAt and updatedAt fields.
        timestamps: true
    }
);

// Create the Cart model.
module.exports = mongoose.model("Cart", cartSchema);