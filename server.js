const mongoose = require("mongoose");
const databaseConfig = require("./models/DatabaseConfig");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const passport = require("passport");
require("./passport");

require("dotenv").config();
const SERVER_PORT = process.env.SERVER_PORT;
const ROOT_API = process.env.ROOT_API;
const ENV = process.env.NODE_ENV || 'development';
const CONFIG = databaseConfig[ENV];

// specifies that the promises will be promises "full js" and not via bluebird
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(CONFIG.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");

    const app = express();
    app.disable('x-powered-by');
    app.use(cors());
    app.use(morgan("dev"));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    // sanitizes user-supplied data to prevent MongoDB Operator Injection
    // Replace prohibited characters with _
    app.use(mongoSanitize({ replaceWith: '_' }));
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

    app.listen(SERVER_PORT, err => {
      if (err) {
        throw new Error("Something bad happened...");
      }
      console.log(`web server listening on port ${SERVER_PORT}`);
    });
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

