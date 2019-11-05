const CountryModel = require("../models/CountryModel");

const Country = class {
  static getAll(req, res) {
    CountryModel.find({})
      .then(data => res.send(data))
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
};

module.exports = Country;
