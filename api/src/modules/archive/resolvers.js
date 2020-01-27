import { Op } from 'sequelize';
import path from 'path';
import archiver from 'archiver';
import {
  createWriteStream,
  createReadStream,
  remove as fsRemove
} from 'fs-extra';

import models from '../../setup/models';
import { generateChapterDir } from '../../setup/utils';

// Get Archive by chapter id
export async function getByChapterId(chapterId) {
  return await models.Archive.findOne({
    where: { chapterId },
    include: [{ model: models.Chapter, as: 'chapter' }]
  });
}

// Get Archive by date
export async function getByDate(date) {
  return await models.Archive.findAll({
    where: {
      lastDownload: {
        [Op.lt]: date
      }
    }
  });
}

// Create
export async function create({ chapterId, filename, size, lastDownload }) {
  lastDownload = lastDownload ? lastDownload : new Date();
  return await models.Archive.create({
    chapterId,
    filename,
    size,
    lastDownload
  });
}

// Update
export async function update({ id, chapterId, filename, size, lastDownload }) {
  lastDownload = lastDownload ? lastDownload : new Date();
  return await models.Archive.update(
    {
      chapterId,
      filename,
      size,
      lastDownload
    },
    { where: { id } }
  );
}

// Delete
export async function remove(parentValue, { id }) {
  const archive = await models.Archive.findOne({
    where: { id },
    include: [
      {
        model: models.Chapter,
        as: 'chapter',
        include: [{ model: models.Works, as: 'work' }]
      }
    ]
  });

  if (!archive) {
    // Archive does not exists
    throw new Error('The archive does not exists.');
  } else {
    // Delete the file first
    const fullPath = await getArchivePath(archive);

    await fsRemove(fullPath);

    return await models.Archive.destroy({ where: { id } });
  }
}

/**
 * Update the 'lastDownload' column of the archive
 * @param {number} id
 */
export async function updateLastDownload(id) {
  return await models.Archive.update(
    {
      lastDownload: new Date()
    },
    { where: { id } }
  );
}

/**
 * Create a new zip file and return an Archive
 * @param {number} chapterId
 */
export async function createArchiveZip(chapterId) {
  try {
    const chapter = await models.Chapter.findOne({
      where: { id: chapterId },
      include: [
        { model: models.Works, as: 'work' },
        { model: models.Page, as: 'pages' }
      ],
      order: [[models.Page, 'filename']]
    });
    const chapterDetail = await chapter.get();
    const work = chapterDetail.work;

    let filename = '';
    if (chapterDetail.volume !== null || chapterDetail.volume !== 0) {
      // Final name: {WORK_STUB}_V{VOLUME}_C{CHAPTER}.zip
      filename =
        work.stub +
        '_V' +
        chapterDetail.volume +
        '_C' +
        chapterDetail.chapter +
        '.zip';
    } else {
      // Final name: {WORK_STUB}_C{CHAPTER}.zip
      filename = work.stub + '_C' + chapterDetail.chapter + '.zip';
    }

    // Create ZIP
    const chapterPath = generateChapterDir(chapterDetail, work);
    const size = await zipPages(filename, chapterDetail.pages, chapterPath);

    const archive = {
      chapterId: chapterId,
      filename,
      size,
      lastDownload: new Date()
    };

    return archive;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateArchiveZip(archive) {
  const chapter = await models.Chapter.findOne({
    where: { id: archive.chapterId },
    include: [
      { model: models.Works, as: 'work' },
      { model: models.Page, as: 'pages' }
    ],
    order: [[models.Page, 'filename']]
  });
  const chapterDetail = await chapter.get();
  const work = chapterDetail.work;

  const chapterPath = generateChapterDir(chapterDetail, work);
  const size = await zipPages(
    archive.filename,
    chapterDetail.pages,
    chapterPath
  );

  return {
    ...archive,
    size,
    lastDownload: new Date()
  };
}

/**
 * Create a zip with all pages of the chapter
 * @param {string} filename
 * @param {Page[]} pages
 * @param {string} chapterPath
 */
async function zipPages(filename, pages, chapterPath) {
  const zipPath = path.join(chapterPath, filename);
  let size;
  let output = createWriteStream(zipPath);
  let archive = archiver('zip', {
    zlib: { level: 9 }
  });

  // Events
  output.on('close', function() {
    size = archive.pointer();
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  // Get and append chapter pages
  for (const page of pages) {
    try {
      var pageFile = await path.join(chapterPath, page.filename);
      await archive.append(createReadStream(pageFile), { name: page.filename });
    } catch (err) {
      console.error('Error in append file', err);
    }
  }

  await archive.finalize();

  return size;
}

/**
 * Get the archive path
 * @param {Archive} archive
 * @returns {string} Archive path
 */
export async function getArchivePath(archive) {
  const chapter = await models.Chapter.findOne({
    where: { id: archive.chapterId },
    include: [{ model: models.Works, as: 'work' }]
  });

  if (!chapter) {
    throw Error('Chapter can not be found');
  }

  const chapterDetail = await chapter.get();
  const work = chapterDetail.work;
  return path.join(
    __dirname,
    '..',
    '..',
    '..',
    'public',
    'works',
    work.uniqid,
    chapter.uniqid,
    archive.filename
  );
}
