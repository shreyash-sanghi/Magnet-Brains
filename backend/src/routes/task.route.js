import express from "express";
import { AsyncHandler } from "../utils/asynchandler.utils.js";
import { taskController } from "../controller/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",authMiddleware,AsyncHandler(taskController.create));
router.put("/edit/:taskId",authMiddleware,AsyncHandler(taskController.edit));

router.patch("/status/:taskId",authMiddleware,AsyncHandler(taskController.changeStatus));
router.delete("/delete/:taskId",authMiddleware,AsyncHandler(taskController.delete));
router.get("/get",authMiddleware,AsyncHandler(taskController.getAll));
router.get("/get-pending-task",authMiddleware,AsyncHandler(taskController.getPandingCount));

export default router;
