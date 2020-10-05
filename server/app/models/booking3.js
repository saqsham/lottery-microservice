module.exports = (sequelize, DataTypes) => {
  const Booking3 = sequelize.define('Booking3', {
    sixDigit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    betValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    amountWon: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    birth: {
      type: DataTypes.STRING,
      defaultValue: null,
    }
  })

  Booking3.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
  }

  Booking3.calculate = async () => {
    try {
      let countmin = await Money.findAll({
        attributes: [
          ['sixDigit', 'sixDigit'],
          [sequelize.fn('COUNT', sequelize.col('sixDigit')), 'n_first']
        ],
        group: 'sixDigit',
        raw: true
      })
      return countmin
    } catch (error) {
      console.error(error)
    }

  }

  Booking3.totalMoney = async () => {
    try {
      let totalMoney = await Booking3.sum('betValue')
      return totalMoney
    } catch (error) {
      console.error(error)
    }
  }

  Booking3.checkBet = async (userId, sixDigit) => {
    try {
      let check = await Booking3
        .findOne({
          where: {
            userId: userId,
            sixDigit: sixDigit,
          }
        })
      if (!check) {
        return true
      } else {
        throw new Error("Bet is already placed")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return Booking3
}