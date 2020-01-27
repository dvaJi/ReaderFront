module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
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
        allowNull: false
      },
      uniqid: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      stub: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      sticky: {
        type: Sequelize.BOOLEAN
      },
      content: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.INTEGER
      },
      thumbnail: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('posts');
  }
};
