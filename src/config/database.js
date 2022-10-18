const Sequelize = require('sequelize');
const config = require('config');

const dbConfig = config.get('database');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect, // As we are using sqlite as the DB
    storage: dbConfig.storage,
    logging: dbConfig.logging, // This will not log the the SQL queries executed in the server or while testing the Unit tests
  }
);

module.exports = sequelize;
