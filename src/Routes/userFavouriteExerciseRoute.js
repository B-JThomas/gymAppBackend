const express = require('express');
const router = express.Router();
const userFavouriteExerciseController = require('../controllers/userFavouriteExerciseController');

// POST /user-favourite-exercise: Add a favourite exercise for a user
router.post('/', userFavouriteExerciseController.addFavouriteExercise);

// GET /user-favourite-exercise/:userId: Get all favourite exercises for a user
router.get('/:userId', userFavouriteExerciseController.getFavouriteExercisesByUserId);

// PUT /user-favourite-exercise/:userId/:exerciseId: Update the favourite status of an exercise for a user
router.put('/:userId/:exerciseId', userFavouriteExerciseController.updateFavouriteExercise);

// DELETE /user-favourite-exercise/:userId/:exerciseId: Remove a favourite exercise for a user
router.delete('/:userId/:exerciseId', userFavouriteExerciseController.removeFavouriteExercise);

module.exports = router;
