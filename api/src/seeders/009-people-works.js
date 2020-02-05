'use strict';

const worksParams = require('../shared/params/works');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'people_works',
      [
        {
          workId: 1,
          peopleId: 1,
          rol: worksParams.roles.author.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          workId: 1,
          peopleId: 1,
          rol: worksParams.roles.artist.id,
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
