module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('BookingChart', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            is_game1: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_game2: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_game2: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            mul_for_game1: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 4
            },
            mul_for_game2: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 10
            },
            mul_for_game3: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 100
            },
            time_for_game1: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 4
            },
            time_for_game2: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 4
            },
            time_for_game3: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 4
            },
            pre_winNum_game1: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            pre_winNum_game2: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            pre_winNum_game3: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
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

    down: (queryInterface /*, Sequelize */ ) =>
        queryInterface.dropTable('BookingChart')
};