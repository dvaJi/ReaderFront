'use strict';

const params = require('../config/params');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'works',
      [
        {
          name: 'Senpai, Sore Hitokuchi Kudasai!',
          stub: 'senpai_sore_hitokuchi_kudasai',
          uniqid: '56ff02b19f342',
          hidden: false,
          type: 'Manga',
          demographicId: params.genres.demographic.shounen.id,
          status: params.works.status.onGoing.id,
          statusReason: null,
          adult: false,
          visits: 1000,
          thumbnail: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Caterpillar',
          stub: 'caterpillar',
          uniqid: '57095fed60ed1',
          hidden: false,
          type: 'Manga',
          demographicId: params.genres.demographic.seinen.id,
          status: params.works.status.onGoing.id,
          statusReason: null,
          adult: false,
          visits: 5000,
          thumbnail: 'file-1534697328471.png',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('works', null, {});
  }
};
