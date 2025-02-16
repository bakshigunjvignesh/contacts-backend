const asyncHandler = require("express-async-handler");
const Contact = require("../models/contectModels");

// @Desc Get all the contact
// @Access Public
// @Route GET /api/contacts
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  if (!contact) {
    throw new Error("No contact found");
  } else {
    res.status(200).json(contact);
    console.log(contact);
  }
});

// @Desc Get ID from the contact
// @Access Public
// @Route GET /api/contacts/:id
const getIdContact = asyncHandler(async (req, res) => {
  const id = await Contact.findById(req.params.id);
  if (!id) {
    throw new Error("No contact found");
  }
  res.status(200).json(id);
});

// @Desc Create a new contact
// @Access Public
// @Route POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create a contact" });
});

// @Desc Add a new contact
// @Access Public
// @Route POST /api/contacts
const addContact = asyncHandler(async (req, res) => {
  console.log("req", req);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  } else {
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
    res.status(200).json({ message: "Contact Added", data: contact });
  }
});

// @Desc Deletes the contact
// @Access Public
// @Route DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const id = await Contact.findByIdAndDelete(req.params.id);
  if (!id) {
    throw new Error("No contact found");
  } else {
    res.status(200).json({ message: "Contact deleted", data: id });
  }
});

// @Desc Puts the contact
// @Access Public
// @Route PUT /api/contacts/:id
const putContact = asyncHandler(async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedContact) {
    res.status(404);
    throw new Error("Contact not found");
  } else {
    res.status(200).json({ message: "Contact deleted", data: updatedContact });
  }
});

module.exports = {
  getContact,
  addContact,
  getIdContact,
  createContact,
  deleteContact,
  putContact,
};
