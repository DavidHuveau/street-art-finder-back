const express = require('express');
const CountryController = require('../controllers/CountryController');

const router = express.Router();

router
  .route('/')
  .get(CountryController.getAll)

module.exports = router;