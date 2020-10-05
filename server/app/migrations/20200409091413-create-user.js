module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [1, 100]
        }
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true
        },
        set(val) {
          this.setDataValue('email', val.toLowerCase())
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 128]
        }
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      can_bet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
          ++ +
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
    queryInterface.dropTable('User')
}