const {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
} = require("../Controllers/taskController");

const router = require("express").Router();

router.get("/", fetchAllTasks);
router.post("/", createTask);
router.put("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

module.exports = router;
