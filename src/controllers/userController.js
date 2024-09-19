const userModel = require('../models/userModel');



// ====================== USER TABLE ======================
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

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
}

async function getUserById(req, res) {
  const { userId } = req.params;
  try {
    const user = await userModel.getUsersByID(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
}

async function createUser(req, res) {
  const { username, phoneNumber } = req.body;
  try {
    // Ensure all required fields are provided and valid
    const newUser = await userModel.createUser({ username, phoneNumber });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
}

async function updateUserById(req, res) {
  const { userId } = req.params;
  const { username, phoneNumber } = req.body;
  try {
    const updatedUser = await userModel.updateUser(userId, { username, phoneNumber });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
}

async function deleteUserById(req, res) {
  const { userId } = req.params;
  try {
    const result = await userModel.deleteUser(userId);
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
}


// ====================== LOGIN TABLE ======================

module.exports = { 
  getUserByUsername,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById, 
};

