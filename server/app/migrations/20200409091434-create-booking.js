module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      betValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      userId: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          refrences: {
              model: 'Users',
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
    },
    { 
        freezeTableName: true,
    }),
  down: (queryInterface /*, Sequelize*/) => 
    queryInterface.dropTable('Bookings')
};