module.exports = (sequelize, DataTypes) => {
  const BookingChart = sequelize.define('BookingChart', {
    is_game1: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_game2: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_game2: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    mul_for_game1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4
    },
    mul_for_game2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    mul_for_game3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    time_for_game1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4
    },
    time_for_game2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4
    },
    time_for_game3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4
    },
    pre_winNum_game1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pre_winNum_game2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pre_winNum_game3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

  }, {
    freezeTableName: true,
  })

  return BookingChart
}