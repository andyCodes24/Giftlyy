// Import Mongoose.
// Mongoose allows our Node.js application to communicate with MongoDB.
const mongoose = require("mongoose");

// Create the Product schema.
// This is the blueprint for every product available on GiftLy.
const productSchema = new mongoose.Schema(
    {
        // The name of the product.
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxlength: [100, "Product name cannot exceed 100 characters"]
        },

        // A description explaining what the customer is buying.
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true
        },

        // The selling price of the product.
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"]
        },

        // The type of product.
        // Examples: Gift Box, Flowers, Chocolates, Cards, Gift Voucher.
        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true
        },

        // The occasions for which this product can be recommended.
        // A product can belong to more than one occasion.
        //
        // Examples:
        // ["Birthday"]
        // ["Birthday", "Anniversary"]
        // ["Valentine's Day", "Anniversary"]
        occasion: {
            type: [String],
            required: [true, "At least one occasion is required"]
        },

        // The items included in the product.
        // This is useful for gift boxes, hampers and gift sets,
        // but can also describe what the customer receives.
        //
        // Example:
        // ["Chocolate Bar", "Birthday Card", "Teddy Bear"]
        contents: {
            type: [String],
            required: [true, "Product contents are required"]
        },

        // The location or URL of the product image.
        image: {
            type: String,
            trim: true
        },

        // The number of units currently available.
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock cannot be negative"],
            default: 0
        },

        // Determines whether the product is currently available
        // to customers.
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        // Automatically creates createdAt and updatedAt fields.
        timestamps: true
    }
);

// Create the Product model from the schema.
module.exports = mongoose.model("Product", productSchema);