const pool = require('../config/db');

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
async function updateBodyInfo(recordId, bodyInfoUpdates) {
    // Filter out `null` or `undefined` values from the updates
    const updates = Object.entries(bodyInfoUpdates).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {});

    if (Object.keys(updates).length === 0) {
        // No valid updates to make
        return null;
    }

    // Build the SET clause dynamically
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), recordId];

    const [result] = await pool.query(
        `UPDATE \`user_body_info\` SET ${setClause} WHERE recordID = ?`,
        values
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
async function deleteBodyInfo(recordId) {
    const [result] = await pool.query('DELETE FROM `user_body_info` WHERE recordID = ?', [recordId]);
    return result.affectedRows > 0;
}

module.exports = {
    createBodyInfo,
    getBodyInfoByUserId,
    getCurrentBodyInfoByUserId,
    updateBodyInfo,
    deleteBodyInfo
};
