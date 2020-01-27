// Imports
import express from 'express';

// App Imports
import setupLoadModules from './setup/load-modules';
import setupGraphQL from './setup/graphql';
import setupUpload from './setup/upload';
import setupStartServer from './setup/start-server';
import setupDownloads from './setup/download-archive';
import setupFeed from './setup/start-feed';
import setupSitemap from './setup/start-sitemap';

// Create express server
const server = express();

// Setup load modules
setupLoadModules(server);

// Setup uploads
setupUpload(server);

// Setup downloads
setupDownloads(server);

// Setup Feed
setupFeed(server);

// Setup Sitemap
setupSitemap(server);

// Setup GraphQL
setupGraphQL(server);

// Start server
setupStartServer(server);
