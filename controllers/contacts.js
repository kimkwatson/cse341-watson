const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
    try {
    const db = req.app.locals.db;
    const contactsCollection = db.collection("contacts");

    const contacts = await contactsCollection.find({}).toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contactsCollection = db.collection("contacts");

    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: "Missing id query parameter" });
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

module.exports = { getAllContacts, getContactById };