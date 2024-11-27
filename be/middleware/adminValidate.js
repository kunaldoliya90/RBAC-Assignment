/**
 * Admin Validation Middleware
 * This middleware validates the JWT token provided in the request headers
 * to ensure that the requester has admin privileges.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to validate admin access.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Callback to pass control to the next middleware or route handler.
 * 
 * @description Checks for a valid JWT token in the Authorization header. 
 * Verifies if the token is valid and the user has the 'Admin' role.
 * If valid, adds the decoded user information to the `req` object and proceeds to the next middleware.
 * If invalid, sends a 401 (Unauthorized) or 403 (Forbidden) response.
 */
const adminValidate = (req, res, next) => {
    // Extract the token from the Authorization header (e.g., "Bearer <token>")
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        // If no token is provided, return a 401 Unauthorized response
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user's role is 'Admin'
        if (decoded.role !== 'Admin') {
            // If the user is not an admin, return a 403 Forbidden response
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired tokens
        res.status(401).json({ message: 'Invalid token from adminValidate' });
    }
};

module.exports = adminValidate; // Export the middleware for use in other parts of the application
