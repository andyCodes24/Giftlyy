// Import Mongoose.
// Mongoose allows our application to work with MongoDB
// and create relationships between collections.
const mongoose = require("mongoose");

// Create a schema for ONE product inside an order.
//
// An order can contain multiple products, so each order item
// needs to record the product, quantity and price.
const orderItemSchema = new mongoose.Schema(
    {
        // Stores the ID of the product that was purchased.
        //
        // "ref: Product" tells Mongoose that this ID belongs
        // to a Product document.
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        // Stores how many units of this product were purchased.
        // The quantity must be at least 1.
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"]
        },

        // Stores the price of the product at the time the order
        // was created.
        //
        // This is important because the product's current price
        // could change later. The order should still remember
        // the price that the customer originally paid.
        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"]
        }
    },
    {
        // We do not need a separate ID for each order item.
        _id: false
    }
);

// Create the main Order schema.
//
// This stores information about a customer's completed
// or ongoing purchase.
const orderSchema = new mongoose.Schema(
    {
        // Stores the ID of the user who placed the order.
        //
        // "ref: User" tells Mongoose that this ID belongs
        // to a User document.
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Stores all of the products included in the order.
        //
        // Each item follows the orderItemSchema above.
        // An order must contain at least one item.
        items: {
            type: [orderItemSchema],
            required: true,

            // Prevents an order from being created
            // without any products.
            validate: {
                validator: function (items) {
                    return items.length > 0;
                },
                message: "An order must contain at least one item"
            }
        },

        // Stores the total amount that the customer needs to pay.
        // The value cannot be negative.
        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Total amount cannot be negative"]
        },

        // Stores the current status of the order.
        //
        // New orders automatically start as "pending".
        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled"
            ],
            default: "pending"
        },

        // Stores the address where the customer's order
        // needs to be delivered.
        shippingAddress: {
            type: String,
            required: [true, "Shipping address is required"],
            trim: true
        }
    },
    {
        // Automatically creates createdAt and updatedAt fields.
        timestamps: true
    }
);

// Create the Order model from the schema.
//
// This allows the application to create, find, update
// and manage orders in MongoDB.
module.exports = mongoose.model("Order", orderSchema);