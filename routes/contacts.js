const router = require("express").Router();
const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAllContacts);

// GET one contact by id
router.get("/single", contactsController.getContactById);

module.exports = router;