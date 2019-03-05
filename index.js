const dotenv = require('dotenv').config();
const mongoose = require("mongoose");

const CONNECT_STRING_FULL = process.env.MONGODB_CONNECT_STRING_WITHOUT_PWD.replace(
  '<PASSWORD>',process.env.MONGODB_PASSWORD);

mongoose.connect(
  CONNECT_STRING_FULL,
  { useNewUrlParser: true }
);

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// spécifie que les promesses seront des promesse "pure js" et non pas via bluebird
mongoose.Promise = global.Promise;

//pour lier une collection avec le schema
const userModel = new mongoose.model("User", userSchema);

userModel
  .find({})
  .then(data => console.log(data))
  .catch(err => console.log(err));
