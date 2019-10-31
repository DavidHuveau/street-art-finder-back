const ArtworkModel = require("../models/ArtworkModel");
const convertAdressToGpsCoordonates = require("../tools/Coordonates");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);
const fs = require('fs');
require("dotenv").config();
const publishPhoto = require("../tools/post-intagram");

const ENV = process.env.NODE_ENV || "development";

const Artwork = class {
  static getAll(req, res) {
    ArtworkModel.find({})
      .then(data => {
        const response = {
          artworks: [...data]
        };
        res.send(response);
      })
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
        const response = {
          artworks: [...data]
        };
        res.send(response);
      })
      .catch(err => {
        // format: /^[0-9a-fA-F]{24}$/
        if (err.kind === "ObjectId") {
          return res.status(422).send({
            message: "ObjectId failed for: " + id
          });
        }
        // console.log(err);
        res.status(500).send({
          message: "Something wrong retrieving with id: " + id
        });
      });
  }

  static getPoposals(req, res) {
    let query = {};
    query.isActivated = true;
    query.isPublished = false;

    ArtworkModel.find(query)
      .then(data => {
        const response = {
          artworks: [...data]
        };
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message
        });
      });
  }

  static create(req, res) {
    const { file, photoFileName } = req;
    // console.debug(file);
    // console.debug(`>photoFileName : ${photoFileName}`);

    if (req.fileValidationError) {
      return res.status(400).send({
        message: req.fileValidationError
      });
    }

    if (!file) {
      return res.status(400).send({
        message: "Please provide an image"
      });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        message: "Data content can not be empty"
      });
    }

    const userName = DOMPurify.sanitize(req.body.userName);
    const city = DOMPurify.sanitize(req.body.city);
    const zipCode = DOMPurify.sanitize(req.body.zipCode);
    const adressStreet = DOMPurify.sanitize(req.body.adressStreet);
    const countryCode = DOMPurify.sanitize(req.body.countryCode);
    const description = DOMPurify.sanitize(req.body.description);
    const country = DOMPurify.sanitize(req.body.country);
    const artistName = DOMPurify.sanitize(req.body.artistName);
    if (!city || !zipCode || !adressStreet || !countryCode) {
      return res.status(400).send({
        message:
        "Missing fields in the body: city or zipCode or adressStreet or countryCode"
      });
    }

    const queryString = `${adressStreet}, ${zipCode}, ${city}`;
    const queryCountryCode = countryCode;
    convertAdressToGpsCoordonates(queryCountryCode, queryString)
      .then(data => {
        const artwork = new ArtworkModel({
          userName: userName,
          artistName: artistName,
          adressStreet: adressStreet,
          zipCode: zipCode,
          city: city,
          description: description,
          photoFileName: photoFileName,
          country: country,
          location: {
            type: "Point",
            coordinates: [data.lat, data.lng]
          }
        });

        artwork
          .save()
          .then(data => {
            const response = {
              artworks: [data]
            };
            res.status(201).send(response);
          })
          .catch(err => {
            // console.log(err);
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
  // static update(req, res) {
  //   if (!Object.keys(req.body).length) {
  //     return res.status(400).send({
  //       message: "Data content can not be empty"
  //     });
  //   }

  //   const { id } = req.params;

  //   ArtworkModel.findByIdAndUpdate(
  //     id,
  //     {
  //       userName: req.body.userName,
  //       adressStreet: req.body.adressStreet,
  //       zipCode: req.body.zipCode,
  //       city: req.body.city,
  //       description: req.body.description,
  //       photoFileName: req.body.photoFileName,
  //       isActivated: req.body.isActivated,
  //       isPublished: req.body.isPublished,
  //       country: req.body.country,
  //       location: req.body.location
  //     },
  //     { new: true }
  //   )
  //     .populate("country", "name")
  //     .then(data => {
  //       if (!data) {
  //         return res.status(404).send({
  //           message: "Data not found with id: " + id
  //         });
  //       }
  //       const response = {
  //         artworks: [data]
  //       };
  //       res.send(response);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       // format: /^[0-9a-fA-F]{24}$/
  //       if (err.kind === "ObjectId") {
  //         return res.status(422).send({
  //           message: "ObjectId failed for: " + id
  //         });
  //       }
  //       res.status(500).send({
  //         message: "Something wrong updating with id: " + id
  //       });
  //     });
  // }

  // static delete(req, res) {
  //   const id = req.params.id;

  //   ArtworkModel.findByIdAndUpdate(
  //     id,
  //     {
  //       isActivated: false
  //     },
  //     { new: true }
  //   )
  //     .then(data => {
  //       if (!data) {
  //         return res.status(404).send({
  //           message: "Data not found with id: " + id
  //         });
  //       }
  //       res.status(204).send();
  //     })
  //     .catch(err => {
  //       // format: /^[0-9a-fA-F]{24}$/
  //       if (err.kind === "ObjectId") {
  //         return res.status(422).send({
  //           message: "ObjectId failed for: " + id
  //         });
  //       }
  //       res.status(500).send({
  //         message: "Something wrong  with id: " + id
  //       });
  //     });
  // }

  // TODO: add an optional parameter for precision search (maxDistance)
  static searchByCity(req, res) {
    if (!Object.keys(req.query).length) {
      return res.status(400).send({
        message: "query string can not be empty"
      });
    }

    const { city, countryCode } = req.query;
    if (!city || !countryCode) {
      return res.status(400).send({
        message: "Missing fields in the query: city or countryCode"
      });
    }

    const queryString = city;
    const queryCountryCode = countryCode;
    let gpsCoordonates = [];
    convertAdressToGpsCoordonates(queryCountryCode, queryString)
      .then(data => {
        gpsCoordonates = [data.lat, data.lng];
        ArtworkModel.find({
          isPublished: true,
          isActivated: true,
          location: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: gpsCoordonates
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
            const response = {
              startPosition: gpsCoordonates,
              artworks: [...data]
            };
            res.send(response);
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

  // static search(req, res) {
  //   let query = {};
  //   if (req.query.city) query.city = req.query.city;
  //   if (req.query.zipCode) query.zipCode = req.query.zipCode;
  //   if (req.query.adressStreet)
  //     query.adressStreet = { $regex: req.query.adressStreet, $options: "i" };

  //   if (!Object.keys(query).length) {
  //     return res.status(400).send({
  //       message:
  //         "queries parameters (city/zipCode/adressStreet) not defined: " +
  //         JSON.stringify(req.query)
  //     });
  //   }

  //   ArtworkModel.find(query)
  //     .then(data => {
  //       if (!data) {
  //         return res.status(404).send({
  //           message: "Data not found"
  //         });
  //       }
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Something wrong searching"
  //       });
  //     });
  // }

  static updatePublished(req, res, isValidate) {
    const id = req.params.id;

    ArtworkModel.findByIdAndUpdate(
      id,
      {
        isActivated: isValidate,
        isPublished: isValidate
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
        const { photoFileName, adressStreet, zipCode, city, country } = data;
        if (photoFileName.length > 0) {
          // if(ENV === "production") {
          if(ENV === "development") {
            const caption = `${adressStreet}, ${zipCode}, ${city} (${country.name.toUpperCase()}) #streetart`;
            const path = `public/${ENV}/artworks/${data.photoFileName}`;
            // console.log(">>" + path);
            // console.log(caption);
            publishPhoto(path, caption);
          }
          const fileToDeleteInTmpFolder = `./tmp/${data.photoFileName.split(".")[0]}`;
          fs.stat(fileToDeleteInTmpFolder, (err, stats) => {
            if (!err) {
              fs.unlink(fileToDeleteInTmpFolder, () => {});
            }
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
};

module.exports = Artwork;
