'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'people_works',
      [
        {
          workId: 1,
          peopleId: 1,
          rol: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 1,
          peopleId: 1,
          rol: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('people_works', null, {});
  }
};
