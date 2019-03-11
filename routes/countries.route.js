const express = require('express');
const CountryController = require('../controllers/country.controller');

const router = express.Router();

router
  .route('/')
  .get(CountryController.getAll)

module.exports = router;