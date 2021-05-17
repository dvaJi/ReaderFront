module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('archives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'chapters',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
      },
      filename: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      lastDownload: {
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
    return queryInterface.dropTable('archives');
  }
};
