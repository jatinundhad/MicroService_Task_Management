import express from "express";
import "./database/conn.js";
import Task from "./model/taskModel.js";

const app = express();
const PORT = 5001;

app.use(express.json());

app.get("/api/api2", (req, res) => { 
  console.log("taesek")
})

app.get("/*", (req, res) => { 
  console.log(req.url)
  console.log("rceived");
})


app.post("/task/addtask", async (req, res) => {
  const { title, description, duedate, status } = req.body;

  try {
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
