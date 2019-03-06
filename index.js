const express = require("express");
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
// const mongoose = require("mongoose");

// const CONNECT_STRING_FULL = process.env.MONGODB_CONNECT_STRING_WITHOUT_PWD.replace(
//   '<PASSWORD>',process.env.MONGODB_PASSWORD);
const PORT = process.env.PORT;
const ROOT_API = process.env.ROOT_API;

// // specifies that the promises will be promises "full js" and not via bluebird
// mongoose.Promise = global.Promise;

// mongoose.connect(
//   CONNECT_STRING_FULL,
//   { useNewUrlParser: true }
// );

// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });

// const User = new mongoose.model("User", userSchema);

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.get(`${ROOT_API}/users`, (req, res) => {
  // User
  //   .find({})
  //   .then(data => {
  //     res.json(data);
  //   })
  //   .catch(err => console.log(err));
// });
app.use(`${ROOT_API}/artworks`, require("./routes/artworks"));
app.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});

app.listen(PORT, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`web server listening on port ${PORT}`);
});