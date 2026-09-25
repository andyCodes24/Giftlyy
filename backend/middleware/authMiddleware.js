const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

// Protect routes - user must be logged in
const protect = async (req, res, next) => {
    try {
        let token;

        // Check Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            res.status(401);
            return next(new Error("Not authorized, no token provided"));
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user from token
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401);
            return next(new Error("User not found"));
        }

        // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        res.status(401);
        next(new Error("Not authorized, invalid token"));
    }
};


// Admin-only routes
const adminOnly = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return next(new Error("Not authorized"));
    }

    if (req.user.role !== "admin") {
        res.status(403);
        return next(new Error("Admin access required"));
    }

    next();
};


module.exports = {
    protect,
    adminOnly
};