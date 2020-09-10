'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'works_genres',
      [
        {
          workId: 1,
          genreId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 1,
          genreId: 19,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 1,
          genreId: 22,
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
