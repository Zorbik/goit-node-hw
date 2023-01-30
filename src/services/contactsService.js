import { NotFoundError } from "../helpers/errors.js";
import { Contact } from "../models/contactModel.js";

export async function listContacts(owner, page, limit, favorite) {
  let query = { owner };
  if (favorite) {
    query = { ...query, favorite };
  }
  const contacts = await Contact.find(query, { __v: 0, owner: 0 })
    .limit(limit)
    .skip((page - 1) * limit);
  return contacts;
}

export async function getContactById(contactId, owner) {
  const contact = await Contact.findOne(
    { _id: contactId, owner },
    { __v: 0, owner: 0 }
  );
  if (!contact) {
    throw new NotFoundError("Not found");
  }
  return contact;
}

export async function removeContact(contactId, owner) {
  const contact = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!contact) {
    throw new NotFoundError("Not found");
  }
  return {
    _id: contact._id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    favorite: contact.favorite,
  };
}

export async function addContact({ name, email, phone }, owner) {
  const contact = new Contact({ name, email, phone, owner });
  await contact.save();
  return {
    _id: contact._id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    favorite: contact.favorite,
  };
}

export async function updateContact(contactId, body, owner) {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { ...body },
    { new: true }
  );
  if (!contact) {
    return new NotFoundError("Not found");
  }

  return {
    _id: contact._id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    favorite: contact.favorite,
  };
}
