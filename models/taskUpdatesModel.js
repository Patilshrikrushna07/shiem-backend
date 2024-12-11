const mongoose = require("mongoose");

const tasksUpdateModel = mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TasksUpdateModel = mongoose.model("tasks", tasksUpdateModel);
module.exports = TasksUpdateModel;
