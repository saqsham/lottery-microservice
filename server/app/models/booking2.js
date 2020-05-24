module.exports = (sequelize, DataTypes) => {
    const Booking2 = sequelize.define('Booking2', {
        twoDigit: {
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
    });

    Booking2.associate = (models) => {
        Booking.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    Booking2.calculate = async () => {
        try {
            let countmin = await Money.findAll({
                attributes: [
                    ['twoDigit', 'twoDigit'],
                    [sequelize.fn('COUNT', sequelize.col('twoDigit')), 'n_first']
                ],
                group: 'twoDigit',
                raw: true
            })
            return countmin
        } catch (error) {
            console.error(error);
        }

    }

    Booking2.totalMoney = async () => {
        try {
            let totalMoney = await Booking2.sum('betValue')
            return totalMoney
        } catch (error) {
            console.error(error);
        }
    }

    Booking2.checkBet = async (userId, twoDigit) => {
        try {
            let check = await Booking2
                .findOne({
                    where: {
                        userId: userId,
                        twoDigit: twoDigit,
                    }
                });
            if (!check) {
                return true
            } else {
                throw new Error("Bet is already placed")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return Booking2;
};