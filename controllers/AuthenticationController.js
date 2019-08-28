const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const User = class {
  static createUser(req, res) {
    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        message: "Data content can not be empty"
      });
    } else {
      const { login, password } = req.body;
      // console.log(login, password);

      if (!login || !password) {
        return res.status(400).send({
          message: "Missing fields in the body: login or password"
        });
      } else {
        const hash = bcrypt.hashSync(password, 10);
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
            console.log(err.code);
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
    }
  }
};

module.exports = User;
