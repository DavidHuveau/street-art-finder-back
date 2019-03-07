const ArtworkModel = require('../models/artwork.model');

const Artwork = class {
  static getAll(req, res) {
    ArtworkModel.getAll()
      .then(result => res.json(result))
      .catch(err => res.json(err.message));
  }
};
// static getById(id) {
//   static getAll(max) {
//     static create(name) {
//       static updateOne(id, name) {
//         static deleteOne(id) {

module.exports = Artwork;
