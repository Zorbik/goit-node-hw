import { Router } from "express";
import { validationMiddleware } from "../../middlewares/validationContactMiddlewares.js";
import {
  addNewContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  changeContactController,
  changeFavoriteController,
} from "../../controllers/contactController.js";
import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

export const contactsRouter = new Router();

contactsRouter.use(authMiddleware);

contactsRouter.get("/", asyncWrapper(getContactsController));
contactsRouter.get("/:contactId", asyncWrapper(getContactByIdController));
contactsRouter.post(
  "/",
  validationMiddleware,
  asyncWrapper(addNewContactController)
);
contactsRouter.delete("/:contactId", asyncWrapper(deleteContactController));
contactsRouter.put(
  "/:contactId",
  validationMiddleware,
  asyncWrapper(changeContactController)
);
contactsRouter.patch(
  "/:contactId/favorite",
  asyncWrapper(changeFavoriteController)
);
