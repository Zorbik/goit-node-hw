import { Router } from "express";
import {
  postValidationMiddleware,
  putValidationMiddleware,
} from "../../middlewares/validationMiddlevares.js";
import {
  addNewContact,
  deleteContact,
  getContactsById,
  getContacts,
  changeContact,
} from "../../controllers/contactController.js";

export const contactsRouter = new Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:contactId", getContactsById);

contactsRouter.post("/", postValidationMiddleware, addNewContact);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.put("/:contactId", putValidationMiddleware, changeContact);
