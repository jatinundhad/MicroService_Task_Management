import "../database/conn.js";
import Task from "../model/taskModel.js";
import axios from "axios";

export const addtaskController = async (req, res) => {
  try {
    const { title, description, duedate, status, assignee, assigner } =
      req.body;

    let assigneeError, assignerError, privilegeError;

    await axios
      .get("http://localhost:5000/auth/search/" + assignee)
      .catch((err) => {
        if (err.response.status == 401) {
          assigneeError = "No such Assignee Found";
        }
      });

    await axios
      .get("http://localhost:5000/auth/search/" + assigner)
      .catch((err) => {
        if (err.response.status == 401) {
          assignerError = "No Such Assigner Found";
        }
      });

    await axios
      .get("http://localhost:5002/check_lead/" + assigner)
      .catch((err) => {
        if (err.response.status == 401) {
          privilegeError = "Assigner has no Privilege to assign tasks";
        }
      });

    if (assigneeError) {
      return res.status(400).json({ message: assigneeError });
    }

    if (assignerError) {
      return res.status(400).json({ message: assignerError });
    }

    if (privilegeError) {
      return res.status(400).json({ message: privilegeError });
    }

    if (assignee == assigner) {
      return res.status(400).json({
        message: "Assigner and Assignee Must be different",
      });
    }

    const newTask = await Task.create({ title, description, duedate });
    return res
      .status(201)
      .json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const testController = async (req, res) => {
  res.send("Test Success");
};
