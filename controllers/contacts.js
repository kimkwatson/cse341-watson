const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

// get all contacts
const getAllContacts = async (req, res) => {
    try {
      const db = mongodb.getDb().db();
      const contactsCollection = db.collection("contacts");

      const contacts = await contactsCollection.find({}).toArray();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// get one contact by id
const getContactById = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contactsCollection = db.collection("contacts");

    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Missing id route parameter" });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }

    const contact = await contactsCollection.findOne({
      _id: new ObjectId(id)
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create new contact
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const db = mongodb.getDb().db();
    const contactsCollection = db.collection("contacts");
    const response = await contactsCollection.insertOne(contact);
    return res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update contact by id
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json(response.error || 'Some error occurred while updating the contact.');
  }
};

// delete contact by id
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection("contacts").deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };