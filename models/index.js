const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.users = require('./user')(sequelize, Sequelize);
db.trains = require('./train')(sequelize, Sequelize);
db.bookings = require('./booking')(sequelize, Sequelize);

module.exports = db;
