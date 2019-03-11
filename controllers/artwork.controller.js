const ArtworkModel = require('../models/artwork.model');

const Artwork = class {
  // TODO add the max parameter
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
    const id = req.params.id;
    ArtworkModel.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id: " + id
        });
      }
      res.send(data);
    })
    .catch(err => {
      // format: /^[0-9a-fA-F]{24}$/
      if(err.kind === 'ObjectId') {
        return res.status(422).send({
            message: "ObjectId failed for: " + id
        });
      }
      res.status(500).send({
        message: "Something wrong retrieving with id: " + id
      });
    });
  };

  static create(req, res) {
    if(!Object.keys(req.body).length) {
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
      res.status(201).send(data);
    }).catch(err => {
      res.status(500).send({
          message: err.message
      });
    });
  }

  static update(req, res){
    if(!Object.keys(req.body).length) {
      return res.status(400).send({
          message: "Data content can not be empty"
      });
    }

    const id = req.params.id;
    ArtworkModel.findByIdAndUpdate(id, {
      name: req.body.name,
      age: req.body.age
    }, {new: true})
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id: " + id
        });
      }
      res.send(data);
    })
    .catch(err => {
      // format: /^[0-9a-fA-F]{24}$/
      if(err.kind === 'ObjectId') {
        return res.status(422).send({
            message: "ObjectId failed for: " + id
        });
      }
      res.status(500).send({
        message: "Something wrong updating with id: " + id
      });
    });
  }

  // TODO add delete function
  static delete(req, res) {

  }
};

module.exports = Artwork;
