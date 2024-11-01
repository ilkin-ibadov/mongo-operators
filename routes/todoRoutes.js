const express = require('express');
const Todo = require('../models/todoModel');
const { authenticateToken, authorizeUser } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all todos for a user
router.get('/', authenticateToken, async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// Create a new todo
router.post('/add', authenticateToken, async (req, res) => {
  const todo = new Todo({
    ...req.body,
    author: req.user._id,
  });
  await todo.save();
  res.status(201).json(todo);
});

// Get a single todo by ID
router.get('/todo/:id', authenticateToken, async (req, res, next) => {
  try {
    if (!req.todo) return res.status(404).json({ message: 'Todo not found' });

    req.todo = await Todo.findById(req.params.id).populate('author');
    res.json(req.todo);
  } catch {
    res.status(400).json({ message: 'Invalid todo ID' });
  }
});

// Update a todo
router.put('/update/:id', authenticateToken, async (req, res, next) => {
  try {
    if (!req.todo) return res.status(404).json({ message: 'Todo not found' });

    const updateSuccessful = await Todo.findByIdAndUpdate(req.params.id, req.body);

    updateSuccessful ? res.status(201).json(updateSuccessful) : res.status(400).json({message: "Error while updating todo"})
  }
  catch {
    res.status(400).json({ message: 'Invalid todo ID' });
  }
});

// Delete a todo
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    const todoDeleted = await Todo.findByIdAndDelete(req.params.id);
    
    todoDeleted ? res.status(204).json({ message: 'Todo deleted' }) : res.status(400).json({ message: 'Error while deleting todo' })
  } catch {
    res.status(400).json({ message: 'Invalid todo ID' });
  }
});

module.exports = router;
