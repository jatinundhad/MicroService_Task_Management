import express from "express";
import cors from "cors";
import taskRoutes from './routes/taskRoutes.js'
import morgan from "morgan";
import chalk from "chalk";

const app = express();
const PORT = 5001;
 
app.use(express.json());
app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return (
      chalk.green(tokens.method(req, res)) +
      " " +
      chalk.blue(tokens.url(req, res)) +
      " " +
      chalk.green(tokens.status(req, res))
    );
  })
);
app.use('/task',taskRoutes)

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

export default app;
