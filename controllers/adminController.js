const Admin = require('../models/Admin');
const Product = require('../models/Product');
const User = require('../models/User');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/admin/login');
    }
    next();
};

// Render admin login page
const renderAdminLogin = (req, res) => {
    res.render('admin-login', { 
        title: 'Admin Login - KickNHit',
        error: req.session.error
    });
    // Clear error after rendering
    delete req.session.error;
};

// Handle admin login
const handleAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            req.session.error = 'Please fill in all fields';
            return res.redirect('/admin/login');
        }

        // Find admin
        const admin = Admin.findByEmail(email);
        if (!admin) {
            req.session.error = 'Invalid email or password';
            return res.redirect('/admin/login');
        }

        // Validate password
        const isValidPassword = await Admin.validatePassword(password, admin.password);
        if (!isValidPassword) {
            req.session.error = 'Invalid email or password';
            return res.redirect('/admin/login');
        }

        // Set session
        req.session.user = {
            id: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions
        };

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Admin login error:', error);
        req.session.error = 'An error occurred during login';
        res.redirect('/admin/login');
    }
};

// Get admin dashboard with stats
const getDashboard = async (req, res) => {
    try {
        // Get dashboard statistics
        const totalProducts = Product.getAll().length;
        const activeProducts = Product.getActive().length;
        const totalUsers = User.getAll().length;
        const totalAdmins = Admin.getAll().length;
        
        // Get recent products
        const recentProducts = Product.getAll()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        // Get products by category count
        const cricketProducts = Product.getByCategory('cricket').length;
        const footballProducts = Product.getByCategory('football').length;

        res.render('admin-dashboard', {
            title: 'Admin Dashboard - KickNHit',
            user: req.session.user,
            stats: {
                totalProducts,
                activeProducts,
                totalUsers,
                totalAdmins,
                cricketProducts,
                footballProducts,
                recentProducts
            }
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.render('admin-dashboard', {
            title: 'Admin Dashboard - KickNHit',
            user: req.session.user,
            error: 'Unable to load dashboard data'
        });
    }
};

// Handle admin logout
const handleAdminLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Admin logout error:', err);
        }
        res.redirect('/admin/login');
    });
};

module.exports = {
    requireAdmin,
    renderAdminLogin,
    handleAdminLogin,
    getDashboard,
    handleAdminLogout
};
