const mongoose = require("mongoose");
require("dotenv").config();
const databaseConfig = require("./DatabaseConfig");

const ENV = process.env.NODE_ENV || "development";
const config = databaseConfig[ENV];

module.exports = {
  connect: () => {
    // specifies that the promises will be promises "full js" and not via bluebird
    mongoose.Promise = global.Promise;
    return mongoose.connect(config.url, {
      useNewUrlParser: true
    });
  },
  disconnect: done => {
    mongoose.disconnect(done);
  }
};
