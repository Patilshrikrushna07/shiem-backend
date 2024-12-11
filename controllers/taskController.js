const asyncHandler = require("express-async-handler");
const Tasks = require("../models/tasksModel");
const { errorResponse, successResponse } = require("../helpers/apiResponse");

// Create Task
const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo, createdBy, deadline } = req.body;

    if (!title || !description || !priority || !status || !assignedTo || !createdBy || !deadline) {
      return errorResponse({ res, message: "Please fill all required fields!" });
    }

    const task = await Tasks.create({
      title,
      description,
      priority,
      status,
      assignedTo,
      createdBy,
      deadline,
    });

    successResponse({
      res,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

// Get All Tasks
const getAllTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Tasks.find();
    successResponse({
      res,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

// Get Tasks for a Specific User
const getUserTasks = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Tasks.find({ assignedTo: userId });

    successResponse({
      res,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

// Get Incomplete Tasks for a Specific User
const getIncompleteTasks = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Tasks.find({ assignedTo: userId, status: { $ne: "Completed" } });

    successResponse({
      res,
      message: "Incomplete tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, assignedTo, deadline } = req.body;

    const task = await Tasks.findByIdAndUpdate(
      id,
      { title, description, priority, status, assignedTo, deadline },
      { new: true, runValidators: true }
    );

    if (!task) {
      return errorResponse({ res, message: "Task not found!" });
    }

    successResponse({
      res,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndDelete(id);

    if (!task) {
      return errorResponse({ res, message: "Task not found!" });
    }

    successResponse({
      res,
      message: "Task deleted successfully",
      data: { taskId: id },
    });
  } catch (error) {
    console.log(error);
    errorResponse({ res, message: "Something went wrong!" });
  }
});

//get task by id
const getTaskById = asyncHandler(async (req, res) => {
    try {
    
      const task = await Tasks.findOne( {_id:req.params.Id} );
  
      if (!task) {
        errorResponse({ res, message: "Task does not exists!" });
      }
      else {
        successResponse({
          res,
          message: "task details fetch successfully",
          data: task,
        });
      }
  
    } catch (error) {
      console.log(error);
      errorResponse({ res, message: "Something went wrong!" });
    }
  });
  

module.exports = {
  createTask,
  getAllTasks,
  getUserTasks,
  getIncompleteTasks,
  updateTask,
  deleteTask,
  getTaskById
};
