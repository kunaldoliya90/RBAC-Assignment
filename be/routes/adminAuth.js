/**
 * Admin Router
 * This module provides routes for administrative tasks such as fetching all users.
 */

const express = require('express');
const bcrypt = require('bcrypt'); // Used for hashing passwords (not used in this file, but may be part of the admin functionality)
const jwt = require('jsonwebtoken'); // Used for handling JSON Web Tokens (not used in this file, but typically relevant for admin authentication)
const User = require('../models/user'); // User model to interact with the database

const adminRouter = express.Router(); // Create a router for admin-specific routes

/**
 * @route GET /getAllUsers
 * @description Fetch a list of all users, excluding their password field for security reasons.
 * @access Restricted to admin (requires proper authentication middleware, not implemented here).
 */
adminRouter.get('/getAllUsers', async (req, res) => {
    try {
        // Fetch all users from the database, excluding the 'password' field for security
        const users = await User.find({}, '-password'); 

        // Respond with a list of users and a success status code
        res.status(200).json(users);
    } catch (error) {
        // Handle errors, such as database connection issues
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = adminRouter; // Export the admin router for use in other parts of the application
