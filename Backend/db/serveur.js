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

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/properties', propertyRoutes); // Property management routes
app.use('/api/payments', paymentRoutes); // Payment management routes
app.use('/api/maintenance', maintenanceRoutes); // Maintenance request routes

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Property Management API!');
});

// Error handling for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
