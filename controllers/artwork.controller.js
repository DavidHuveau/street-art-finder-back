const ArtworkModel = require('../models/artwork.model');

const Artwork = class {
  // TODO add the max parameter
  static getAll(req, res) {
    ArtworkModel.find({})
    // .populate('country')
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
    .populate('country')
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
      userName: req.body.userName,
      adressStreet: req.body.adressStreet,
      zipCode: req.body.zipCode,
      city: req.body.city,
      description: req.body.description,
      photoFileName: req.body.photoFileName,
      country: req.body.country
    });

    artwork.save()
    .then(data => {
      res.status(201).send(data);
      // ArtworkModel.findById(data._id)
      // .populate('country')
      // .then(data => {
      //   res.status(201).send(data);
      // }).catch(err => {
      //   res.status(500).send({
      //     message: "Something wrong creating"
      //   });
      // })
    }).catch(err => {
      res.status(500).send({
          message: "Something wrong creating"
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
      userName: req.body.userName,
      adressStreet: req.body.adressStreet,
      zipCode: req.body.zipCode,
      city: req.body.city,
      description: req.body.description,
      photoFileName: req.body.photoFileName,
      isActivated: req.body.isActivated,
      isPublished:  req.body.isPublished,
      country: req.body.country
    }, {new: true})
    .populate('country')
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

  static delete(req, res) {
    const id = req.params.id;
    ArtworkModel.findByIdAndUpdate(id, {
      isActivated: false
    }, {new: true})
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found with id: " + id
        });
      }
      res.status(204).send();
    })
    .catch(err => {
      // format: /^[0-9a-fA-F]{24}$/
      if(err.kind === 'ObjectId') {
        return res.status(422).send({
            message: "ObjectId failed for: " + id
        });
      }
      res.status(500).send({
        message: "Something wrong  with id: " + id
      });
    });
  }

  static search(req, res) {
    let query = {};
    if (req.query.city) query.city = req.query.city;
    if (req.query.zipCode) query.zipCode = req.query.zipCode;
    if (req.query.adressStreet) query.adressStreet = { '$regex' : req.query.adressStreet, '$options' : 'i' };

    if(!Object.keys(query).length) {
      return res.status(400).send({
          message: "queries parameters (city/zipCode/adressStreet) not defined: " + JSON.stringify(req.query)
      });
    }

    ArtworkModel.find(query)
    // .populate('country')
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Data not found"
        });
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Something wrong searching"
      });
    });
  }
};

module.exports = Artwork;
