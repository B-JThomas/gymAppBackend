const userFavouriteExerciseModel = require('../models/userFavouriteExerciseModel');

// Add a favourite exercise for a user
async function addFavouriteExercise(req, res) {
    const { userId, exerciseID, favourite } = req.body;

    try {
        const result = await userFavouriteExerciseModel.createFavouriteExercise({ userId, exerciseID, favourite });
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding favourite exercise:', error);
        res.status(500).json({ message: 'Error adding favourite exercise' });
    }
}

// Get all favourite exercises for a user
async function getFavouriteExercisesByUserId(req, res) {
    const { userId } = req.params;

    try {
        const favouriteExercises = await userFavouriteExerciseModel.getFavouriteExercisesByUserId(userId);
        res.status(200).json(favouriteExercises);
    } catch (error) {
        console.error('Error fetching favourite exercises:', error);
        res.status(500).json({ message: 'Error fetching favourite exercises' });
    }
}

// Update the favourite status of an exercise for a user
async function updateFavouriteExercise(req, res) {
    const { userId, exerciseId } = req.params;
    const { favourite } = req.body;

    try {
        const updated = await userFavouriteExerciseModel.updateFavouriteExercise(userId, exerciseId, favourite);
        if (updated) {
            res.status(200).json({ message: 'Favourite exercise updated' });
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        console.error('Error updating favourite exercise:', error);
        res.status(500).json({ message: 'Error updating favourite exercise' });
    }
}

// Remove a favourite exercise for a user
async function removeFavouriteExercise(req, res) {
    const { userId, exerciseId } = req.params;

    try {
        const success = await userFavouriteExerciseModel.removeFavouriteExercise(userId, exerciseId);
        if (success) {
            res.status(200).json({ message: 'Favourite exercise removed' });
        } else {
            res.status(404).json({ message: 'Favourite exercise not found' });
        }
    } catch (error) {
        console.error('Error removing favourite exercise:', error);
        res.status(500).json({ message: 'Error removing favourite exercise' });
    }
}

module.exports = {
    addFavouriteExercise,
    getFavouriteExercisesByUserId,
    updateFavouriteExercise,
    removeFavouriteExercise
};
