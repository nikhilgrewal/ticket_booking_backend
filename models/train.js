module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('Train', {
      source: {
          type: DataTypes.STRING,
          allowNull: false
      },
      destination: {
          type: DataTypes.STRING,
          allowNull: false
      },
      seatsAvailable: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      }
  });
  return Train;
};
