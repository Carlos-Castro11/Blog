const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "root", "cf14121976", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
