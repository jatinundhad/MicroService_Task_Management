import "../database/conn.js"
import Task from '../model/taskModel.js'

export const addtaskController = async (req, res) => {
  console.log("called post");
  try {
    const { title, description, duedate, status } = req.body;
    const newTask = await Task.create({ title, description, duedate });
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};
