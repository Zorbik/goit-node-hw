import { NotFoundError } from "../helpers/errors.js";
import { Contact } from "../models/contactModel.js";

export async function listContacts() {
  return await Contact.find({});
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFoundError("Not found");
  }
  return contact;
}

export async function removeContact(contactId) {
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new NotFoundError("Not found");
  }
  return contact;
}

export async function addContact(name, email, phone) {
  const newContact = new Contact({ name, email, phone });
  await newContact.save();
  return newContact;
}

export async function updateContact(contactId, body) {
  upContact(contactId, body);
}

export async function updateStatusContact(contactId, body) {
  upContact(contactId, body);
}

async function upContact(contactId, body) {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw new NotFoundError("Not found");
  }
  return updatedContact;
}
