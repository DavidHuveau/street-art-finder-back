const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const passport = require("passport");
require("./passport");
require("dotenv").config();

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// sanitizes user-supplied data to prevent MongoDB Operator Injection
// Replace prohibited characters with _
app.use(mongoSanitize({ replaceWith: '_' }));

const ROOT_API = process.env.ROOT_API;
app.use(`${ROOT_API}/artworks`, require("./routes/ArtworksRoute"));
app.use(`${ROOT_API}/countries`, require("./routes/CountriesRoute"));
app.use(`${ROOT_API}/public`, express.static("public"));
app.use(
  `${ROOT_API}/proposals`,
  passport.authenticate("jwt", { session: false }),
  require("./routes/ProposalsRoute")
);
app.use(`${ROOT_API}/auth`, require("./routes/AuthenticationRoute"));
app.use((req, res) => {
  res.status(404).send("Sorry cant find that!");
});

module.exports = app;
