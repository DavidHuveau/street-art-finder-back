const UserModel = require("../models/UserModel");

const User = class {
  static getAll(req, res) {
    UserModel.find({})
      .then(data => res.send(data))
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  }
};

module.exports = User;
