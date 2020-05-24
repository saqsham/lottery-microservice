module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('MoenyChart', {
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
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                refrences: {
                    model: 'User',
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
        }, {
            freezeTableName: true,
        }),

    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable('MoenyChart')
};