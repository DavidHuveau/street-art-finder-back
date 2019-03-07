const dotenv = require('dotenv').config();

module.exports = {
  CONNECT_STRING_FULL: process.env.MONGODB_CONNECT_STRING_WITHOUT_PWD.replace(
    '<PASSWORD>',process.env.MONGODB_PASSWORD)
}