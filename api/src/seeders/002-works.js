'use strict';

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
          language: 2,
          description: `A romantic comedy about a girl who's smitten with her dirt-poor senpai. One day, she musters the courage to ask him if they can go home together. Follow them on their very special kind of afterschool "dates"!`,
          demographicId: 4,
          status: 1,
          statusReason: null,
          adult: false,
          visits: 1000,
          thumbnail: null,
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
