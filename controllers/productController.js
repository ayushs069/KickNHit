const Product = require('../models/Product');

// Get all products (API endpoint)
const getAllProducts = async (req, res) => {
    try {
        const products = Product.getActive();
        
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
        const products = Product.getByCategory(category);
        
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

// Get single product by ID (API endpoint)
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = Product.getById(id);
        
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

        const product = new Product(
            name.trim(),
            description.trim(),
            parseFloat(price),
            category,
            image.trim(),
            req.session.user.id
        );

        product.save();

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

// Update product (API endpoint)
const updateProduct = async (req, res) => {
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

        const updates = {
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category,
            image: image.trim()
        };

        const product = Product.updateById(id, updates);

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
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to update product'
        });
    }
};

// Delete product (API endpoint)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = Product.deleteById(id);

        if (!deleted) {
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

// Search products (API endpoint)
const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const products = Product.search(q);

        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to search products'
        });
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};
