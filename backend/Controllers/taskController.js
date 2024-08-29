const Task = require("../Models/taskModel");

const createTask = async (req, res) => {
  try {
    const data = req.body;
    const newTask = new Task(data);
    await newTask.save();
    res.status(201).json({
      message: "Task Created",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Create Task",
      success: false,
      error,
    });
  }
};

const fetchAllTasks = async (req, res) => {
  try {
    const data = await Task.find({});
    res.status(200).json({
      message: "All Tasks",
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Faled to Fetch Tasks",
      success: false,
      error,
    });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await Task.findByIdAndUpdate(id, obj);

    res.status(200).json({
      message: "Task Updated",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Update Task",
      success: false,
      error,
    });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task Deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Delete Task",
      success: false,
      error,
    });
  }
};

module.exports = { createTask, fetchAllTasks, updateTaskById, deleteTaskById };
