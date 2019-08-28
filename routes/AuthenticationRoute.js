const express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");

const router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    res.send("I am in GET signup");
  })
  .post(AuthenticationController.createUser);

module.exports = router;
