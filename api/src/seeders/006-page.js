'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'pages',
      [
        {
          chapterId: 1,
          filename: 'asdas1.png',
          hidden: false,
          height: 100,
          width: 20,
          size: 111,
          mime: 'png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          chapterId: 1,
          filename: 'asdas2.png',
          hidden: false,
          height: 100,
          width: 20,
          size: 112,
          mime: 'png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          chapterId: 1,
          filename: 'asdas3.png',
          hidden: false,
          height: 100,
          width: 20,
          size: 112,
          mime: 'png',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('pages', null, {});
  }
};
