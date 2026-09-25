// Import Mongoose.
// Mongoose allows our Node.js application to work with MongoDB.
const mongoose = require("mongoose");

// Creates the User schema.
// A schema is a blueprint that describes what information
// each user should have in the database.
const userSchema = new mongoose.Schema(
    {
        // The username chosen by the user.
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [30, "Username cannot exceed 30 characters"]
        },

        // The user's email address.
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address"
            ]
        },

        // The user's password.
        // The authentication controller should hash the password
        // before it is stored in the database.
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false
        },

        // Determines whether the user is a normal customer or admin.
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        // Automatically creates createdAt and updatedAt fields.
        timestamps: true
    }
);

// Create the User model.
module.exports = mongoose.model("User", userSchema);