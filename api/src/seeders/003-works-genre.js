'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'works_genres',
      [
        {
          workId: 2,
          genreId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 2,
          genreId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 2,
          genreId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('works_genres', null, {});
  }
};
