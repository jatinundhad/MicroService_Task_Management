import "../database/conn.js";
import Task from "../model/taskModel.js";
import axios from "axios";

export const addtaskController = async (req, res) => {
  try {
    // getting the task attributes
    const {
      title,
      description,
      duedate,
      priority,
      status,
      assignee,
      assigner,
      notifications,
      tags,
      team_id,
    } = req.body;

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

    let requestBody = {
      assignee: assignee,
      assigner: assigner,
      team_id: team_id,
    };

    // await axios
    //   .post("http://localhost:5002/checkValidity", requestBody)
    //   .catch((err) => {
    //     if (err.response.status == 401) {
    //       privilegeError = err.response.message;
    //     }
    //   });

    // if (assigneeError) {
    //   return res.status(400).json({ message: assigneeError });
    // }

    // if (assignerError) {
    //   return res.status(400).json({ message: assignerError });
    // }

    // if (privilegeError) {
    //   return res.status(400).json({ message: privilegeError });
    // }

    // if (assignee == assigner) {
    //   return res.status(400).json({
    //     message: "Assigner and Assignee Must be different",
    //   });
    // }

    const newTask = await Task.create({
      title,
      description,
      duedate,
      priority,
      status,
      assignee,
      assigner,
      notifications,
      tags,
      team_id,
    });

    axios.post(
      "http://localhost:5003/addnotification",
      req.body
      );


    return res
      .status(201)
      .json({ message: "Task added and Notified successfully", task: newTask });
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
