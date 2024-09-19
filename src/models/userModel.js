const pool = require('../config/db'); // MySQL pool connection

// Retrieve a list of all users
async function getUsers() {
    try {
        const [rows] = await pool.query("SELECT * FROM `user`;");
        return rows;
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error;
    }
}

// Retrieve a specific user by userId
async function getUsersByID(userId) {
    try {
        const [rows] = await pool.query('SELECT * FROM `user` WHERE userId = ?;', [userId]);
        return rows[0] || null; // Return null if no user found
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error;
    }
}

// Retrieve a specific user by username
async function getUserByUsername(username) {
    try {
        const [rows] = await pool.query('SELECT * FROM `user` WHERE username = ?;', [username]);
        return rows[0] || null; // Return null if no user found
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error;
    }
}

// Create a new user
async function createUser({ username, phoneNumber, role_id }) {
    try {
        const [result] = await pool.query(
            'INSERT INTO `user` (username, phoneNumber, role_id) VALUES (?, ?, ?);',
            [username, phoneNumber, role_id]
        );
        return { userId: result.insertId, username, phoneNumber, role_id };
    } catch (error) {
        console.error('Error inserting into the database:', error);
        throw error;
    }
}

// Update an existing user's details
async function updateUser(userId, { username, phoneNumber, role_id }) {
    try {
        const [result] = await pool.query(
            'UPDATE `user` SET username = ?, phoneNumber = ?, role_id = ? WHERE userId = ?;',
            [username, phoneNumber, role_id, userId]
        );
        if (result.affectedRows === 0) {
            return null; // No user updated
        }
        return { userId, username, phoneNumber, role_id };
    } catch (error) {
        console.error('Error updating the database:', error);
        throw error;
    }
}

// Delete a user by userId
async function deleteUser(userId) {
    try {
        const [result] = await pool.query('DELETE FROM `user` WHERE userId = ?;', [userId]);
        return result.affectedRows > 0; // Return true if a user was deleted
    } catch (error) {
        console.error('Error deleting from the database:', error);
        throw error;
    }
}

module.exports = {
    getUsers,
    getUsersByID,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
};