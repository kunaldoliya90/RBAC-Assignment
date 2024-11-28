# Role-Based Access Control (RBAC) System

This project demonstrates a secure system implementing **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)**. Users can register, log in, and access specific resources based on their assigned roles (Admin, User, or Moderator).

---

## Features

### 1. Authentication
- User registration with password hashing using bcrypt.
- User login with JWT-based token generation.
- Secure logout functionality.

### 2. Authorization
- Protected routes accessible only to authenticated users.
- Role-based route protection using a flexible RBAC middleware.

### 3. Role-Based Access Control (RBAC)
- Access control enforced by user roles:
  - **Admin**: Full access to all resources.
  - **Moderator**: Restricted access to moderate content.
  - **User**: Basic access to general resources.

---

## Technologies Used

- **Node.js** and **Express.js**: Backend server and routing.
- **MongoDB**: Database for user management.
- **Mongoose**: ODM library for MongoDB.
- **bcrypt**: Password hashing for secure authentication.
- **jsonwebtoken (JWT)**: Secure token-based authentication.

---

## System Architecture

### 1. Models
**User Model**  
- **Fields**: `username`, `password`, `role`.  
- Pre-save middleware hashes passwords before storing them in the database.

### 2. Routes
- **Authentication Routes**:
  - `/register`: Register new users.
  - `/login`: Authenticate users and issue JWT tokens.
  - `/logout`: Destroy active user sessions.
- **Protected Routes**:
  - `/admin`: Accessible only to Admins.
  - `/moderator`: Accessible only to Moderators.
  - `/user`: Accessible to all authenticated users.

### 3. Middleware
- **Authentication Middleware**: Verifies the validity of JWT tokens.
- **RBAC Middleware**: Checks the user’s role and grants or denies access to specific routes.

---

## Endpoints

### 1. Register User
- **URL**: `/register`  
- **Method**: POST  
- **Description**: Registers a new user.

**Sample Request**:  

    {
      "username": "john_doe",
      "password": "password123",
      "role": "Admin"
    }


**Sample Response**:

    {
      "message": "User registered successfully"
    }

### 2. Login User
- **URL**: `/login`
- **Method**: POST
- **Description**: Authenticates a user and returns a JWT token.

**Sample Request**:

    {
      "username": "john_doe",
      "password": "password123"
    }

**Sample Response**:

    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "role": "Admin"
    }

### 3. Logout User
- **URL**: `/logout`
- **Method**: DELETE
- **Description**: Logs the user out by destroying their session.

**Sample Response**:

    Logout successful

### 4. Admin Route
- **URL**: `/admin`
- **Method**: GET
- **Description**: Access restricted to Admins.

**Response (Success for Admins)**:

    {
      "message": "Welcome, Admin!"
    }

**Response (Access Denied)**:

    {
      "message": "Access denied"
    }

### 5. Moderator Route
- **URL**: /moderator
- **Method**: GET
- **Description**: Access restricted to Moderators.

**Response (Success for Moderators)**:

    {
      "message": "Welcome, Moderator!"
    }

# API Testing with Postman

This document provides the steps to test user registration, login, and role-based access control using Postman.

## Prerequisites
- Ensure your server is running on `http://localhost:5000`.
- Install [Postman](https://www.postman.com/) on your machine.

---

## 1. Register a User

To register a new user, follow these steps:

### Request Details:
- **Method:** POST
- **URL:** `http://localhost:5000/register`

### Request Body:
```json
{
  "username": "jane_doe",
  "password": "mypassword",
  "role": "User"
}
```
## 2. Log in with the User

To log in and receive an authentication token, follow these steps:

### Request Details:
- **Method:** POST
- **URL:** `http://localhost:5000/login`

### Request Body:
```json
{
  "username": "jane_doe",
  "password": "mypassword"
}
```
Sample Response:
```json
{
  "token": "<your_token_here>"
}
```
Copy the token from the response.

## 3. Access Protected Routes

After logging in and obtaining the token, you can access protected routes based on the role assigned to the user.

### Steps to Access Protected Routes:

1. **Add the token to the Authorization header:**
   - In Postman, go to the **Authorization** tab.
   - Select **Bearer Token** as the authorization type.
   - Paste the token (which you copied from the login response) into the **Token** field.

2. **Access protected routes:**
   Use the following routes to verify role-based access:
   - **Admin Route:** `http://localhost:5000/admin`
   - **Moderator Route:** `http://localhost:5000/moderator`
   - **User Route:** `http://localhost:5000/user`

   The server will validate the token and provide access to the route based on the user’s role.

---

## Troubleshooting

- **401 Unauthorized:** If you encounter this error, check if the token is correctly added to the **Authorization** header.
- **403 Forbidden:** If this error occurs, ensure that the user’s role matches the route being accessed.


# Security Practices

1. **Password Hashing:**
   - User passwords are hashed using [bcrypt](https://www.npmjs.com/package/bcrypt) before being saved in the database to ensure they are stored securely.

2. **Token Validation:**
   - [JWT](https://jwt.io/) (JSON Web Tokens) is used to securely verify user identity for each request. Tokens are included in the Authorization header of each request to confirm the user’s authenticity.

3. **Role Validation:**
   - Middleware enforces [Role-Based Access Control](https://en.wikipedia.org/wiki/Role-based_access_control) (RBAC) to restrict access to specific routes based on user roles (Admin, Moderator, User).

---

# Code Structure

The project is organized into the following structure:

    .
    ├── routes
    │   ├── auth.js           # Authentication routes
    │   └── adminAuth.js      # Protected routes for Admin, Moderator, User
    ├── middleware
    │   ├── auth.js # JWT validation middleware
    │   └── adminValidate.js # Role-based access control middleware
    |   └── moderatorValidate.js # Role-based access control middleware
    ├── models
    │   └── user.js           # User schema and model
    ├── index.js             # Main server file
    └── package.json          # Node.js dependencies
