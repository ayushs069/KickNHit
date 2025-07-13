const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requireAuth, requireAdminAuth } = require('../middleware/auth');

// Public API routes (for user dashboard)
router.get('/products', productController.getAllProducts);
router.get('/products/category/:category', productController.getProductsByCategory);

// Admin API routes (for admin dashboard)
router.get('/admin/products/:id', requireAdminAuth, productController.getProductById);
router.post('/admin/products', requireAdminAuth, productController.addProduct);
router.put('/admin/products/:id', requireAdminAuth, productController.editProduct);
router.delete('/admin/products/:id', requireAdminAuth, productController.deleteProduct);

module.exports = router;
