const userModel = require('../models/userModel');

async function getUserByUsername(req, res) {
  try {
    const username = req.params.username;
    const user = await userModel.getUserByUsername(username);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user' });
  }
}

module.exports = { getUserByUsername };