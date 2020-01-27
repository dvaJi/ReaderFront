import path from 'path';

// App Imports
import { deleteImage, storeImage } from '../../setup/images-helpers';
import params from '../../config/params';
import models from '../../setup/models';

const WORKS_PATH = path.join(__dirname, '..', '..', '..', 'public', 'works');

// Get pages by chapter
export async function getByChapter(parentValue, { chapterId }) {
  return await models.Page.findAll({
    where: {
      chapterId: chapterId
    },
    include: [{ model: models.Chapter, as: 'chapter' }]
  });
}

// Create page
export async function create(_, { chapterId, file, size }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const chapter = await models.Chapter.findOne({
      where: {
        id: chapterId
      },
      include: [{ model: models.Works, as: 'work' }]
    });
    const chapterDetails = chapter.get();

    const coverPath = path.join(
      WORKS_PATH,
      chapterDetails.work.uniqid,
      chapterDetails.uniqid
    );

    const { filename, mimetype, width, height } = await storeImage(
      file,
      coverPath,
      true
    );

    return await models.Page.create({
      chapterId,
      filename,
      height,
      width,
      size,
      mime: mimetype
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
  if (auth.user && auth.user.role === params.user.roles.admin) {
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
  if (auth.user && auth.user.role === params.user.roles.admin) {
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
      await deleteImage(path.join(pageDir, pageDetails.filename));

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
  return Object.values(params.page.types);
}
