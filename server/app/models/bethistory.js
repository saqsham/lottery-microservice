module.exports  = (sequelize, DataTypes) => {
    const BetHistory = sequelize.define('BetHistory', {
        
        betValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            }
        },

        betted_on: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            }
        },

        moneyWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        winNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        moneyLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              defaultValue: 0,
            }
        },

        is_win: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_delete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        birth: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        },
        {
            underscored: true,
            freezeTableName: true
        });

    BetHistory.associate = (models) => {
        
        BetHistory.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

  return BetHistory;
};