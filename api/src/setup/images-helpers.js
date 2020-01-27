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
import { sanitizeFilename } from './utils';

export function isValidThumb(thumb) {
  return thumb !== null && thumb !== '';
}

/**
 * Stores a GraphQL file upload. The image is stored in the filesystem.
 * @param {*} file
 * @param {string} filepath
 * @returns image metadata
 */
export async function storeImage(file, filepath, includeMetadata = false) {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();
  const newFilename = sanitizeFilename(filename);
  const imagepath = path.join(filepath, newFilename);

  // Check and create directories
  await ensureDir(filepath);

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
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

  let metadata = {};
  if (includeMetadata) {
    metadata = await sharp(imagepath)
      .metadata()
      .then(data => ({ width: data.width, height: data.height }));
  }

  return {
    ...metadata,
    filename: newFilename,
    mimetype
  };
}

/**
 * Delete an image
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
 * Move file
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
