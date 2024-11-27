/**
 * Moderator Validation Middleware
 * This middleware validates the JWT token provided in the request headers
 * to ensure that the requester has moderator privileges.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to validate moderator access.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Callback to pass control to the next middleware or route handler.
 * 
 * @description Checks for a valid JWT token in the Authorization header. 
 * Verifies if the token is valid and if the user has the 'Moderator' role.
 * If valid, adds the decoded user information to the `req` object and proceeds to the next middleware.
 * If invalid, sends a 401 (Unauthorized) or 403 (Forbidden) response.
 */
const moderatorValidate = (req, res, next) => {
    // Extract the token from the Authorization header (e.g., "Bearer <token>")
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        // If no token is provided, return a 401 Unauthorized response
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user's role is 'Moderator'
        if (decoded.role !== 'Moderator') {
            // If the user is not a moderator, return a 403 Forbidden response
            return res.status(403).json({ message: 'Access denied: Moderators only' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired tokens
        res.status(401).json({ message: 'Invalid token from moderatorValidate' });
    }
};

module.exports = moderatorValidate; // Export the middleware for use in other parts of the application
