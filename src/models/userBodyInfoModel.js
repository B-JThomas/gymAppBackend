const pool = require('../config/database');

// Create body info
async function createBodyInfo(bodyInfoData) {
    const { userId, gender, height, weight, age, thigh, calf, glute, upperarm, forearm, chest, shoulders, waist, neck } = bodyInfoData;
    const [result] = await pool.query(
        'INSERT INTO `user_body_info` (userID, gender, height, weight, age, thigh, calf, glute, upperarm, forearm, chest, shoulders, waist, neck) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, gender, height, weight, age, thigh, calf, glute, upperarm, forearm, chest, shoulders, waist, neck]
    );
    return { recordID: result.insertId, ...bodyInfoData };
}

// Get body info by userId
async function getBodyInfoByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM `user_body_info` WHERE userID = ?', [userId]);
    return rows;
}

// Update body info
async function updateBodyInfo(userId, recordId, bodyInfoUpdates) {
    const [result] = await pool.query(
        'UPDATE `user_body_info` SET ? WHERE userID = ? AND recordID = ?',
        [bodyInfoUpdates, userId, recordId]
    );
    return result.affectedRows > 0 ? bodyInfoUpdates : null;
}

async function getCurrentBodyInfoByUserId(userId) {
    const [rows] = await pool.query(
        'SELECT * FROM `user_body_info` WHERE userID = ? ORDER BY recordID DESC LIMIT 1',
        [userId]
    );
    return rows[0]; // Return the first (and only) row
}

// Delete body info
async function deleteBodyInfo(userId, recordId) {
    const [result] = await pool.query('DELETE FROM `user_body_info` WHERE userID = ? AND recordID = ?', [userId, recordId]);
    return result.affectedRows > 0;
}

module.exports = {
    createBodyInfo,
    getBodyInfoByUserId,
    getCurrentBodyInfoByUserId,
    updateBodyInfo,
    deleteBodyInfo
};
