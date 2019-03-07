const express = require("express");
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;
const ROOT_API = process.env.ROOT_API;

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const mongoose = require("mongoose");
const databaseConfig = require('./models/database.config');

// specifies that the promises will be promises "full js" and not via bluebird
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(
  databaseConfig.CONNECT_STRING_FULL,
  { useNewUrlParser: true }
).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
app.use(`${ROOT_API}/artworks`, require("./routes/artworks.route"));
app.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(SERVER_PORT, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`web server listening on port ${SERVER_PORT}`);
});