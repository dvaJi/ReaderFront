module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('peoples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      name_kanji: {
        type: Sequelize.STRING
      },
      stub: {
        type: Sequelize.STRING
      },
      uniqid: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('peoples');
  }
};
