const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
}, {
  timestamps: true
});

const UserModel = mongoose.model("User", userSchema);
console.log("User", JSON.stringify(UserModel));

const Artwork = class {
  static getAll() {
    return new Promise((resolve, reject) => {
      UserModel
      .find({})
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  };
};

module.exports = Artwork;