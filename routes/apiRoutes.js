const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
} = require('../controllers/productController');

// Middleware to check if admin is logged in
const requireAdmin = (req, res, next) => {
    if (!req.session.admin && !req.session.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
    next();
};

// Public API routes (for frontend)
router.get('/products', getAllProducts);
router.get('/products/category/:category', getProductsByCategory);

// Admin API routes (protected)
router.get('/admin/products/:id', requireAdmin, getProductById);
router.post('/admin/products', requireAdmin, addProduct);
router.put('/admin/products/:id', requireAdmin, updateProduct);
router.delete('/admin/products/:id', requireAdmin, deleteProduct);

module.exports = router;
