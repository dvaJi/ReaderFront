module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'archives',
        'type',
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
      await queryInterface.removeColumn('archives', 'type', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
