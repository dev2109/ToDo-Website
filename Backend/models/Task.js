// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
