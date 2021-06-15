import express from 'express';
import SequelizeMock from 'sequelize-mock';

import setupLoadModules from './src/setup/load-modules';
import setupGraphQL from './src/setup/graphql';
import setupDownloads from './src/setup/download-archive';
import setupFeed from './src/setup/start-feed';
import setupSitemap from './src/setup/start-sitemap';

const dbMock = new SequelizeMock();

jest.mock('./src/setup/models', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return {
    User: {},
    Works: dbMock.define('works', {
      id: 1,
      name: 'Infection',
      stub: 'infection',
      uniqid: '12345asd',
      type: 'Manga',
      hidden: false,
      language: 1,
      description: 'First Manga',
      demographicId: 1,
      licensed: false,
      status: 1,
      statusReason: '',
      adult: false,
      thumbnail: 'cover.png',
      visits: 0
    })
  };
});

// jest.mock('./src/setup/models', () => {
//   return {
//     User: {},
//     Works: {
//       findAll: () => [
//         {
//           get: () =>
//             Promise.resolve([
//               {
//                 id: 1
//               }
//             ])
//         }
//       ]
//     }
//   };
// });

const server = express();
setupLoadModules(server);
setupDownloads(server);
setupFeed(server);
setupSitemap(server);
setupGraphQL(server);

global.myapp = server;
