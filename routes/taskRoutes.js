const express = require("express");
const {
  createTask,
  getAllTasks,
  getUserTasks,
  getIncompleteTasks,
  updateTask,
  deleteTask,
  getTaskById
} = require("../controllers/taskController");
const { protect, adminProtect } = require("../middlewares/authMiddleware");
const router = express.Router();


// Task Routes
router.route("/create-task").post(protect, createTask);
router.route("/get-all-tasks").get(protect, getAllTasks);
router.route("/get-user-tasks/:userId").get(protect, getUserTasks);
router.route("/get-task-info/:Id").get(protect, getTaskById);
router.route("/get-incomplete-tasks/:userId").get(protect, getIncompleteTasks);
router.route("/update-task/:id").post(protect, updateTask);
router.route("/delete-task/:id").delete(protect, deleteTask);

module.exports = router;            