const Sequelize = require('sequelize');

const sequelize = new Sequelize('hoaxify', 'my-db-user', 'db-p4ss', {
  dialect: 'sqlite', // As we are using sqlite as the DB
  storage: './database.sqlite',
  logging: false, // This will not log the the SQL queries executed in the server or while testing the Unit tests
});

module.exports = sequelize;
