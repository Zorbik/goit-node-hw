import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../services/contactsService.js";

export const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { page, limit, favorite } = req.query;
  const contacts = await listContacts(userId, page, limit, favorite);
  res.status(200).json({ contacts, status: "success" });
};

export const getContactByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, userId);
  res.status(200).json({ contact, status: "success" });
};

export const addNewContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id: userId } = req.user;

  const contact = await addContact({ name, email, phone }, userId);

  res.status(201).json({ contact, status: "success" });
};

export const deleteContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const response = await removeContact(contactId, userId);
  if (!response) {
    return res.status(400).json({
      message: "Not found",
    });
  }
  res.status(200).json({ response, status: "success" });
};

export const changeContactController = async (req, res, next) => {
  await updContact(req, res);
};

export const changeFavoriteController = async (req, res, next) => {
  await updContact(req, res);
};

async function updContact(req, res) {
  const { _id: userId } = req.user;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "missing fields",
    });
  }
  const { contactId } = req.params;

  const updatedContact = await updateContact(contactId, req.body, userId);

  if (!updatedContact) {
    return res.status(400).json({
      message: "Not found",
    });
  }

  res.status(200).json({ updatedContact, status: "success" });
}
