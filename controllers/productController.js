const Product = require('../models/Product');

/**
 * Product Controller
 * Handles all product-related business logic
 */

// Get all products (API endpoint)
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch products'
        });
    }
};

// Get products by category (API endpoint)
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ 
            category: category, 
            isActive: true 
        }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error('Get products by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch products'
        });
    }
};

// Add new product (API endpoint)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;
        
        // Validation
        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (!['cricket', 'football'].includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category'
            });
        }

        const product = new Product({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category,
            image: image.trim(),
            createdBy: req.session.user.id
        });

        await product.save();

        res.json({
            success: true,
            message: 'Product added successfully',
            product: product
        });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to add product'
        });
    }
};

// Delete product (API endpoint)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to delete product'
        });
    }
};

// Get product by ID (API endpoint)
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch product'
        });
    }
};

// Edit product (API endpoint)
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, image } = req.body;
        
        // Validation
        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (!['cricket', 'football'].includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category'
            });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                description: description.trim(),
                price: parseFloat(price),
                category,
                image: image.trim()
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            product: product
        });
    } catch (error) {
        console.error('Edit product error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to update product'
        });
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    addProduct,
    deleteProduct,
    getProductById,
    editProduct
};
