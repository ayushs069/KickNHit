/**
 * Authentication middleware functions
 */

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
const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

// Middleware to check if user is admin for API routes
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

// Middleware to check if user is regular user
const requireUser = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'user') {
        return res.redirect('/login');
    }
    next();
};

// Middleware to redirect authenticated users
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else {
            return res.redirect('/user/dashboard');
        }
    }
    next();
};

module.exports = {
    requireAuth,
    requireAdmin,
    requireAdminAuth,
    requireUser,
    redirectIfAuthenticated
};
