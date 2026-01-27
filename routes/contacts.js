const router = require("express").Router();
const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAllContacts);

// GET one contact by id
router.get("/:id", contactsController.getContactById);

// CREATE new contact
router.post("/", contactsController.createContact);

// UPDATE contact by id
router.put("/:id", contactsController.updateContact);

// DELETE contact by id
router.delete("/:id", contactsController.deleteContact);

module.exports = router;