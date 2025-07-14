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
     PORT=3002
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
   - Landing Page: http://localhost:3002
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
├── auth/                          # Authentication logic
│   └── auth.js                   # Authentication service
├── controllers/                   # Business logic controllers
│   ├── authController.js         # Authentication controller
│   ├── adminController.js        # Admin controller
│   ├── productController.js      # Product controller
│   └── userController.js         # User controller
├── middleware/                    # Custom middleware
│   └── auth.js                   # Authentication middleware
├── models/                        # Database models
│   ├── Admin.js                  # Admin model
│   ├── Product.js                # Product model
│   └── User.js                   # User model
├── routes/                        # Route definitions
│   ├── authRoutes.js             # Authentication routes
│   └── apiRoutes.js              # API routes
├── views/                         # Template files
│   ├── landing.hbs               # Landing page
│   ├── unified-login.hbs         # Unified login for users and admins
│   ├── admin-dashboard.hbs       # Admin dashboard
│   ├── user-signup.hbs           # User signup
│   └── user-dashboard.hbs        # User dashboard
├── public/                        # Static assets
│   └── css/
│       └── styles.css            # Custom styles
├── app.js                         # Main application file
├── addDemoProducts.js            # Demo products script
├── insertDemoData.js             # Demo data script
├── package.json                  # Dependencies
└── README.md                     # Documentation
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

### Day 6 ✅
- Added dynamic product listing for cricket and football gear using MongoDB and Express.js.
- Integrated user authentication using sessions and login/signup form.
- Only logged-in users can add items to cart or checkout.

### Day 7 ✅
- Improved overall UI consistency and responsiveness across all pages (landing, login, dashboards)
- Updated navbar and footer with better layout,
- links, and dynamic rendering based on user/admin login status.

### Day 8 ✅
- Added error handling for invalid routes and database connection issues with custom error pages.
- Optimized image sizes and assets for faster page loading.

### Day 9 ✅
- Added a search bar in the user dashboard to search for products; clicking a product redirects the user to its details in the dashboard.
- Implemented a unified login for both Users and Admins, removing the need for separate login pages.
- Enhanced the styling of the SignUp and Login pages for a better user interface.

### Day 10 ✅
- Completed UI finishing across all pages.
- Verified all major features (auth, cart, dashboards, product CRUD) are functional and bug-free.
- Conducted final testing for both admin and user flows.

### Day 11 ✅
- Fixed validation and session errors during login/signup for both users and admins.
- Restructured folder organization for better modularity and scalability.
- Cleaned and optimized backend logic for authentication and route handling.

### Day 12 ✅
- Refactored codebase for modularity with Handlebars partials (navbar, footer, stats, cart, featured products, sale products, product categories).
- Extracted all reusable sections into partials to eliminate code duplication.
- Fixed dimension inconsistencies between user and admin dashboards for featured and sale product sections.

## 🚀 Quick Start Guide

1. Run `npm install`
2. Create `.env` with your MongoDB URI
3. Run `node insertDemoData.js` (optional - for demo data)
4. Start with `npm start`
5. Visit http://localhost:3002 to see the landing page
6. Use demo credentials to access admin/user dashboards

## 🎯 Future Enhancements

- Payment integration
- Order management system
- Product reviews and ratings
- Advanced search and filtering
- Email notifications

---

Built with ❤️ for sports enthusiasts
