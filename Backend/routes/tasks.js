// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { title, startDate, endDate } = req.body;
  if (!title || !startDate || !endDate) {
    return res.status(400).json({ message: 'Title, start date, and end date are required' });
  }

  const task = new Task({ title, startDate, endDate });
  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing task
router.put('/:id', async (req, res) => {
  const { title, startDate, endDate } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, startDate, endDate },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
