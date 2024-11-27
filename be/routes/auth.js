/**
 * Authentication Routes
 * This module handles user registration, login, and logout functionality.
 * It uses bcrypt for password hashing and jwt for token-based authentication.
 */

const express = require('express');
const bcrypt = require('bcrypt'); // For hashing and verifying passwords
const jwt = require('jsonwebtoken'); // For generating and verifying JWT tokens
const User = require('../models/user'); // Mongoose User model

const router = express.Router();

/**
 * @route POST /register
 * @description Registers a new user by saving their details in the database with a hashed password.
 * @access Public
 * 
 * @param {Object} req.body - Contains `username`, `password`, and `role`.
 * @returns {Object} Success message or error details.
 */
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Create a new user instance with the provided details
        const user = new User({ username, password, role });

        // Save the user to the database
        await user.save();

        // Return a success response
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Return an error response in case of validation or database errors
        return res.status(400).json({ error: error.message });
    }
});

/**
 * @route POST /login
 * @description Authenticates a user and returns a JWT token if the credentials are valid.
 * @access Public
 * 
 * @param {Object} req.body - Contains `username` and `password`.
 * @returns {Object} JWT token and user role or error details.
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            // Return an error if the user is not found or the password does not match
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token containing the user ID and role
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        // Return the token and user role
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        // Return a server error response
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route DELETE /logout
 * @description Logs the user out by destroying their session (if session management is used).
 * @access Public
 * 
 * @returns {String} Success or error message.
 */
router.delete('/logout', (req, res) => {
    if (req.session) {
        // Destroy the session if it exists
        req.session.destroy(err => {
            if (err) {
                // Return an error if the session cannot be destroyed
                res.status(400).send('Unable to log out');
            } else {
                // Return a success message
                res.send('Logout successful');
            }
        });
    } else {
        // Return an error if no active session is found
        res.status(400).send('No active session');
    }
});

module.exports = router; // Export the router for use in other parts of the application
