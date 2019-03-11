require('dotenv').config();

module.exports = {
  CONNECT_STRING_FULL: process.env.MONGODB_CONNECT_STRING_WITHOUT_PWD.replace(
    '<password>',process.env.MONGODB_PASSWORD)
}