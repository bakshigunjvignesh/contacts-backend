const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  putContact,
  deleteContact,
  getIdContact,
  addContact,
} = require("../controller/contactController");

router.route("/").get(getContact).post(addContact);

router
  .route("/:id")
  .post(createContact)
  .get(getIdContact)
  .put(putContact)
  .delete(deleteContact);

module.exports = router;
