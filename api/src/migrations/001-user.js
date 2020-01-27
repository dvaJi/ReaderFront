module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      activated: {
        type: Sequelize.BOOLEAN
      },
      activatedToken: {
        type: Sequelize.TEXT
      },
      banned: {
        type: Sequelize.BOOLEAN
      },
      bannedReason: {
        type: Sequelize.TEXT
      },
      newPasswordToken: {
        type: Sequelize.TEXT
      },
      newPasswordRequested: {
        type: Sequelize.BOOLEAN
      },
      lastIp: {
        type: Sequelize.STRING
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
