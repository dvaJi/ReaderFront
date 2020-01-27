module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      type: {
        type: Sequelize.STRING
      },
      demographicId: {
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      statusReason: {
        type: Sequelize.STRING
      },
      adult: {
        type: Sequelize.BOOLEAN
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      visits: {
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
    return queryInterface.dropTable('works');
  }
};
