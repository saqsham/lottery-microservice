module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('MoenyCharts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amountHeld: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 500,
      },
      canBet: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        refrences: {
            model: 'Users',
            key: 'id',
            as: 'userId',
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
    },
    {
        freezeTableName: true,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('MoenyCharts')
};