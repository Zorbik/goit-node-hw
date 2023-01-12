import { Router } from "express";
import {
  currentUserController,
  loginUserController,
  logoutUserController,
  registrateUserController,
  subscriptionController,
} from "../../controllers/authController.js";
import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { isValidTokenMiddleware } from "../../middlewares/isValidTokenMiddleware.js";

export const usersRouter = new Router();

usersRouter.post("/signup", asyncWrapper(registrateUserController));
usersRouter.post("/login", asyncWrapper(loginUserController));

usersRouter.use(isValidTokenMiddleware);
usersRouter.get("/logout", asyncWrapper(logoutUserController));
usersRouter.get("/current", asyncWrapper(currentUserController));
usersRouter.patch("/:id", asyncWrapper(subscriptionController));
