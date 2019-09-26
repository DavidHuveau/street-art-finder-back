const app = require('./app');
require("dotenv").config();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(SERVER_PORT, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`web server listening on port ${SERVER_PORT}`);
});