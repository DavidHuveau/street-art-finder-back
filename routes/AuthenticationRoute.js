const express = require('express');
const AuthenticationController = require('../controllers/AuthenticationController');

const router = express.Router();

router
  .route('/')
  .get(AuthenticationController.getAll)

module.exports = router;