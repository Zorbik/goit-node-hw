import { Router } from "express";
import { uploadController } from "../../controllers/fileController.js";
import { uploadMiddleware } from "../../middlewares/uploadMiddlewares.js";
// import { asyncWrapper } from "../../helpers/apiHelpers.js";

export const filesRouter = new Router();

filesRouter.post("/", uploadMiddleware.single("avatar"), uploadController);
