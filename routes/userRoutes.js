const router = require('express').Router();
const User = require('../models/userModel');
const { authenticateToken, authorizeUser } = require('../utils/tokenUtils');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = User.find()
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error while fetching users:', error });
  }
});

// Get user by id
router.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update user
router.put('/update/:id', authenticateToken, authorizeUser, async (req, res, next) => {
  try {
    req.user = await User.findById(req.params.id);
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    
    Object.assign(req.user, req.body);
    await req.user.save();
    res.json(req.user);
  } catch {
    res.status(400).json({ message: 'Invalid user ID' });
  }
});

// Delete user
router.get('/delete/:id', async (req, res) => {
  const userDeleted = await User.findByIdAndDelete(req.params.id);

  if (userDeleted) {
    res.status(200).json({ message: 'User successfully deleted' });;
  } else {
    res.status(404).json({ message: 'Error while deleting user' });
  }
});

module.exports = router;
