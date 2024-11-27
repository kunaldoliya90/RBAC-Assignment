/**
 * Server Setup
 * This script initializes an Express server, sets up routes, middleware, and connects to MongoDB.
 * It includes authentication and role-based validation for admins and moderators.
 */

const express = require('express');
const dotenv = require('dotenv'); // For loading environment variables from a .env file
const mongoose = require('mongoose'); // MongoDB ODM library for database interaction
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const authRoutes = require('./routes/auth.js'); // Routes for user authentication
const adminAuthRoutes = require('./routes/adminAuth.js'); // Routes specific to admin authentication
const adminValidate = require('./middleware/adminValidate.js'); // Middleware for admin role validation
const moderatorValidate = require('./middleware/moderatorValidate.js'); // Middleware for moderator role validation

dotenv.config(); // Load environment variables
const app = express(); // Initialize Express app

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());

/**
 * @route GET /test
 * @description Health check route to verify server functionality
 * @access Public
 */
app.use("/test", (req, res) => {
  return res.status(200).json({
    message: "Server is working fine..."
  });
});

/**
 * Authentication Routes
 * @route /auth
 * @description Routes for user authentication (e.g., login, signup)
 */
app.use("/auth", authRoutes);

/**
 * Admin Routes
 * @route /admin
 * @description Routes requiring admin validation
 * @middleware adminValidate
 * @access Restricted to admins
 */
app.use("/admin", adminValidate, adminAuthRoutes);

/**
 * Moderator Routes
 * @route /moderator
 * @description Routes requiring moderator validation
 * @middleware moderatorValidate
 * @access Restricted to moderators
 */
app.use("/moderator", moderatorValidate, authRoutes);

// Define the port for the server
const PORT = process.env.PORT || 5000;

/**
 * MongoDB Connection
 * Connects to the MongoDB database using the connection string in environment variables.
 * Logs success or error messages based on the connection status.
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));