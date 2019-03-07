const express = require('express');
const ArtworkController = require('../controllers/artwork.controller');

const router = express.Router();

router
  .route('/')
  .get(ArtworkController.getAll)

module.exports = router;