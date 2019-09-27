const app = require('./app');
const mongoDB = require("./models/mongoDB");

require("dotenv").config();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

// Connecting to the database
mongoDB.connect();

app.listen(SERVER_PORT, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`web server listening on port ${SERVER_PORT}`);
});