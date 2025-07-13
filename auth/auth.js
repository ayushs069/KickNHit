const User = require('../models/User');
const Admin = require('../models/Admin');

/**
 * Authentication service for handling user/admin login
 */
const authService = {
    /**
     * Authenticate user or admin with email and password
     * @param {string} email - User/Admin email
     * @param {string} password - Password
     * @returns {Object} - Authentication result with user/admin data
     */
    async authenticate(email, password) {
        try {
            const emailLower = email.toLowerCase();
            let user = null;
            let isAdmin = false;

            // First, try to find in User collection
            user = await User.findOne({ email: emailLower });

            // If not found in User collection, try Admin collection
            if (!user) {
                user = await Admin.findOne({ email: emailLower });
                if (user) {
                    isAdmin = true;
                }
            }

            if (!user) {
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            }

            // Check password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            }

            // Return user data without password
            const userData = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: isAdmin ? 'admin' : 'user'
            };

            return {
                success: true,
                user: userData,
                message: 'Authentication successful'
            };

        } catch (error) {
            console.error('Authentication error:', error);
            return {
                success: false,
                message: 'Authentication failed'
            };
        }
    },

    /**
     * Create new user account
     * @param {Object} userData - User registration data
     * @returns {Object} - Registration result
     */
    async createUser(userData) {
        try {
            const { firstName, lastName, email, password } = userData;

            // Check if user exists
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return {
                    success: false,
                    message: 'User already exists'
                };
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

            return {
                success: true,
                message: 'User created successfully'
            };

        } catch (error) {
            console.error('User creation error:', error);
            return {
                success: false,
                message: 'User creation failed'
            };
        }
    }
};

module.exports = authService;
