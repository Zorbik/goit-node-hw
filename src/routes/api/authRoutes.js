import { Router } from "express";
import {
  avatarChangerController,
  currentUserController,
  loginUserController,
  logoutUserController,
  registrateUserController,
  subscriptionController,
  verifyController,
  repeatVerifyController,
} from "../../controllers/authController.js";
import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { isValidTokenMiddleware } from "../../middlewares/isValidTokenMiddleware.js";
import { uploadMiddleware } from "../../middlewares/uploadMiddlewares.js";

export const usersRouter = new Router();

usersRouter.post("/signup", asyncWrapper(registrateUserController));
usersRouter.post("/login", asyncWrapper(loginUserController));
usersRouter.post("/verify/", asyncWrapper(repeatVerifyController));
usersRouter.get("/verify/:verificationToken", asyncWrapper(verifyController));

usersRouter.use(isValidTokenMiddleware);

usersRouter.patch(
  "/avatars",
  uploadMiddleware.single("avatar"),
  asyncWrapper(avatarChangerController)
);

usersRouter.get("/logout", asyncWrapper(logoutUserController));
usersRouter.get("/current", asyncWrapper(currentUserController));
usersRouter.patch("/user/:id", asyncWrapper(subscriptionController));
