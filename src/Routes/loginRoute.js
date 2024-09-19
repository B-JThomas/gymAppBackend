const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// POST /login: Authenticate a user
router.post('/login', loginController.authenticateUser);

// POST /register: Register a new user
router.post('/register', loginController.registerUser);

// PUT /login/:userId: Update user login credentials
router.put('/login/:userId', loginController.updateUserLogin);

// DELETE /login/:userId: Delete a user’s login
router.delete('/login/:userId', loginController.deleteUserLogin);

module.exports = router;