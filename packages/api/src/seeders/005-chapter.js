'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'chapters',
      [
        {
          workId: 1,
          chapter: 1,
          subchapter: 0,
          volume: 0,
          language: 2,
          name: 'First Chapter',
          stub: 'first_chapter',
          uniqid: 'ba22f580-df84-4704-bf16-1051486cbbbd',
          hidden: false,
          description: null,
          thumbnail: null,
          releaseDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('chapters', null, {});
  }
};
