const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// POST /login: Authenticate a user
router.post('/login', loginController.authenticateUser);

// POST /register: Register a new user
router.post('/register', loginController.registerUser);

module.exports = router;