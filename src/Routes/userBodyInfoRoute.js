const express = require('express');
const router = express.Router();
const bodyInfoController = require('../controllers/userBodyInfoController');

// GET /body-info/:userId: Get all records
router.get('/:userId', bodyInfoController.getBodyInfo);

// GET /body-info/current/:userId: Get lates record
router.get('/current/:userId', bodyInfoController.getBodyInfoCurrent);

// POST /body-info: Add new body info for a user
router.post('/', bodyInfoController.addBodyInfo);

// PUT /body-info/:userId/:recordId: Update body info for a specific user record
router.put('/:userId/:recordId', bodyInfoController.updateBodyInfo);

// DELETE /body-info/:userId/:recordId: Delete a body info record for a user
router.delete('/:userId/:recordId', bodyInfoController.deleteBodyInfo);

module.exports = router;