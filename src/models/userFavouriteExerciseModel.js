const pool = require('../config/database'); // Adjust path as per your setup

// Create a favourite exercise for a user
async function createFavouriteExercise({ userId, exerciseID, favourite }) {
    const [result] = await pool.query(
        'INSERT INTO `user_favourite_exercise` (userId, exerciseID, favourite) VALUES (?, ?, ?)',
        [userId, exerciseID, favourite]
    );
    return { userId, exerciseID, favourite };
}

// Get all favourite exercises for a user by their userId
async function getFavouriteExercisesByUserId(userId) {
    const [rows] = await pool.query(
        'SELECT * FROM `user_favourite_exercise` WHERE userId = ?',
        [userId]
    );
    return rows;
}

// Update the favourite status of an exercise for a user
async function updateFavouriteExercise(userId, exerciseId, favourite) {
    const [result] = await pool.query(
        'UPDATE `user_favourite_exercise` SET favourite = ? WHERE userId = ? AND exerciseID = ?',
        [favourite, userId, exerciseId]
    );
    return result.affectedRows > 0;
}

// Remove a favourite exercise for a user
async function removeFavouriteExercise(userId, exerciseId) {
    const [result] = await pool.query(
        'DELETE FROM `user_favourite_exercise` WHERE userId = ? AND exerciseID = ?',
        [userId, exerciseId]
    );
    return result.affectedRows > 0;
}

module.exports = {
    createFavouriteExercise,
    getFavouriteExercisesByUserId,
    updateFavouriteExercise,
    removeFavouriteExercise
};
