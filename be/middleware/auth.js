/**
 * Auth Middleware
 * This middleware validates the JWT token provided in the request headers and checks if the user has the required roles.
 * It is dynamic, allowing different roles to be specified for various routes.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to validate authentication and roles.
 * 
 * @param {Array} roles - An array of roles allowed to access the route. Leave empty to allow all authenticated users.
 * 
 * @returns {Function} Middleware function that:
 * - Validates the presence and validity of a JWT token.
 * - Checks if the user's role is authorized for the route (if roles are specified).
 * - Attaches the decoded user information to the `req` object if validation passes.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Callback to pass control to the next middleware or route handler.
 */
const authMiddleware = (roles = []) => (req, res, next) => {
    // Extract the token from the Authorization header (e.g., "Bearer <token>")
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        // If no token is provided, return a 401 Unauthorized response
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user's role is allowed for the route
        if (roles.length && !roles.includes(decoded.role)) {
            // If roles are specified and the user's role is not allowed, return a 403 Forbidden response
            return res.status(403).json({ message: 'Access denied' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired tokens
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware; // Export the middleware for use in route handlers
