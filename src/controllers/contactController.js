import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../models/contacts.js";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: "success" });
  } catch (error) {}
};

export const getContactsById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact)
      return res.status(404).json({
        message: "Not found",
      });
    res.status(200).json({ contact, status: "success" });
  } catch (error) {}
};

export const addNewContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const contact = await addContact(name, email, phone);

    res.status(201).json({ contact, status: "success" });
  } catch (error) {}
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const response = await removeContact(contactId);
    if (!response)
      return res.status(404).json({
        message: "Not found",
      });
    res.status(200).json({ status: "success" });
  } catch (error) {}
};

export const changeContact = async (req, res, next) => {
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
};
