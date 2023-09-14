import express from "express";
import "./database/conn.js";
import Task from "./model/taskModel.js";
import cors from "cors";

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  console.log("called get")
  res.send("Response from Service 1");
});


// Corrected route handler for POST requests
app.post("/addtask", async (req, res) => {
  console.log("called post")
  try {
    const { title, description,duedate,status } = req.body;
    const newTask = await Task.create({ title, description, duedate });
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

export default app;
