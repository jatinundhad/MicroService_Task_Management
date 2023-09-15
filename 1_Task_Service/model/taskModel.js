import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: {
    type: String,
    default: false,
  },
  assignee: String,
  assigner : String
});

const Task = mongoose.model("Task", taskSchema);

export default Task;