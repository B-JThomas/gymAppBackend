const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

// Retrieve details for a specific user by userId
router.get('/:userId', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update an existing user’s details
router.put('/:userId', userController.updateUserById);

// Delete a user by userId
router.delete('/:userId', userController.deleteUserById);

// MAYBE
router.get("/username/:username", userController.getUserByUsername)

module.exports = router;


// ======================== ENDPOINTS ========================
/*
1. User Management (related to the user table)
*    GET /users: Retrieve a list of all users.
*    GET /users/:userId: Retrieve details for a specific user by userId.
*    POST /users: Create a new user (requires username, phone number, etc.).
*    PUT /users/:userId: Update an existing user’s details (e.g., username, phone number).
*    DELETE /users/:userId: Delete a user by userId.
2. User Login Management (related to the user_login table)
    POST /login: Authenticate a user (login using email and password).
    POST /register: Register a new user (requires email, password, and links with the user table).
    PUT /login/:userId: Update user login credentials (e.g., change email or password).
    DELETE /login/:userId: Delete a user’s login (this might also delete the corresponding user).
3. User Role Management (related to the user_roles table)
    GET /roles: Retrieve a list of all roles.
    GET /roles/:roleId: Retrieve details for a specific role by role_id.
    POST /roles: Create a new role.
    PUT /roles/:roleId: Update an existing role’s name.
    DELETE /roles/:roleId: Delete a role (be cautious with user role dependencies).
4. User Body Info Management (related to the user_body_info table)
    GET /users/:userId/body-info: Retrieve body measurements for a specific user.
    POST /users/:userId/body-info: Add a new set of body measurements for a user.
    PUT /users/:userId/body-info/:recordId: Update a specific body measurement record.
    DELETE /users/:userId/body-info/:recordId: Delete a specific body measurement record.
5. User Favorite Exercises Management (related to the user_favourite_exercise table)
    GET /users/:userId/favourites: Retrieve a list of favorite exercises for a user.
    POST /users/:userId/favourites: Add an exercise to a user’s favorites (requires exerciseID and favourite status).
    PUT /users/:userId/favourites/:exerciseId: Update the favorite status of a specific exercise for a user.
    DELETE /users/:userId/favourites/:exerciseId: Remove an exercise from a user’s favorites.
6. Additional APIs for Role-Based Access Control
    POST /users/:userId/assign-role/:roleId: Assign a role to a user.
    DELETE /users/:userId/remove-role/:roleId: Remove a role from a user.
7. Authentication APIs
If you're implementing authentication:
    POST /auth/register: User registration endpoint that handles creating both user and login records.
    POST /auth/login: User login endpoint to authenticate users and issue tokens (if you're using JWT or similar).
    POST /auth/logout: Invalidate the user's session or token.
*/