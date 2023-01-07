import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsService.js";

export const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts, status: "success" });
};

export const getContactByIdController = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  res.status(200).json({ contact, status: "success" });
};

export const addNewContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await addContact(name, email, phone);

  res.status(201).json({ contact, status: "success" });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await removeContact(contactId);
  if (!response) {
    return res.status(400).json({
      message: "Not found",
    });
  }
  res.status(200).json({ response, status: "success" });
};

export const changeContactController = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    res.status(400).json({
      message: "Not found",
    });
  }

  res.status(200).json({ updatedContact, status: "success" });
};

export const changeFavoriteController = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "missing fields",
    });
  }

  const updatedContact = await updateStatusContact(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) {
    res.status(400).json({
      message: "Not found",
    });
  }

  res.status(200).json({ updatedContact, status: "success" });
};
