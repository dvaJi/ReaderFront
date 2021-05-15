module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('people_works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'works',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
      },
      peopleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'peoples',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
      },
      rol: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('people_works');
  }
};
