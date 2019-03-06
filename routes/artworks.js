const express = require('express');
const router = express.Router();
const Artworks = require('../controllers/Artworks');

router
  .route('/')
  .get(Artworks.getAll)

module.exports = router;