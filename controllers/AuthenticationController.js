const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const User = class {
  static createUser(req, res) {
    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        message: "Data content can not be empty"
      });
    }

    const { login, plaintextPassword } = req.body;
    // console.log(login, plaintextPassword);
    if (!login || !plaintextPassword) {
      return res.status(400).send({
        message: "Missing fields in the body: login or password"
      });
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(plaintextPassword, salt);
    const newUser = new UserModel({
      login: login,
      password: hash
    });

    newUser
      .save()
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        // console.log(err.code);
        if (err.code === 11000) {
          return res.status(422).send({
            message: "Duplicate login: " + login
          });
        }
        res.status(500).send({
          message: "Something wrong creating"
        });
      });
  }

  static getUserForLocalStrategy(login) {
    return UserModel.findOne({ login: login });
  }
};

module.exports = User;
