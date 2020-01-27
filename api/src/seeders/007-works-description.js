'use strict';

const params = require('../config/params');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'works_descriptions',
      [
        {
          workId: 1,
          language: params.global.languages.es.id,
          description: 'Descripción en español.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 1,
          language: params.global.languages.en.id,
          description: 'English description.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 2,
          language: params.global.languages.en.id,
          description:
            'Possessing both flexibility and tenacity, Imomushi (Japanese for Caterpillar) is an assassin that does not kill anyone but those who are assigned to her. She seems to have had something happen between her and her older sister in the past, however.',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('works_descriptions', null, {});
  }
};
