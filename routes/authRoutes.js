const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const adminController = require('../controllers/admin/adminController');

// Landing page
router.get('/', (req, res) => {
    // If user is already logged in, redirect to their dashboard
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else {
            return res.redirect('/user/dashboard');
        }
    }
    res.render('landing', { title: 'KickNHit - Welcome' });
});

// Unified login page render
router.get('/login', (req, res) => {
    let successMessage = null;
    if (req.query.signup === 'success') {
        successMessage = 'Account created successfully! Please sign in with your credentials.';
    }
    res.render('unified-login', { 
        title: 'Login', 
        error: null,
        success: successMessage
    });
});

// User signup page
router.get('/user/signup', (req, res) => {
    res.render('user-signup', { title: 'User Signup', error: null });
});

// Unified login process
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailLower = email.toLowerCase();

        // First, try to find in User collection
        let user = await User.findOne({ email: emailLower });
        let isAdmin = false;

        // If not found in User collection, try Admin collection
        if (!user) {
            user = await Admin.findOne({ email: emailLower });
            isAdmin = true;
        }

        if (!user) {
            return res.render('unified-login', {
                title: 'Login',
                error: 'Invalid email or password'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('unified-login', {
                title: 'Login',
                error: 'Invalid email or password'
            });
        }

        // Set session based on user role
        req.session.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            // Include admin permissions if user is admin
            ...(user.role === 'admin' && { permissions: user.permissions })
        };

        // Redirect based on role
        if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/user/dashboard');
        }

    } catch (error) {
        console.error('Login error:', error);
        res.render('unified-login', {
            title: 'Login',
            error: 'Login failed. Please try again.'
        });
    }
});

// Legacy POST routes for backward compatibility (redirect to unified login)
router.post('/admin/login', (req, res) => {
    // Redirect to unified login endpoint
    res.redirect(307, '/login'); // 307 preserves POST method and body
});

router.post('/user/login', (req, res) => {
    // Redirect to unified login endpoint
    res.redirect(307, '/login'); // 307 preserves POST method and body
});

// User signup process
router.post('/user/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.render('user-signup', {
                title: 'User Signup',
                error: 'User already exists'
            });
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            role: 'user'
        });

        await newUser.save();

        // Redirect to unified login page instead of auto-login after signup
        res.redirect('/login?signup=success');

    } catch (error) {
        console.error('User signup error:', error);
        res.render('user-signup', {
            title: 'User Signup',
            error: 'Signup failed'
        });
    }
});

// Admin dashboard
router.get('/admin/dashboard', adminController.requireAdmin, adminController.getDashboard);

// User dashboard
router.get('/user/dashboard', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'user') {
        return res.redirect('/login');
    }
    res.render('user-dashboard', { 
        title: 'User Dashboard',
        user: req.session.user 
    });
});

// Admin profile routes
router.get('/admin/profile', adminController.requireAdmin, adminController.getProfile);
router.put('/admin/profile', adminController.requireAdmin, adminController.updateProfile);
router.post('/admin/change-password', adminController.requireAdmin, adminController.changePassword);

// Admin management routes
router.get('/admin/users', adminController.requireAdmin, adminController.getAllUsers);
router.get('/admin/stats', adminController.requireAdmin, adminController.getSystemStats);

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
