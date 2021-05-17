module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chapters', {
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
      chapter: {
        type: Sequelize.INTEGER
      },
      subchapter: {
        type: Sequelize.INTEGER
      },
      volume: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      stub: {
        type: Sequelize.STRING
      },
      uniqid: {
        type: Sequelize.STRING
      },
      hidden: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.TEXT
      },
      releaseDate: {
        allowNull: false,
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
    return queryInterface.dropTable('chapters');
  }
};
