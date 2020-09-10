'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'peoples',
      [
        {
          name: 'Asato Mizu',
          name_kanji: '水あさと',
          stub: 'asato-mizu',
          uniqid: 'b53afad3-1ea8-408e-bb7b-9a378f9892d1',
          description: 'Circle: Milmake Orange (ミルメークオレンジ)',
          twitter: 'mizuasato',
          thumbnail: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('peoples', null, {});
  }
};
