require('dotenv').config();

module.exports = {
  development: {
    url: process.env.MONGODB_URL_DEV
  },
  test: {
    url: process.env.MONGODB_URL_TEST
  },
  production: {
    url: process.env.MONGODB_URL_PROD
  }
};