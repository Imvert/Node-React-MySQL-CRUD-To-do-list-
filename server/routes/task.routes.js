import { Router } from "express";
import {
  getTask,
  createTask,
  deleteTasks,
  updateTask,
  getTasks,
} from "../controllers/tasks.controllers.js";

import { tokenEstractor } from "../middleware/userEstractor.js";

const router = Router();
router.get("/tasks", tokenEstractor, getTasks);

router.get("/task/:id", tokenEstractor, getTask);

router.post("/task", tokenEstractor, createTask);

router.put("/task/:id", tokenEstractor, updateTask);

router.delete("/task/:id", tokenEstractor, deleteTasks);

export default router;
