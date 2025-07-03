const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Landing page
router.get('/', (req, res) => {
    res.render('landing', { 
        title: 'KickNHit - Welcome'
    });
});

// User authentication routes
router.get('/user/login', AuthController.renderLogin);
router.post('/user/login', AuthController.handleLogin);

router.get('/user/signup', AuthController.renderSignup);
router.post('/user/signup', AuthController.handleSignup);

router.get('/user/logout', AuthController.handleLogout);

// Admin routes (placeholder)
router.get('/admin/login', (req, res) => {
    res.render('error', { 
        title: 'Admin Login - Coming Soon',
        error: 'Admin functionality is not available yet. Please check back later.'
    });
});

module.exports = router;
