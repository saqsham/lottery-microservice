module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Booking1', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            oneDigit: {
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
            amountWon: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
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
            freezeTableName: true,
        }),
    down: (queryInterface /*, Sequelize*/ ) =>
        queryInterface.dropTable('Booking1')
};