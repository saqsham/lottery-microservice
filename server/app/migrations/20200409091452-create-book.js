module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Books', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        twoDigit: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        threeDigit: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        fourDigit: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        sixInteger: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
    },
    { 
        freezeTableName: true,
    }),

  down: (queryInterface /*, Sequelize */) => 
    queryInterface.dropTable('Books')
};