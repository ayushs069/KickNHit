const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const { requireAdmin, requireUser, redirectIfAuthenticated } = require('../middleware/auth');

// Landing page
router.get('/', redirectIfAuthenticated, authController.getLanding);

// Authentication routes
router.get('/login', redirectIfAuthenticated, authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/user/signup', redirectIfAuthenticated, authController.getUserSignup);
router.post('/user/signup', authController.postUserSignup);
router.post('/logout', authController.postLogout);

// User routes
router.get('/user/dashboard', requireUser, userController.getUserDashboard);

// Admin routes
router.get('/admin/dashboard', requireAdmin, adminController.getDashboard);
router.get('/admin/profile', requireAdmin, adminController.getProfile);
router.put('/admin/profile', requireAdmin, adminController.updateProfile);
router.post('/admin/change-password', requireAdmin, adminController.changePassword);
router.get('/admin/users', requireAdmin, adminController.getAllUsers);
router.get('/admin/stats', requireAdmin, adminController.getSystemStats);

module.exports = router;
