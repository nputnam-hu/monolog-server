import { Router } from "express";
import userController from "../controllers/user.controller.mjs";
// import authMiddleware from "../middlewares/auth.middleware";

const userRoutes = Router();
userRoutes.post("/user", userController.add);
userRoutes.get("/user", userController.get);
userRoutes.get("/user/:id", userController.find);
userRoutes.put(
  "/user",
  // authMiddleware,
  userController.update
);
userRoutes.delete("/user/:id", userController.delete);

export { userRoutes };
