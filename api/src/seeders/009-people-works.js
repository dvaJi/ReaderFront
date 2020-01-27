'use strict';

const params = require('../config/params');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'people_works',
      [
        {
          workId: 1,
          peopleId: 1,
          rol: params.works.roles.author.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 1,
          peopleId: 1,
          rol: params.works.roles.artist.id,
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
