const bcrypt = require('bcryptjs');

// In-memory storage for Day 2 (replace with database later)
let admins = [
    {
        id: 1,
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@kicknhit.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'admin',
        permissions: ['manage_users', 'manage_products', 'manage_orders', 'view_analytics']
    },
    {
        id: 2,
        firstName: 'Product',
        lastName: 'Manager',
        email: 'manager@kicknhit.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'admin',
        permissions: ['manage_products']
    }
];

class Admin {
    constructor(firstName, lastName, email, password, role = 'admin', permissions = ['manage_products']) {
        this.id = admins.length + 1;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.permissions = permissions;
    }

    // Save admin to memory
    save() {
        admins.push(this);
        return this;
    }

    // Find admin by email
    static findByEmail(email) {
        return admins.find(admin => admin.email === email);
    }

    // Find admin by ID
    static findById(id) {
        return admins.find(admin => admin.id === parseInt(id));
    }

    // Get all admins
    static getAll() {
        return admins;
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
        return admins.some(admin => admin.email === email);
    }

    // Check if admin has permission
    static hasPermission(admin, permission) {
        return admin.permissions.includes(permission);
    }
}

module.exports = Admin;
