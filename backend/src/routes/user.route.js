import express from "express";
import { AsyncHandler } from "../utils/asynchandler.utils.js";
import { userController } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", AsyncHandler(userController.signup));
router.post("/login", AsyncHandler(userController.login));
router.post("/logout", AsyncHandler(userController.logout));
router.get(
  "/verify-token",
  authMiddleware,
  AsyncHandler(userController.verifyToken)
);
export default router;
