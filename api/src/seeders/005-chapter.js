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
          language: 1,
          name: 'El Chapter',
          stub: 'el-chapter',
          uniqid: '9a0sda90',
          hidden: false,
          description: null,
          thumbnail: 'thumb_ch1.png',
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
