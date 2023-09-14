import { Router } from "express";
import { addtaskController } from "../controllers/taskController.js";

const router = Router();

router.post('/addtask', addtaskController);

export default router;
