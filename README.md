# KickNHit - Day 1 Minimal Setup

## Overview
This is the minimal Day 1 setup for the KickNHit sports equipment website. It includes only the essential code for landing page, login, and signup functionality.

## Features Implemented
- **Landing Page**: Simple welcome page with hero section and features
- **User Authentication**: Basic login and signup functionality
- **Responsive Design**: Mobile-friendly UI with custom CSS
- **Error Handling**: Basic error pages

## Project Structure
```
├── app.js                 # Main application file (minimal)
├── package.json           # Essential dependencies only
├── .env                   # Environment variables
├── controllers/
│   └── authController.js  # Authentication logic only
├── models/
│   └── User.js           # User model (in-memory storage)
├── routes/
│   └── authRoutes.js     # Authentication routes only
├── views/
│   ├── landing.hbs       # Landing page
│   ├── user-login.hbs    # Login page
│   ├── user-signup.hbs   # Signup page
│   └── error.hbs         # Error page
└── public/
    └── css/
        └── styles.css    # Minimal custom styles
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

2. **Start the Server**:
   ```bash
   npm start
   ```

3. **Access the Application**:
   - Open your browser and go to `http://localhost:3001`

## Available Routes

### Public Routes
- `/` - Landing page
- `/user/login` - User login page
- `/user/signup` - User signup page
- `/user/logout` - Logout user (redirects to home)
- `/admin/login` - Admin login placeholder (shows coming soon message)

## Demo Account
For testing purposes, a demo account is available:
- **Email**: demo@example.com
- **Password**: password

## Essential Dependencies
- `express` - Web framework
- `hbs` - Handlebars view engine
- `express-session` - Session handling
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables

## Environment Variables
Make sure to set these in your `.env` file:
```
NODE_ENV=development
PORT=3001
SESSION_SECRET=your_super_secret_session_key
```

## Notes
- Uses in-memory storage for users (no database)
- Minimal code - only essential functionality
- No external CSS frameworks
- Basic error handling
- After login, users are redirected to landing page
- Clean, lightweight implementation

## What's NOT Included (for future days)
- Dashboard functionality
- Product catalog
- Shopping cart
- Admin panel
- Database integration
- API endpoints
- Complex user management


