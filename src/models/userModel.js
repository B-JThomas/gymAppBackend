const pool = require('../config/db');
const bcrypt = require('bcrypt');

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

// Retrieve a specific user by userId
async function getUsersByEmail(email) {
    try {
        const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?;', [email]);
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
async function createUser({ username, phoneNumber, email, password, role_id }) {
    try {
        const passwordHash = await bcrypt.hash(password, 10);

        // Build the SQL query and values array dynamically
        let sql = 'INSERT INTO `user` (username, email, passwordHash, role_id';
        let values = [username, email, passwordHash, role_id];

        // Add phoneNumber to the query and values if provided
        if (phoneNumber !== undefined) {
            sql += ', phoneNumber';
            values.push(phoneNumber);
        }

        sql += ') VALUES (?,?,?,?';
        if (phoneNumber !== undefined) {
            sql += ',?';
        }
        sql += ');';

        // Execute the query
        const [result] = await pool.query(sql, values);
        return { userId: result.insertId, username, phoneNumber, email, passwordHash, role_id };
    } catch (error) {
        console.error('Error inserting into the database:', error);
        throw error;
    }
}

// Update an existing user's details
// Update an existing user's details with optional fields
async function updateUser(userId, updates) {
    try {
        // Construct the SQL query dynamically based on the provided fields
        let sql = 'UPDATE `user` SET ';
        const values = [];

        // Add fields to be updated based on the provided fields
        if (updates.username !== undefined) {
            sql += 'username = ?, ';
            values.push(updates.username);
        }
        if (updates.phoneNumber !== undefined) {
            sql += 'phoneNumber = ?, ';
            values.push(updates.phoneNumber);
        }
        if (updates.email !== undefined) {
            sql += 'email = ?, ';
            values.push(updates.email);
        }
        if (updates.password !== undefined) {
            // Hash the password before updating
            const passwordHash = await bcrypt.hash(updates.password, 10);
            sql += 'passwordHash = ?, ';
            values.push(passwordHash);
        }
        if (updates.role_id !== undefined) {
            sql += 'role_id = ?, ';
            values.push(updates.role_id);
        }

        // Remove the trailing comma and space, and add the WHERE clause
        sql = sql.slice(0, -2) + ' WHERE userId = ?';
        values.push(userId);

        // Execute the query
        const [result] = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return null; // No user updated
        }

        return { userId, ...updates }; // Return the updated user details
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
    getUsersByEmail,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
};