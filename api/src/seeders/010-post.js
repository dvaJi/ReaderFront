'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'posts',
      [
        {
          userId: 1,
          uniqid: '9a0s9298l2032l',
          type: 1,
          title: 'Primera publicación!',
          stub: 'primera-publicacion',
          status: 1,
          sticky: false,
          content:
            'Primera publicación dentro del blog, podrás **Publicar**, **Editar**, **Guardar**, **Eliminar** tus publicaciones. En el [AdminCP](/admincp/).  > Para realizar estas acciones debes tener permisos de administrador.',
          category: 1,
          language: 1,
          thumbnail: 'cover_goblinslayer.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          uniqid: '123534k1249sd',
          type: 1,
          title: 'Lorem Ipsum 1',
          stub: 'lorem-ipsum',
          status: 1,
          sticky: false,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elit odio, mattis nec tortor sit amet, ornare faucibus lectus. Praesent ut sollicitudin massa. Nulla eget ex non augue scelerisque efficitur in et mi. Integer vel mi nec risus sodales cursus. Nulla facilisi. Etiam sed tortor sodales, vulputate orci at, fermentum nisl. Maecenas ante felis, aliquam eget lectus vel, maximus commodo est. Nullam in ligula pharetra, lacinia ante sed, fringilla lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          category: 2,
          language: 1,
          thumbnail: 'cover_awesomepost.png',
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
