const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Admin = require('./models/Admin');
const User = require('./models/User');

// Admins -
const adminData = [
  {
    firstName: "Admin I",
    lastName: "One",
    email: "admin1@kicknhit.com",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    role: "admin",
    createdAt: new Date("2024-01-15T10:30:00.000Z")
  },
  {
    firstName: "Admin II",
    lastName: "Two",
    email: "admin2@kicknhit.com",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    role: "admin",
    createdAt: new Date("2024-01-20T14:15:00.000Z")
  }
];


// Users -
const userData = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date("2024-01-10T08:20:00.000Z")
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    firstName: "Jane",
    lastName: "Smith",
    createdAt: new Date("2024-01-12T16:45:00.000Z")
  },
  {
    username: "mike_wilson",
    email: "mike@example.com",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    firstName: "Mike",
    lastName: "Wilson",
    createdAt: new Date("2024-01-18T11:30:00.000Z")
  }
];

async function insertDemoData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing data (optional - remove if you want to keep existing data)
    await Admin.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert admin data
    const insertedAdmins = await Admin.insertMany(adminData);
    console.log(`Inserted ${insertedAdmins.length} admin records`);

    // Insert user data
    const insertedUsers = await User.insertMany(userData);
    console.log(`Inserted ${insertedUsers.length} user records`);

    console.log('Demo data inserted successfully!');
    console.log('\nLogin Credentials:');
    console.log('Admins:');
    console.log('  - admin1@kicknhit.com / password');
    console.log('  - admin2@kicknhit.com / password');
    console.log('Users:');
    console.log('  - john@example.com / password');
    console.log('  - jane@example.com / password');
    console.log('  - mike@example.com / password');

  } catch (error) {
    console.error('Error inserting demo data:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

insertDemoData();
