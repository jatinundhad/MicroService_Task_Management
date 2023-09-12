import express, { response } from "express";
import './database/conn.js';
import Task from "./model/taskModel.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/addtask', (req, res) => {
    const { title, description, duedate, status } = req.body; 
    try {
        const new_task = new Task({ title, description, duedate });
        new_task.save();
        res.status(201).json({ message: "Task added successfully" });
    } catch (err) { 
        console.log(err);
        res.status(500).send('err' + err);
    }
})

app.listen(PORT,()=>console.log(`listening on ${PORT}`));