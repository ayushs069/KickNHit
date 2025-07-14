const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Database connection error:', err));

// View engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register partials directory
hbs.registerPartials(path.join(__dirname, 'views', 'partials'), function (err) {
    if (err) {
        console.error('Error registering partials:', err);
    } else {
        console.log('Partials registered successfully');
    }
});

// Manually register partials to ensure they're loaded
const partialsDir = path.join(__dirname, 'views', 'partials');
const partialFiles = fs.readdirSync(partialsDir);
partialFiles.forEach(file => {
    if (file.endsWith('.hbs')) {
        const partialName = file.replace('.hbs', '');
        const partialContent = fs.readFileSync(path.join(partialsDir, file), 'utf8');
        hbs.registerPartial(partialName, partialContent);
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false, // Set to true only in production with HTTPS
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'lax' // Prevent CSRF while allowing normal navigation
    }
}));

// Session debugging middleware (remove in production)
app.use((req, res, next) => {
    console.log('Session info:', {
        sessionID: req.sessionID,
        hasUser: !!req.session.user,
        userRole: req.session.user ? req.session.user.role : null,
        url: req.url
    });
    next();
});

// Routes for authentication and API
app.use('/', authRoutes);
app.use('/api', apiRoutes);

// 404 handler 
app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h1>Server Error</h1>');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
