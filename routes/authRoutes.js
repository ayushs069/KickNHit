const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const {
    renderAdminLogin,
    handleAdminLogin,
    getDashboard,
    handleAdminLogout
} = require('../controllers/adminController');

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

// Admin authentication routes
router.get('/admin/login', renderAdminLogin);
router.post('/admin/login', handleAdminLogin);

router.get('/admin/dashboard', getDashboard);
router.get('/admin/logout', handleAdminLogout);

// Logout route (works for both users and admins)
router.get('/logout', (req, res) => {
    if (req.session.admin) {
        return handleAdminLogout(req, res);
    } else if (req.session.user) {
        return AuthController.handleLogout(req, res);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
