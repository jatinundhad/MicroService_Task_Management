import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  duedate: {
    type: Date,
    require:true
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed", "Deferred", "Cancelled"],
    default: "To Do",
  },
  assignee: {
    type: String,
    require: true,
  },
  assigner: {
    type: String,
    require: true,
  },
  notifications: [String],
  tags: [String],
  team_id: {
    type: String,
    require: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
