module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'archives',
        'count',
        {
          type: Sequelize.DataTypes.INTEGER
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'archives',
        'exist',
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
      await queryInterface.removeColumn('archives', 'count', { transaction });
      await queryInterface.removeColumn('archives', 'exist', {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
