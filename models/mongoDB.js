const mongoose = require("mongoose");
require("dotenv").config();
const databaseConfig = require("./DatabaseConfig");

const ENV = process.env.NODE_ENV || "development";
const config = databaseConfig[ENV];

module.exports = {
  connect: () => {
    // specifies that the promises will be promises "full js" and not via bluebird
    mongoose.Promise = global.Promise;
    mongoose
      .connect(config.url, { useNewUrlParser: true })
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });
  },
  disconnect: done => {
    mongoose.disconnect(done);
  }
};
