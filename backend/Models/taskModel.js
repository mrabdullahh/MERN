const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
