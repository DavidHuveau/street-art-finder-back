const ArtworkModel = require("../models/artwork.model");
const convertAdressToGpsCoordonates = require("./coordonates.functions");

const Artwork = class {

  static getAll(req, res) {
    ArtworkModel.find({})
      .then(data => res.send(data))
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  }

  static getById(req, res) {
    const { id } = req.params;

    ArtworkModel.find({ _id: id })
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
        if (err.kind === "ObjectId") {
          return res.status(422).send({
            message: "ObjectId failed for: " + id
          });
        }
        res.status(500).send({
          message: "Something wrong retrieving with id: " + id
        });
      });
  }

  // TODO: use async/await
  static create(req, res) {
    let queryString = "";
    let queryCountryCode = "";

    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        message: "Data content can not be empty"
      });
    } else {
      const { city, zipCode, adressStreet, countryCode } = req.body;

      if (!city || !zipCode || !adressStreet || !countryCode) {
        return res.status(400).send({
          message:
            "Missing fields in the body: city or zipCode or adressStreet or countryCode"
        });
      } else {
        queryString = `${adressStreet}, ${zipCode}, ${city}`;
        queryCountryCode = countryCode;
      }
    }

    convertAdressToGpsCoordonates(queryCountryCode, queryString)
      .then(data => {
        const artwork = new ArtworkModel({
          userName: req.body.userName,
          adressStreet: req.body.adressStreet,
          zipCode: req.body.zipCode,
          city: req.body.city,
          description: req.body.description,
          photoFileName: req.body.photoFileName,
          country: req.body.country,
          location: {
            type: "Point",
            coordinates: [data.lng, data.lat]
          }
        });

        artwork
          .save()
          .then(data => {
            res.status(201).send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Something wrong creating"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: err.message
        });
      });
  }

  // TODO: populate with the middleware for findByIdAndUpdate
  static update(req, res) {
    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        message: "Data content can not be empty"
      });
    }

    const { id } = req.params;

    ArtworkModel
      .findByIdAndUpdate(
        id,
        {
          userName: req.body.userName,
          adressStreet: req.body.adressStreet,
          zipCode: req.body.zipCode,
          city: req.body.city,
          description: req.body.description,
          photoFileName: req.body.photoFileName,
          isActivated: req.body.isActivated,
          isPublished: req.body.isPublished,
          country: req.body.country,
          location: req.body.location
        },
        { new: true }
      )
      .populate("country", "name")
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
        if (err.kind === "ObjectId") {
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

    ArtworkModel.findByIdAndUpdate(
      id,
      {
        isActivated: false
      },
      { new: true }
    )
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
        if (err.kind === "ObjectId") {
          return res.status(422).send({
            message: "ObjectId failed for: " + id
          });
        }
        res.status(500).send({
          message: "Something wrong  with id: " + id
        });
      });
  }

  // TODO: add an optional parameter for precision search (maxDistance)
  static searchByCity(req, res) {
    let queryString = "";
    let queryCountryCode = "";

    if (!Object.keys(req.query).length) {
      return res.status(400).send({
        message: "query string can not be empty"
      });
    } else {
      const { city, countryCode } = req.query;
      if (!city || !countryCode) {
        return res.status(400).send({
          message: "Missing fields in the query: city or countryCode"
        });
      } else {
        queryString = city;
        queryCountryCode = countryCode;
      }
    }

    convertAdressToGpsCoordonates(queryCountryCode, queryString)
      .then(data => {
        ArtworkModel.find({
          location: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [data.lng, data.lat]
              },
              $maxDistance: 10000
            }
          }
        })
          .then(data => {
            if (!data) {
              return res.status(404).send({
                message: "Coordonates not found"
              });
            }
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Something wrong searching"
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: err.message
        });
      });
  }

  static search(req, res) {
    let query = {};
    if (req.query.city) query.city = req.query.city;
    if (req.query.zipCode) query.zipCode = req.query.zipCode;
    if (req.query.adressStreet)
      query.adressStreet = { $regex: req.query.adressStreet, $options: "i" };

    if (!Object.keys(query).length) {
      return res.status(400).send({
        message:
          "queries parameters (city/zipCode/adressStreet) not defined: " +
          JSON.stringify(req.query)
      });
    }

    ArtworkModel.find(query)
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
