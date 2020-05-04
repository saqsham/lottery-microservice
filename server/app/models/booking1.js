module.exports = (sequelize, DataTypes) => {
    const Booking1 = sequelize.define('Booking1', {
        oneDigit: {
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
        },
        birth: {
            type: DataTypes.STRING,
            defaultValue: null,
        }
    });

    Booking1.associate = (models) => {
        // User.hasMany(models.BetHistory, {
        //     foreignKey: 'oneDigit',
        //     as: 'userBet',
        // }),

        Booking.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    Booking1.calculate = async () => {
        try {
            let countmin = await Money.findAll({
                attributes: [
                  ['oneDigit', 'oneDigit'], 
                  [sequelize.fn('COUNT', sequelize.col('oneDigit')), 'n_first']
                ],
                group: 'oneDigit',
                raw: true
              })
              return countmin
        } catch (error) {
            console.error(error);
        }

    }

    Booking1.totalMoney = async () => {
        try {
            let totalMoney = await Booking1.sum('betValue')
            return totalMoney
        } catch (error) {
            console.error(error);
        }
    }

    Booking1.checkBet = async (userId, oneDigit) => {
        try {
            let check = await Booking1
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

    return Booking1;
};

