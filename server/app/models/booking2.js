
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
        is_open: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    });

    Booking2.associate = (models) => {
        // User.hasMany(models.BetHistory, {
        //     foreignKey: 'twoDigit',
        //     as: 'userBet',
        // }),

        Booking.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    Booking2.calculate = async () => {
        try {
            let countmin = await Booking2.findAll({
                attributes: { include: [[sequelize.fn('COUNT', sequelize.col('oneDigit'))]]},
                limit: 1,
            });
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

    Booking2.checkBet = async (userId, oneDigit) => {
        try {
            let check = await Booking2
            .findOne({
                where: {
                    userId: userId,
                    oneDigit: oneDigit,
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

