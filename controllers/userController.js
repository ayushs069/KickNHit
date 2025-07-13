/**
 * User Controller
 * Handles user dashboard and user-specific requests
 */

// Get user dashboard
const getUserDashboard = (req, res) => {
    res.render('user-dashboard', { 
        title: 'User Dashboard',
        user: req.session.user 
    });
};

module.exports = {
    getUserDashboard
};
