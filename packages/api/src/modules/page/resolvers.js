import path from 'path';

// App Imports
import { hasPermission } from '../../setup/auth-utils';
import { deleteImage, storeImage } from '../../setup/images-helpers';
import models from '../../setup/models';
import { useS3, deleteFile } from '../../setup/s3-upload';

const PUBLIC_PATH = path.join(__dirname, '..', '..', '..', 'public');

// Get pages by chapter
export async function getByChapter(parentValue, { chapterId }) {
  return await models.Page.findAll({
    where: {
      chapterId: chapterId
    },
    include: [{ model: models.Chapter, as: 'chapter' }]
  });
}

export async function getById(parentValue, { id }) {
  return await models.Page.findOne({
    where: {
      id
    }
  });
}

// Create page
export async function create(_, { chapterId, file, size }, { auth }) {
  if (await hasPermission('create', auth)) {
    const chapter = await models.Chapter.findOne({
      where: {
        id: chapterId
      },
      include: [{ model: models.Works, as: 'work' }]
    });
    const chapterDetails = chapter.get();

    const filepath = path.join(
      'works',
      chapterDetails.work.uniqid,
      chapterDetails.uniqid
    );

    const includeMetadata = true;

    const { filename, mimetype, width, height, url } = await storeImage({
      file,
      basePath: PUBLIC_PATH,
      filepath,
      includeMetadata
    });

    return await models.Page.create({
      chapterId,
      filename,
      height,
      width,
      size,
      mime: mimetype,
      url
    });
  } else {
    throw new Error('Operation denied.');
  }
}

// Update page
export async function update(
  parentValue,
  { id, chapterId, filename, hidden, height, width, size, mime },
  { auth }
) {
  if (await hasPermission('update', auth)) {
    return await models.Page.update(
      {
        chapterId,
        filename,
        hidden,
        height,
        width,
        size,
        mime
      },
      { where: { id } }
    );
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete page
export async function remove(parentValue, { id }, { auth }) {
  if (await hasPermission('delete', auth)) {
    const page = await models.Page.findOne({ where: { id } });
    if (!page) {
      // Page does not exists
      throw new Error('The page does not exists.');
    } else {
      const pageDetails = await page.get();
      const chapter = await models.Chapter.findOne({
        where: {
          id: pageDetails.chapterId
        },
        include: [{ model: models.Works, as: 'work' }]
      });
      const chapterDetails = await chapter.get();
      const pageDir = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        'works',
        chapterDetails.work.uniqid,
        chapterDetails.uniqid
      );
      try {
        await deleteImage(path.join(pageDir, pageDetails.filename));

        if (useS3) {
          await deleteFile(
            path.join(
              'works',
              chapterDetails.work.uniqid,
              chapterDetails.uniqid,
              pageDetails.filename
            )
          );
        }
      } catch (err) {
        //
      }

      return await models.Page.destroy({ where: { id } });
    }
  } else {
    throw new Error('Operation denied.');
  }
}

export async function getLatestPage(chapterId) {
  return await models.Page.findOne({
    where: { chapterId },
    limit: 1,
    order: [['createdAt', 'DESC']]
  });
}

// Page types
export async function getTypes() {
  return {};
}
