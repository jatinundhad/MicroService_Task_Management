import { Router } from "express";

import {
  loginController,
  registerController,
  searchuserController,
} from "../controllers/authControllers.js";

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/search/:username',searchuserController)

export default router;
