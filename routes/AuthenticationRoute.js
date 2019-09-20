const express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

// router
//   .route("/signup")
//   .get((req, res) => {
//     res.send("I am in GET signup");
//   })
//   .post(AuthenticationController.createUser);

router
  .route("/signin")
  .get((req, res) => {
    console.log(">" + JSON.stringify(req.body.login));
    res.send("I am in GET signin");
  })
  .post(passport.authenticate("local", { session: false }), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    const token = jwt.sign(
      {
        data: req.user.login
      },
      JWT_SIGN_SECRET,
      { expiresIn: 60 * 10 }
    );
    return res.send({
      login: req.user.login,
      token: token,
      message: "User sign in!"
    });
  });

module.exports = router;
