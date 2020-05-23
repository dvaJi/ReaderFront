module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'works',
        'language',
        {
          type: Sequelize.DataTypes.INTEGER
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'works',
        'description',
        {
          type: Sequelize.DataTypes.STRING
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('works', 'language', { transaction });
      await queryInterface.removeColumn('works', 'description', {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
