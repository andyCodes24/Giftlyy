// Product Controller
// This handles the business logic for product-related operations, including CRUD operations and data validation.

const Product = require ('../models/ProductModels');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const { search, category } = req.query;
        
        const filter = {};
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: products.length,
            data: products      
        }); 
    } catch(error) {
        next(error);
    }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            return next(new Error('Product not found'));
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        if (!name || price === undefined || stock === undefined) {
            res.status(400);
            return res.json({ message: 'Name, price, and stock are required fields' });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock
        });

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);    
    };           
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
        res.status(404);
        return next(new Error('Product not found'));
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        next(error);
    }

};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
    try {const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            return next(new Error('Product not found'));
        }

        await product.deleteOne();

        res.status(200).json({ 
            success: true,
            message: 'Product deleted successfully' 
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};