module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pages', {
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
      hidden: {
        type: Sequelize.BOOLEAN
      },
      height: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      mime: {
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
    return queryInterface.dropTable('pages');
  }
};
