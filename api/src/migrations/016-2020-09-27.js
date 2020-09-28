module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'works',
        'licensed',
        {
          type: Sequelize.DataTypes.BOOLEAN
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
      await queryInterface.removeColumn('works', 'licensed', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
