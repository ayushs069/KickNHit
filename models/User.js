const bcrypt = require('bcryptjs');

// In-memory storage for Day 1 (replace with database later)
let users = [
    {
        id: 1,
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'user'
    }
];

class User {
    constructor(firstName, lastName, email, password, role = 'user') {
        this.id = users.length + 1;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Save user to memory
    save() {
        users.push(this);
        return this;
    }

    // Find user by email
    static findByEmail(email) {
        return users.find(user => user.email === email);
    }

    // Find user by name (firstName + lastName)
    static findByName(firstName, lastName) {
        return users.find(user => user.firstName === firstName && user.lastName === lastName);
    }

    // Find user by ID
    static findById(id) {
        return users.find(user => user.id === parseInt(id));
    }

    // Get all users
    static getAll() {
        return users;
    }

    // Validate password
    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Hash password
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    // Check if email already exists
    static emailExists(email) {
        return users.some(user => user.email === email);
    }
}

module.exports = User;
