const ArtworkModel = require('../models/artwork.model');

const Artwork = class {
  static getAll(req, res) {
    ArtworkModel.find({})
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
  };

  static getById(req, res) {
    const id = req.params.id
    ArtworkModel.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Data not found with id: " + id
        });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
  };

  static create(req, res) {
    if(!req.body) {
      return res.status(400).send({
          message: "Data content can not be empty"
      });
    }

    const artwork = new ArtworkModel({
      name: req.body.name,
      age: req.body.age
    });

    artwork.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
          message: err.message
      });
    });

  }
};
// TODOS:
//   static getAll(max) {
//       static updateOne(id, name) {
//         static deleteOne(id) {

module.exports = Artwork;
