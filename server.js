const app = require('./app');
const database = require("./models/Database");

require("dotenv").config();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

database.connect()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
  });

app.listen(SERVER_PORT, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`web server listening on port ${SERVER_PORT}`);
});