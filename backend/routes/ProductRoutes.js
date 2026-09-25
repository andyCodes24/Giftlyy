// Product API and CRUD routes
const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct   
     } = productController;

// Middleware to validate product data
const { protect, adminOnly } = require('../middleware/authMiddleware');

// GET all products
router.get('/', getProducts);
router.get('/:id', getProductById);

//Protect routes - JWT auth, then admin only authorization
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);


module.exports = router;