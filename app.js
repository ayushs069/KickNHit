const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const hbs = require('hbs');
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
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Routes
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
