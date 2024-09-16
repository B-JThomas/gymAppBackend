const pool = require('../config/db');

async function getUsers() {
    try {
        const [rows] = await pool.query("SELECT * FROM `user`;");
        console.log(rows);
        return rows
    } catch (error) {
        console.error('Error querying databases:', error);
    }
}

async function getUsersByID(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM `user` WHERE userId = ?;', [id]);
        if (rows.length === 0) {
            console.log(`No one matching ID: ${id}`);
        } else {
            console.log(rows);
        }
        return rows[0];
    } catch (error) {
        console.error('Error querying databases:', error);
    }
}

async function getUserByUsername(username) {
    try {
        const [rows] = await pool.query('SELECT * FROM `user` WHERE username = ?', [username]);
        if (rows.length === 0) {
            console.log(`No one matching username: ${username}`);
        } else {
            console.log(rows);
        }
        return rows[0];
    } catch (error) {
        console.error('Error querying databases:', error);
    }
}



module.exports = {
    getUsers,
    getUsersByID,
    getUserByUsername,
};