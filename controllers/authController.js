const User = require('../models/User');

class AuthController {
    // Render login page
    static renderLogin(req, res) {
        res.render('user-login', { 
            title: 'Login - KickNHit',
            error: req.session.error,
            success: req.session.success 
        });
        // Clear messages after rendering
        delete req.session.error;
        delete req.session.success;
    }

    // Handle login
    static async handleLogin(req, res) {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                req.session.error = 'Please fill in all fields';
                return res.redirect('/user/login');
            }

            // Find user
            const user = User.findByEmail(email);
            if (!user) {
                req.session.error = 'Invalid email or password';
                return res.redirect('/user/login');
            }

            // Validate password
            const isValidPassword = await User.validatePassword(password, user.password);
            if (!isValidPassword) {
                req.session.error = 'Invalid email or password';
                return res.redirect('/user/login');
            }

            // Set session
            req.session.user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            };

            req.session.success = 'Login successful!';
            res.redirect('/');
        } catch (error) {
            console.error('Login error:', error);
            req.session.error = 'An error occurred during login';
            res.redirect('/user/login');
        }
    }

    // Render signup page
    static renderSignup(req, res) {
        res.render('user-signup', { 
            title: 'Sign Up - KickNHit',
            error: req.session.error,
            success: req.session.success 
        });
        // Clear messages after rendering
        delete req.session.error;
        delete req.session.success;
    }

    // Handle signup
    static async handleSignup(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;

            // Validation
            if (!firstName || !lastName || !email || !password) {
                req.session.error = 'Please fill in all fields';
                return res.redirect('/user/signup');
            }

            if (password.length < 6) {
                req.session.error = 'Password must be at least 6 characters long';
                return res.redirect('/user/signup');
            }

            // Check if user already exists
            if (User.emailExists(email)) {
                req.session.error = 'Email already exists';
                return res.redirect('/user/signup');
            }

            // Hash password
            const hashedPassword = await User.hashPassword(password);

            // Create new user
            const newUser = new User(firstName, lastName, email, hashedPassword);
            newUser.save();

            req.session.success = 'Account created successfully! Please login.';
            res.redirect('/user/login');
        } catch (error) {
            console.error('Signup error:', error);
            req.session.error = 'An error occurred during signup';
            res.redirect('/user/signup');
        }
    }

    // Handle logout
    static handleLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
            }
            res.redirect('/');
        });
    }
}

module.exports = AuthController;
