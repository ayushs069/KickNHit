# KickNHit - Sports Equipment E-commerce

A full-stack e-commerce web application for sports equipment built with Node.js, Express, MongoDB, and Handlebars.

## 🚀 Quick Setup

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/KickNHit.git
   cd KickNHit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     NODE_ENV=development
     PORT=3000
     MONGODB_URI=your-mongodb-connection-string
     SESSION_SECRET=your-session-secret-key
     ```

4. **Setup MongoDB Database**
   - Create a MongoDB Atlas cluster or use local MongoDB
   - Update the MONGODB_URI in your .env file

5. **Initialize Database with Demo Data (Optional)**
   ```bash
   # Add demo admin and user accounts
   node insertDemoData.js
   
   # Add sample products
   node addDemoProducts.js
   ```

6. **Run the application**
   ```bash
   npm start
   ```

7. **Access the application**
   - Landing Page: http://localhost:3000
   - User Dashboard: Login required
   - Admin Dashboard: Login required

## 🔑 Demo Credentials

**Admin Login**
- Email: `admin@kicknhit.com`
- Password: `admin123`
- Access: Full admin dashboard with product management

**User Login**
- Email: `user@kicknhit.com`
- Password: `user123`
- Access: User dashboard with shopping features

## 📁 Project Structure

```
KickNHit/
├── controllers/
│   ├── authController.js       # Authentication logic
│   ├── adminController.js      # Admin-specific controllers
│   └── productController.js    # Product management
├── models/
│   ├── Admin.js               # Admin model
│   ├── Product.js             # Product model
│   └── User.js                # User model
├── routes/
│   ├── apiRoutes.js           # API endpoints
│   └── authRoutes.js          # Authentication routes
├── views/
│   ├── landing.hbs            # Landing page
│   ├── admin-login.hbs        # Admin login
│   ├── admin-dashboard.hbs    # Admin dashboard
│   ├── user-login.hbs         # User login
│   ├── user-signup.hbs        # User signup
│   └── user-dashboard.hbs     # User dashboard
├── public/
│   └── css/
│       └── styles.css         # Custom styles
├── app.js                     # Main application file
├── package.json              # Dependencies
└── README.md                 # Documentation
```

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** Handlebars (HBS), Custom CSS
- **Authentication:** bcrypt, express-session
- **Development:** nodemon

## 📋 Development Timeline

### Day 1 ✅
- Set up basic MVC structure
- Created landing, login, and signup pages
- Implemented custom CSS styling
- Basic routing and static file serving

### Day 2 ✅
- Added admin authentication system
- Created admin dashboard with product management
- Implemented product CRUD operations
- Added API endpoints for product management

### Day 3 ✅
- Integrated MongoDB for data persistence
- Created user dashboard with product browsing
- Added shopping cart functionality
- Enhanced landing page with dynamic content
- User authentication and session management

### Day 4 ✅
- Completed leftover work in Admin Dashboard
- Enhanced cart functionality
- Implemented Cricket & Football items list
- Added product carousel on landing page

### Day 5 ✅
- Improved addition of products in admin panel
- Add to cart functionalities checked
- Newly added products stored in mongoDB
- Improved layout

### Day 5 ✅
- Added dynamic product listing for cricket and football gear using MongoDB and Express.js.
- Integrated user authentication using sessions and login/signup form.
- Only logged-in users can add items to cart or checkout.


## 🚀 Quick Start Guide

1. Run `npm install`
2. Create `.env` with your MongoDB URI
3. Run `node insertDemoData.js` (optional - for demo data)
4. Start with `npm start`
5. Visit http://localhost:3000 to see the landing page
6. Use demo credentials to access admin/user dashboards

## 🎯 Future Enhancements

- Payment integration
- Order management system
- Product reviews and ratings
- Advanced search and filtering
- Email notifications

---

Built with ❤️ for sports enthusiasts
