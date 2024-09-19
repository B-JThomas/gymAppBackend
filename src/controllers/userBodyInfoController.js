const bodyInfoModel = require('../models/userBodyInfoModel');

// POST /body-info: Add new body info for a user
async function addBodyInfo(req, res) {
    const { userId, gender, height, weight, age, thigh, calf, glute, upperarm, forearm, chest, shoulders, waist, neck } = req.body;
    try {
        const newBodyInfo = await bodyInfoModel.createBodyInfo({
            userId, gender, height, weight, age, thigh, calf, glute, upperarm, forearm, chest, shoulders, waist, neck
        });
        res.status(201).json(newBodyInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding body info' });
    }
}

// GET /body-info/:userId: Get body info for a specific user
async function getBodyInfo(req, res) {
    const { userId } = req.params;
    try {
        const bodyInfo = await bodyInfoModel.getBodyInfoByUserId(userId);
        res.status(200).json(bodyInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching body info' });
    }
}

// GET /body-info/:userId: Get body info for a specific user
async function getCurrentBodyInfo(req, res) {
    const { userId } = req.params;
    try {
        const bodyInfo = await bodyInfoModel.getCurrentBodyInfoByUserId(userId);
        res.status(200).json(bodyInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching body info' });
    }
}

// PUT /body-info/:userId/:recordId: Update body info for a specific user record
async function updateBodyInfo(req, res) {
    const { userId, recordId } = req.params;
    const bodyInfoUpdates = req.body;
    try {
        const updatedBodyInfo = await bodyInfoModel.updateBodyInfo(userId, recordId, bodyInfoUpdates);
        res.status(200).json(updatedBodyInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating body info' });
    }
}

// DELETE /body-info/:userId/:recordId: Delete a body info record for a user
async function deleteBodyInfo(req, res) {
    const { userId, recordId } = req.params;
    try {
        await bodyInfoModel.deleteBodyInfo(userId, recordId);
        res.status(200).json({ message: 'Body info record deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting body info' });
    }
}

module.exports = {
    addBodyInfo,
    getBodyInfo,
    getCurrentBodyInfo,
    updateBodyInfo,
    deleteBodyInfo
};
