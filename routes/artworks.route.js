const express = require('express');
const ArtworkController = require('../controllers/artwork.controller');

const router = express.Router();

router
  .route('/')
  .get(ArtworkController.getAll)
  .post(ArtworkController.create)
router
  .route('/:id')
  .get(ArtworkController.getById)
  .put(ArtworkController.update)

module.exports = router;