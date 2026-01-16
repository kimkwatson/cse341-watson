require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

// Start server function
async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.locals.db = client.db();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("MongoDB startup failed:", err.message);
  }
}

// Start server
startServer();

app.use("/contacts", require("./routes/contacts"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});