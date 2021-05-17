'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'posts',
      [
        {
          userId: 1,
          uniqid: '649d8e6a-cbce-4458-a37f-c619065c1474',
          type: 1,
          title: 'Lorem Ipsum 1',
          stub: 'lorem-ipsum',
          status: 1,
          sticky: false,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elit odio, mattis nec tortor sit amet, ornare faucibus lectus. Praesent ut sollicitudin massa. Nulla eget ex non augue scelerisque efficitur in et mi. Integer vel mi nec risus sodales cursus. Nulla facilisi. Etiam sed tortor sodales, vulputate orci at, fermentum nisl. Maecenas ante felis, aliquam eget lectus vel, maximus commodo est. Nullam in ligula pharetra, lacinia ante sed, fringilla lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: 2,
          language: 2,
          thumbnail: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};
