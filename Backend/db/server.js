const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const paymentRoutes = require('./routes/payments');
const maintenanceRoutes = require('./routes/maintenance');
const dashboardRoutes = require('./routes/dashboard'); // Dashboard routes

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Logging Middleware (Optional: Logs requests to the console for debugging)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/properties', propertyRoutes); // Property management routes
app.use('/api/payments', paymentRoutes); // Payment management routes
app.use('/api/maintenance', maintenanceRoutes); // Maintenance request routes
app.use('/api/dashboard', dashboardRoutes); // Dashboard routes

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Property Management API!');
});

// Error handling for unknown routes
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The route ${req.method} ${req.url} is not defined on this server.`,
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'Something went wrong!',
    });
});

// Graceful Shutdown Handling
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
