module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('refresh_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdByIp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      revoked: {
        type: Sequelize.DATE
      },
      revokedBy: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('refresh_tokens');
  }
};
