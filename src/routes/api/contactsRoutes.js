import { Router } from "express";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import { schemaPost } from "../../services/validation.js";

export const contactsRouter = new Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: "success" });
  } catch (error) {}
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact)
      return res.status(404).json({
        message: "Not found",
      });
    res.status(200).json({ contact, status: "success" });
  } catch (error) {}
});

contactsRouter.post("/", async (req, res, next) => {
  const validationData = schemaPost.validate(req.body);
  if (validationData.error) {
    return res.status(400).json({
      message: validationData.error.details,
    });
  }
  try {
    const contact = await addContact(req.body);

    res.status(201).json({ contact, status: "success" });
  } catch (error) {}
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const response = await removeContact(contactId);
    if (!response)
      return res.status(404).json({
        message: "Not found",
      });
    res.status(200).json({ status: "success" });
  } catch (error) {}
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length)
      return res.status(400).json({
        message: "missing fields",
      });

    const updatedContact = await updateContact(req.params.contactId, req.body);

    if (!updatedContact)
      res.status(404).json({
        message: "Not found",
      });

    res.status(200).json({ updatedContact, status: "success" });
  } catch (error) {}
});
