const Admin = require('../../models/Admin');
const Product = require('../../models/Product');
const User = require('../../models/User');

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

// Get admin dashboard with stats and recent products
const getDashboard = async (req, res) => {
    try {
        // Get dashboard statistics
        const totalProducts = await Product.countDocuments({ isActive: true });
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalAdmins = await Admin.countDocuments();
        
        // Get recent products
        const recentProducts = await Product.find({ isActive: true })
            .sort({ createdAt: -1 })
            .limit(5);

        // Get products by category count
        const productsByCategory = await Product.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.render('admin-dashboard', {
            title: 'Admin Dashboard',
            user: req.session.user,
            stats: {
                totalProducts,
                totalUsers,
                totalAdmins,
                recentProducts,
                productsByCategory
            }
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.render('admin-dashboard', {
            title: 'Admin Dashboard',
            user: req.session.user,
            error: 'Unable to load dashboard data'
        });
    }
};

// Get admin profile
const getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.session.user._id);
        if (!admin) {
            return res.redirect('/login');
        }

        res.render('admin-profile', {
            title: 'Admin Profile',
            user: req.session.user,
            admin: admin
        });
    } catch (error) {
        console.error('Get admin profile error:', error);
        res.redirect('/admin/dashboard');
    }
};

// Update admin profile
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const adminId = req.session.user._id;

        // Validation
        if (!firstName || !lastName || !email) {
            return res.json({
                success: false,
                message: 'First name, last name, and email are required'
            });
        }

        // Check if email is already taken by another admin
        const existingAdmin = await Admin.findOne({ 
            email: email.toLowerCase(),
            _id: { $ne: adminId }
        });

        if (existingAdmin) {
            return res.json({
                success: false,
                message: 'Email is already in use by another admin'
            });
        }

        // Update admin profile
        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            {
                firstName,
                lastName,
                email: email.toLowerCase(),
                phone: phone || ''
            },
            { new: true }
        );

        // Update session data
        req.session.user.firstName = updatedAdmin.firstName;
        req.session.user.lastName = updatedAdmin.lastName;

        res.json({
            success: true,
            message: 'Profile updated successfully',
            admin: {
                firstName: updatedAdmin.firstName,
                lastName: updatedAdmin.lastName,
                email: updatedAdmin.email,
                phone: updatedAdmin.phone
            }
        });
    } catch (error) {
        console.error('Update admin profile error:', error);
        res.json({
            success: false,
            message: 'Failed to update profile'
        });
    }
};

// Change admin password
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const adminId = req.session.user._id;

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.json({
                success: false,
                message: 'All password fields are required'
            });
        }

        if (newPassword !== confirmPassword) {
            return res.json({
                success: false,
                message: 'New passwords do not match'
            });
        }

        if (newPassword.length < 6) {
            return res.json({
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        // Get admin and verify current password
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.json({
                success: false,
                message: 'Admin not found'
            });
        }

        const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            return res.json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password
        admin.password = newPassword;
        await admin.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.json({
            success: false,
            message: 'Failed to change password'
        });
    }
};

// Get all users (for admin to manage)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            users: users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.json({
            success: false,
            message: 'Unable to fetch users'
        });
    }
};

// Get system statistics
const getSystemStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({ isActive: true });
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalAdmins = await Admin.countDocuments();
        const inactiveProducts = await Product.countDocuments({ isActive: false });

        // Get product categories distribution
        const categoryStats = await Product.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Get recent activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentProducts = await Product.countDocuments({
            createdAt: { $gte: thirtyDaysAgo },
            isActive: true
        });

        const recentUsers = await User.countDocuments({
            createdAt: { $gte: thirtyDaysAgo },
            role: 'user'
        });

        res.json({
            success: true,
            stats: {
                totalProducts,
                totalUsers,
                totalAdmins,
                inactiveProducts,
                categoryStats,
                recentActivity: {
                    products: recentProducts,
                    users: recentUsers
                }
            }
        });
    } catch (error) {
        console.error('Get system stats error:', error);
        res.json({
            success: false,
            message: 'Unable to fetch system statistics'
        });
    }
};

module.exports = {
    requireAdmin,
    getDashboard,
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    getSystemStats
};