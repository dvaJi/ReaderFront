import path from 'path';
import sharp from 'sharp';
import {
  ensureDir,
  ensureFile,
  move,
  remove,
  unlink,
  createWriteStream
} from 'fs-extra';
import { slugify } from '@shared/slugify';

import { API_URL } from '../config/env';
import { uploadFile, useS3 } from './s3-upload';

export function isValidThumb(thumb) {
  return thumb !== null && thumb !== '';
}

/**
 * Stores a GraphQL file upload. The image will be stored either on S3 or in the filesystem.
 * @param {{file: FileUpload}} options
 * @returns image metadata
 */
export async function storeImage({
  file,
  basePath,
  filepath,
  includeMetadata = false
}) {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();
  const newFilename = slugify(filename, true);
  const imagepath = path.join(basePath, filepath, newFilename);

  await saveImageFS(path.join(basePath, filepath), imagepath, stream);

  let metadata = {};
  if (includeMetadata) {
    metadata = await sharp(imagepath)
      .metadata()
      .then(data => ({ width: data.width, height: data.height }));
  }

  let url = `${API_URL}/${path
    .join(filepath, newFilename)
    .replace(/\\/g, '/')}`;

  if (useS3) {
    // upload file to S3 and then delete it from FS
    const newStreqam = createReadStream(imagepath);
    const buffer = await streamToBuffer(newStreqam);
    url = await uploadFile(path.join(filepath, newFilename), mimetype, buffer);
    await deleteImage(imagepath);
  }

  return {
    ...metadata,
    filename: newFilename,
    mimetype,
    url
  };
}

/**
 * Save an image to FS.
 *
 * @param {string} filepath
 * @param {string} imagepath
 * @param {ReadStream} stream
 */
export async function saveImageFS(filepath, imagepath, stream) {
  // Check directory exist, otherwise create
  await ensureDir(filepath);

  // store file in FS
  return await new Promise((resolve, reject) => {
    // Check and create directories

    // Store the file in the filesystem.
    const writeStream = createWriteStream(imagepath);

    // When the upload is fully written, resolve the promise.
    writeStream.on('finish', resolve);

    writeStream.on('error', error => {
      unlink(imagepath, () => {
        reject(error);
      });
    });

    stream.on('error', error => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });
}

/**
 * Delete an image from FS
 *
 * @param {string} filepath
 */
export async function deleteImage(filepath) {
  try {
    await ensureFile(filepath);
    await remove(filepath);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Move file from FS
 * @param {*} oldDir
 * @param {*} newDir
 * @param {*} filename
 */
export async function moveImage(oldDir, newDir, filename) {
  try {
    await ensureDir(newDir);
    await move(path.join(oldDir, filename), path.join(newDir, filename));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Convert ReadStream to Buffer.
 * @param {ReadStream} stream image readStream.
 * @returns {Promise<string>} buffer of the image.
 */
function streamToBuffer(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
