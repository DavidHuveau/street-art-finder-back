const Artwork = require('../models/Artwork');

const Artworks = class {
  static getAll(req, res) {
    Artwork.getAll()
      .then(result => res.json(result))
      .catch(err => res.json(err.message));
  }
};

module.exports = Artworks;
