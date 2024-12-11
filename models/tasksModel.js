const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },
    priority: {
      type: String,
      required: [true, "Task priority is required"],
      enum: ["Low", "Medium", "High"], 
    },
    status: {
      type: String,
      required: [true, "Task status is required"],
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: [true, "Assigned user is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: [true, "Creator is required"],
    },
    deadline: {
      type: Date, 
    },
  },
  {
    timestamps: true, 
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
