const userModel = require('../models/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

// POST /login: Authenticate a user
async function authenticateUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUsersByEmail(email);
        if (!user || !await bcrypt.compare(password, user.passwordHash)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a token if you are using JWT
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Error authenticating user' });
    }
}

// POST /register: Register a new user
async function registerUser(req, res) {
    const { email, password, username, phoneNumber } = req.body;

    try {
        //Force User Role to base
        let role_id = 2;
        const userResult = await userModel.createUser({ email, password, username, phoneNumber, role_id });

        res.status(201).json({ user: userResult });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

// PUT /login/:userId: Update user login credentials
async function updateUserLogin(req, res) {
    const userId = req.params.userId;
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.updateUser(userId, email, hashedPassword);
        res.status(200).json({ message: 'User login credentials updated' });
    } catch (error) {
        console.error('Error updating user login:', error);
        res.status(500).json({ message: 'Error updating user login' });
    }
}

// DELETE /login/:userId: Delete a user’s login
async function deleteUserLogin(req, res) {
    const userId = req.params.userId;

    try {
        const success = await userModel.deleteUser(userId);
        if (success) {
            res.status(200).json({ message: 'User login deleted' });
        } else {
            res.status(404).json({ message: 'User login not found' });
        }
    } catch (error) {
        console.error('Error deleting user login:', error);
        res.status(500).json({ message: 'Error deleting user login' });
    }
}

module.exports = {
    authenticateUser,
    registerUser,
    updateUserLogin,
    deleteUserLogin
};
