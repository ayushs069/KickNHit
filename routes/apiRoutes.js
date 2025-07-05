const express = require('express');
const router = express.Router();
const productController = require('../controllers/admin/productController');

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
};

// Middleware to check if user is admin
const requireAdminAuth = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Admin access required'
        });
    }
};

// Public API routes (for user dashboard)
router.get('/products', productController.getAllProducts);
router.get('/products/category/:category', productController.getProductsByCategory);

// Admin API routes
router.get('/admin/products/:id', requireAdminAuth, productController.getProductById);
router.post('/admin/products', requireAdminAuth, productController.addProduct);
router.put('/admin/products/:id', requireAdminAuth, productController.editProduct);
router.delete('/admin/products/:id', requireAdminAuth, productController.deleteProduct);

module.exports = router;
