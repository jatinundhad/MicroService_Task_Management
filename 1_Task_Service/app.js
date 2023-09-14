import express from "express";
import cors from "cors";
import taskRoutes from './routes/taskRoutes.js'

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());
app.use('/task',taskRoutes)

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

export default app;
