import express from "express";
import userRouter from "./user.route.js";
import taskRouter from "./task.route.js";
const router = express.Router();

router.use("/user",userRouter);
router.use("/task",taskRouter);

export default router;