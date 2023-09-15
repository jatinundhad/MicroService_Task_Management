import { Router } from "express";
import { addtaskController , testController } from "../controllers/taskController.js";

const router = Router();

router.post('/addtask', addtaskController);
router.get('/test', testController)

export default router;
