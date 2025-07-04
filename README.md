# KickNHit - Day 2 Setup with Admin Functionality

## Overview
This is Day 2 of the KickNHit sports equipment website. Now includes complete admin functionality for product management along with the Day 1 features (landing page, user login, and signup).

## Features Implemented

### Day 1 Features ✅
- **Landing Page**: Welcome page with hero section, product showcase, and features
- **User Authentication**: Login and signup functionality with form validation
- **Responsive Design**: Mobile-friendly UI with custom CSS
- **Session Management**: Secure session handling for users

### Day 2 Features ✅ NEW
- **Admin Authentication**: Separate admin login system
- **Admin Dashboard**: Complete product management interface
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Product Categories**: Cricket and Football equipment management
- **API Endpoints**: RESTful API for product operations
- **Real-time Updates**: Dynamic product listing with immediate UI updates

## Project Structure
```
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── controllers/
│   ├── authController.js  # User authentication logic
│   ├── adminController.js # ✅ NEW: Admin authentication
│   └── productController.js # ✅ NEW: Product CRUD operations
├── models/
│   ├── User.js           # User model (in-memory storage)
│   ├── Admin.js          # ✅ NEW: Admin model
│   └── Product.js        # ✅ NEW: Product model
├── routes/
│   ├── authRoutes.js     # Authentication routes (user + admin)
│   └── apiRoutes.js      # ✅ NEW: API endpoints for products
├── views/
│   ├── landing.hbs       # Landing page
│   ├── user-login.hbs    # User login page
│   ├── user-signup.hbs   # User signup page
│   └── admin-login.hbs   # ✅ NEW: Admin login page
│   └── admin-dashboard.hbs # ✅ NEW: Admin dashboard
└── public/
    └── css/
        └── styles.css    # Complete styling (from backup)
```

## Technologies Used
- **Backend**: Node.js, Express.js
- **View Engine**: Handlebars (HBS)
- **Authentication**: bcryptjs for password hashing
- **Sessions**: express-session
- **Frontend**: Custom CSS only (no external frameworks)
- **Environment**: dotenv

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   nodemon app.js
   ```
   Or for production:
   ```bash
   npm start
   ```

3. **Access the Application**:
   - **Landing Page**: http://localhost:3001
   - **User Login**: http://localhost:3001/user/login
   - **Admin Login**: http://localhost:3001/admin/login
   - **Admin Dashboard**: http://localhost:3001/admin/dashboard (after admin login)

## Available Routes

### Public Routes
- `/` - Landing page with product showcase
- `/user/login` - User login page
- `/user/signup` - User signup page
- `/user/logout` - Logout user (redirects to home)

### Admin Routes ✅ NEW
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (requires login)
- `/admin/logout` - Logout admin

### API Endpoints ✅ NEW
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `POST /api/admin/products` - Add new product (admin only)
- `GET /api/admin/products/:id` - Get product by ID (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)

## Demo Accounts

### User Account (for testing user features)
- **Email**: demo@example.com
- **Password**: password

### Admin Accounts ✅ NEW
- **Primary Admin**: 
  - Email: admin@kicknhit.com
  - Password: password
  - Role: Super Admin (full permissions)

- **Product Manager**:
  - Email: manager@kicknhit.com
  - Password: password
  - Role: Product Manager (product management only)

## Admin Features ✅ NEW

### Product Management
- **Add Products**: Create new cricket and football equipment
- **Edit Products**: Update product details, prices, descriptions
- **Delete Products**: Remove products from inventory
- **Category Management**: Organize products by Cricket/Football categories
- **Image Support**: Add product images via URL
- **Real-time Updates**: Immediate UI updates after changes

### Admin Dashboard Features
- **Product Overview**: View all products in organized categories
- **Quick Actions**: Edit/Delete buttons on each product
- **Form Validation**: Comprehensive input validation
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Professional UI interactions

### Security Features
- **Admin Authentication**: Separate login system for admins
- **Session Management**: Secure admin sessions
- **Route Protection**: API endpoints protected for admin-only access
- **Permission System**: Different admin roles with varying permissions

## Essential Dependencies
- `express` - Web framework
- `hbs` - Handlebars view engine
- `express-session` - Session handling
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `nodemon` - Development auto-restart (dev dependency)

## Environment Variables
Make sure to set these in your `.env` file:
```
NODE_ENV=development
PORT=3001
SESSION_SECRET=your_super_secret_session_key
```

## Development Workflow

### Day 1 ✅ COMPLETED
- Basic landing page with hero section
- User registration and login system
- Session management
- Custom CSS styling
- Form validation

### Day 2 ✅ COMPLETED
- Admin authentication system
- Complete admin dashboard
- Product CRUD operations
- API endpoints for product management
- Real-time UI updates
- Category-based product organization

### Day 3 🔄 UPCOMING
- User dashboard implementation
- Shopping cart functionality
- Order management system

## Notes
- Uses in-memory storage for users, admins, and products (no database yet)
- All passwords are hashed using bcryptjs
- Session-based authentication for both users and admins
- RESTful API design for product operations
- Mobile-responsive design
- Clean, professional UI matching backup folder design

## What's Included in Day 2
- ✅ Admin login system with dedicated accounts
- ✅ Product management dashboard
- ✅ Add/Edit/Delete product functionality
- ✅ Category-based product organization (Cricket/Football)
- ✅ API endpoints for frontend-backend communication
- ✅ Real-time UI updates without page refresh
- ✅ Professional admin interface with smooth animations
- ✅ Secure route protection for admin-only features

## Quick Start for Testing
1. Run `nodemon app.js`
2. Visit http://localhost:3001
3. Click "Admin" button to access admin login
4. Login with `admin@kicknhit.com` and `password`
5. Test adding, editing, and deleting products in the dashboard

Ready for Day 3 user dashboard implementation! 🚀


