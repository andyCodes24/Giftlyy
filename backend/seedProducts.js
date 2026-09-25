// Seed Products
// ------------------------------------------------------
// This script takes the hardcoded GiftLy product catalogue
// from data/products.js and stores those products in MongoDB.
//
// This allows us to keep our products defined in code while
// still using MongoDB through the existing REST API.
//
// IMPORTANT:
// Running this script will remove the existing products from
// the Product collection and replace them with our new catalogue.

// Load environment variables from the .env file.
require("dotenv").config();

// Import Mongoose.
// Mongoose allows this script to connect to MongoDB.
const mongoose = require("mongoose");

// Import the GiftLy product catalogue.
const products = require("./data/products");

// Import the Product model.
// This tells MongoDB what structure each product should have.
const Product = require("./models/ProductModels");

// Import the same database connection function
// used by the main GiftLy application.
const connectDB = require("./config/dbConnect");

// Create a function to seed the products.
const seedProducts = async () => {
    try {
        // Connect to MongoDB.
        await connectDB();

        // Delete the old products.
        // This ensures our database contains only the new
        // hardcoded GiftLy catalogue.
        await Product.deleteMany();

        // Insert all products from data/products.js.
        const insertedProducts = await Product.insertMany(products);

        // Display how many products were added.
        console.log(
            `${insertedProducts.length} GiftLy products added successfully.`
        );

        // Close the MongoDB connection after the script finishes.
        await mongoose.connection.close();

        // End the script successfully.
        process.exit(0);

    } catch (error) {

        // Display the error if something goes wrong.
        console.error("Error seeding products:", error);

        // Close the MongoDB connection.
        await mongoose.connection.close();

        // End the script with an error code.
        process.exit(1);
    }
};

// Run the seed function.
seedProducts();