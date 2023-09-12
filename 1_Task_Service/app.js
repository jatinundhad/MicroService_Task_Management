import express, { response } from "express";
import './database/conn.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/addtask', (req, res) => {
    const { title, description, duedate, status } = req.body; 
    res.send(req.body);
})

app.listen(PORT,()=>console.log(`listening on ${PORT}`));