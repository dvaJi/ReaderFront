// Imports
import path from 'path';
import multer from 'multer';

// App Imports
import serverConfig from '../config/server.json';
import { sanitizeFilename } from './utils';

// File upload configurations and route
export default function(server) {
  console.info('SETUP - Upload...');

  // Set destination
  const storage = multer.diskStorage({
    destination: path.join(
      __dirname,
      '..',
      '..',
      'public',
      'images',
      'uploads'
    ),

    filename: function(request, file, callback) {
      callback(null, sanitizeFilename(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 3
    }
  }).single('file');

  // Upload route
  server.post(serverConfig.upload.endpoint, (request, response) => {
    upload(request, response, function(error) {
      if (!error) {
        response.json({
          success: true,
          file: request.file.filename
        });
      } else {
        response.json({
          success: false,
          file: null
        });
      }
    });
  });
}
