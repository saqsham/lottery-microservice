module.exports  = (sequelize, DataTypes) => {
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
        });
    };

    // placing bets
    MoneyChart.transactionBet = async (userId, betValue) => {
        try {
            let transaction = await MoneyChart
            .findByPk(userId)
            .then(function (users) {
                newValue = users.amountHeld - betValue
            })
            .catch(error => res.status(400).send(error));

            if (!transaction) {
                throw new Error('User not found')
            }

            let finalaction = await MoneyChart
            .update({
                amountHeld: newValue
            }, {
                where: { userId: userId, }
            })
            .then(() => res.status(200).send('ok'))
            .catch(error => res.status(400).send(error));

            return finalaction

        } catch (error) {
            console.error(error);
        } 
    }

    // deleting bet
    MoneyChart.transactionBetOnDelete = async (userId, betValue) => {
        try {
            let transaction = await MoneyChart
            .findByPk(userId)
            .then(function (users) {
                newValue = users.amountHeld + betValue
            })
            .catch(error => res.status(400).send(error));

            if (!transaction) {
                throw new Error('User not found')
            }

            let finalaction = await MoneyChart
            .update({
                amountHeld: newValue
            }, {
                where: { userId: userId, }
            })
            .then(() => res.status(200).send('ok'))
            .catch(error => res.status(400).send(error));

            return finalaction

        } catch (error) {
            console.error(error);
        } 
    }

    // updating bets
    MoneyChart.transactionBetUpdate = async (userId, betValue, oldValue) => {
        try {
            let transaction = await MoneyChart
            .findByPk(userId)
            .then(function (users) {
                newValue = users.amountHeld - betValue + oldValue
            })
            .catch(error => res.status(400).send(error));
            
            if (!transaction) {
                throw new Error('User not found')
            }

            let finalaction = await MoneyChart
            .update({
                amountHeld: newValue
            }, {
                where: { userId: userId, }
            })
            .then(() => res.status(200).send('ok'))
            .catch(error => res.status(400).send(error));

            return finalaction

        } catch (error) {
            console.error(error);
        } 
    }

  return MoneyChart;
};