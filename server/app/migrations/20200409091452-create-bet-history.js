module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BetHistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      betValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

      betted_on: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

      moneyWon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      winNum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      moneyLost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          defaultValue: 0,
        }
      },

      is_win: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      is_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      birth: {
        type: Sequelize.STRING,
        defaultValue: null,
      },

      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        refrences: {
          model: 'User',
          key: 'id',
          as: 'bookingBy',
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }, {
      underscored: true,
      freezeTableName: true,
    }),

  down: (queryInterface /*, Sequelize */ ) =>
    queryInterface.dropTable('BetHistory')
}