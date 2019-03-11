const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// // Create the User Schema.
// const UserSchema = new Schema({
//   id: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   }
// });

// const User = mongoose.model("User", UserSchema);

// export default User;


module.exports = mongoose.model("User", userSchema);