module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      trainId: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  });
  return Booking;
};
