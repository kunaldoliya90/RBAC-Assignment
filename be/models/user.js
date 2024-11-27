/**
 * User Model
 * This module defines the User schema and model for MongoDB using Mongoose.
 * It includes fields for username, password, and role, as well as a pre-save hook for password hashing.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * User Schema
 * 
 * @field {String} username - The unique username of the user (required).
 * @field {String} password - The user's hashed password (required).
 * @field {String} role - The role of the user, restricted to 'Admin', 'User', or 'Moderator'. Defaults to 'User'.
 */
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique identifier for the user
    password: { type: String, required: true }, // Hashed password
    role: { type: String, enum: ['Admin', 'User', 'Moderator'], default: 'User' }, // User role with predefined options
});

/**
 * Pre-save Hook
 * 
 * Before saving a user document, this hook hashes the password if it has been modified.
 * Ensures that passwords are stored securely in the database.
 * 
 * @param {Function} next - Callback to proceed to the next middleware or save operation.
 */
UserSchema.pre('save', async function (next) {
    // If the password field is not modified, skip the hashing process
    if (!this.isModified('password')) return next();

    // Hash the password using bcrypt with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);

    next(); // Proceed with the save operation
});

// Export the User model for use in other parts of the application
module.exports = mongoose.model('User', UserSchema);
