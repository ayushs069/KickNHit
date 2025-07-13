const authService = require('../auth/auth');

/**
 * Authentication Controller
 * Handles all authentication-related requests
 */

// Render landing page
const getLanding = (req, res) => {
    res.render('landing', { title: 'KickNHit - Welcome' });
};

// Render unified login page
const getLogin = (req, res) => {
    let successMessage = null;
    if (req.query.signup === 'success') {
        successMessage = 'Account created successfully! Please sign in with your credentials.';
    }
    res.render('unified-login', { 
        title: 'Login', 
        error: null,
        success: successMessage
    });
};

// Render user signup page
const getUserSignup = (req, res) => {
    res.render('user-signup', { title: 'User Signup', error: null });
};

// Handle unified login
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.authenticate(email, password);

        if (!result.success) {
            return res.render('unified-login', {
                title: 'Login',
                error: result.message,
                success: null
            });
        }

        // Set session
        req.session.user = result.user;

        // Redirect based on role
        if (result.user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/user/dashboard');
        }

    } catch (error) {
        console.error('Login error:', error);
        res.render('unified-login', {
            title: 'Login',
            error: 'Login failed',
            success: null
        });
    }
};

// Handle user signup
const postUserSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = await authService.createUser({ firstName, lastName, email, password });

        if (!result.success) {
            return res.render('user-signup', {
                title: 'User Signup',
                error: result.message
            });
        }

        // Redirect to login page with success message
        res.redirect('/login?signup=success');

    } catch (error) {
        console.error('User signup error:', error);
        res.render('user-signup', {
            title: 'User Signup',
            error: 'Signup failed'
        });
    }
};

// Handle logout
const postLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = {
    getLanding,
    getLogin,
    getUserSignup,
    postLogin,
    postUserSignup,
    postLogout
};
