const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const CONNECT_STRING_FULL = process.env.MONGODB_CONNECT_STRING_WITHOUT_PWD.replace(
  '<PASSWORD>',process.env.MONGODB_PASSWORD);

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

const User = new mongoose.model("User", userSchema);


const Artwork = class {
  static getAll() {
    return new Promise((resolve, reject) => {
      User
      .find({})
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  };
};

module.exports = Artwork;