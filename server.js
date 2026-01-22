var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

const mongodb = require("./db/connect");

app.use(express.json());
app.use('/', require('./routes'));

// Initialize MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});