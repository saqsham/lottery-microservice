module.exports = (sequelize, DataTypes) => {
  const MoneyChart = sequelize.define('MoneyChart', {
    amountHeld: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 500,
    },
  })

  MoneyChart.associate = (models) => {
    MoenyChart.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
  }

  // placing bets
  MoneyChart.transactionBet = async (userId, betValue) => {
    try {
      let transaction = await MoneyChart
        .findByPk(userId)
        .then(function (users) {
          newValue1 = users.amountHeld - betValue
        })
        .catch(error => res.status(400).send(error))

      if (!transaction) {
        throw new Error('User not found')
      }

      if (newValue1 <= 0 || betValue <= 0) {
        throw new Error('Not sufficient funds')
      } else {
        let finalaction = await MoneyChart
          .update({
            amountHeld: newValue1
          }, {
            where: {
              userId: userId,
            }
          })
          .then(() => res.status(200).send('ok'))
          .catch(error => res.status(400).send(error))

        return finalaction
      }

    } catch (error) {
      console.error(error)
    }
  }

  // deleting bet
  // or win
  MoneyChart.transactionBetOnDelete = async (userId, betValue) => {
    try {
      let transaction = await MoneyChart
        .findByPk(userId)
        .then(function (users) {
          newValue2 = users.amountHeld + betValue
        })
        .catch(error => res.status(400).send(error))

      if (!transaction) {
        throw new Error('User not found')
      }

      if (newValue2 <= 0 || betValue <= 0) {
        throw new Error('Not sufficient funds')
      } else {
        let finalaction = await MoneyChart
          .update({
            amountHeld: newValue2
          }, {
            where: {
              userId: userId,
            }
          })
          .then(() => res.status(200).send('ok'))
          .catch(error => res.status(400).send(error))

        return finalaction
      }

    } catch (error) {
      console.error(error)
    }
  }

  // updating bets
  MoneyChart.transactionBetUpdate = async (userId, betValue, oldValue) => {
    try {
      let transaction = await MoneyChart
        .findByPk(userId)
        .then(function (users) {
          newValue3 = users.amountHeld - betValue + oldValue
        })
        .catch(error => res.status(400).send(error))

      if (!transaction) {
        throw new Error('User not found')
      }

      if (newValue3 <= 0 || betValue <= 0 || oldValue < 0) {
        throw new Error('Not sufficient funds')
      } else {
        let finalaction = await MoneyChart
          .update({
            amountHeld: newValue3
          }, {
            where: {
              userId: userId,
            }
          })
          .then(() => res.status(200).send('ok'))
          .catch(error => res.status(400).send(error))
        return finalaction
      }

    } catch (error) {
      console.error(error)
    }
  }

  return MoneyChart
}