import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: {
    type: String,
    default: false,
  },
  //   assignee: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User", // Reference to the User collection
  //   },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;