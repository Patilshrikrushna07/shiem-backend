const mongoose = require("mongoose");

const tasksModel = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TasksModel = mongoose.model("tasks", tasksModel);
module.exports = TasksModel;
