const express = require("express");
const app = express();
require("dotenv").config();

require("./startUp/db")();
require("./startUp/config")();
require("./startUp/routes")(app);
require("./startUp/prod")(app);

const port = process.env.PORT || 4500;
const server = app.listen(port, () => {
  console.log(`Listning on Port : ${port} `);
});

module.exports = server;
