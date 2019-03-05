const express = require("express");
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");

const CONNECT_STRING_FULL = process.env.MONGODB_CONNECT_STRING_WITHOUT_PWD.replace(
  '<PASSWORD>',process.env.MONGODB_PASSWORD);
const PORT = process.env.PORT;

// specifies that the promises will be promises "full js" and not via bluebird
mongoose.Promise = global.Promise;

mongoose.connect(
  CONNECT_STRING_FULL,
  { useNewUrlParser: true }
);

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Users = new mongoose.model("User", userSchema);

app.use(morgan('dev'));
app.get('/', (req, res) => {
  Users
    .find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});

app.listen(PORT, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`web server listening on port ${PORT}`);
});