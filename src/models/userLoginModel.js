const pool = require('../config/db'); // MySQL pool connection

// Get user by email
async function getUserByEmail(email) {
    try {
        const [rows] = await pool.query('SELECT * FROM `user_login` WHERE email = ?;', [email]);
        return rows[0] || null; // Return null if no user found
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error;
    }
}

// Create a new user login
async function createUserLogin({ userId, email, passwordHash }) {
    try {
        console.log(`Model userID:${userId}`)
        const [result] = await pool.query(
            'INSERT INTO `user_login` (userId, email, passwordHash) VALUES (?, ?, ?);',
            [userId, email, passwordHash]
        );
        return { userId, email, passwordHash };
    } catch (error) {
        console.error('Error inserting into the database:', error);
        throw error;
    }
}

// Update user email
async function updateUserEmail(userId, email) {
    try {
        const [result] = await pool.query(
            'UPDATE `user_login` SET email = ? WHERE userId = ?;',
            [email, userId]
        );
        return result.affectedRows > 0; // Return true if a record was updated
    } catch (error) {
        console.error('Error updating the database:', error);
        throw error;
    }
}

// Update user password
async function updateUserPassword(userId, passwordHash) {
    try {
        const [result] = await pool.query(
            'UPDATE `user_login` SET passwordHash = ? WHERE userId = ?;',
            [passwordHash, userId]
        );
        return result.affectedRows > 0; // Return true if a record was updated
    } catch (error) {
        console.error('Error updating the database:', error);
        throw error;
    }
}

// Delete user login
async function deleteUserLogin(userId) {
    try {
        const [result] = await pool.query('DELETE FROM `user_login` WHERE userId = ?;', [userId]);
        return result.affectedRows > 0; // Return true if a record was deleted
    } catch (error) {
        console.error('Error deleting from the database:', error);
        throw error;
    }
}

module.exports = {
    getUserByEmail,
    createUserLogin,
    updateUserEmail,
    updateUserPassword,
    deleteUserLogin
};
