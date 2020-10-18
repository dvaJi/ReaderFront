import { Op } from 'sequelize';
import path from 'path';
import { Readable } from 'stream';
import archiver from 'archiver';
import PDFDocument from 'pdfkit';
import {
  createWriteStream,
  createReadStream,
  remove as fsRemove,
  ensureDir
} from 'fs-extra';

import models from '../../setup/models';
import { generateChapterDir } from '../../setup/utils';
import { useS3, downloadFile } from '../../setup/s3-upload';

// Get Archive by chapter id
export async function getByChapterId(chapterId, type) {
  return await models.Archive.findOne({
    where: { chapterId, type },
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
export async function create({
  chapterId,
  filename,
  size,
  lastDownload,
  exist = true,
  type
}) {
  lastDownload = lastDownload ? lastDownload : new Date();
  return await models.Archive.create({
    chapterId,
    filename,
    size,
    lastDownload,
    type,
    exist,
    count: 1
  });
}

// Update
export async function update({
  id,
  chapterId,
  filename,
  size,
  lastDownload,
  exist,
  type
}) {
  lastDownload = lastDownload ? lastDownload : new Date();
  return await models.Archive.update(
    {
      chapterId,
      filename,
      size,
      lastDownload,
      exist,
      type
    },
    { where: { id } }
  );
}

// Delete
export async function remove(parentValue, { id }) {
  const archive = await models.Archive.findOne({
    where: { id }
  });

  if (!archive) {
    // Archive does not exists
    throw new Error('The archive does not exists.');
  } else {
    // Delete the file first
    const fullPath = await getArchivePath(archive);

    await fsRemove(fullPath);

    return await models.Archive.update({ exist: false }, { where: { id } });
  }
}

/**
 * Update the 'lastDownload' column of the archive
 * @param {number} id
 */
export async function updateLastDownload(id, count) {
  return await models.Archive.update(
    {
      lastDownload: new Date(),
      count: count + 1
    },
    { where: { id } }
  );
}

export async function generateFilename(chapterDetail, type) {
  const work = chapterDetail.work;
  let filename = '';
  if (chapterDetail.volume !== null && chapterDetail.volume !== 0) {
    const { volume, chapter: chapterNum } = chapterDetail;
    // Final name: {WORK_STUB}_V{VOLUME}_C{CHAPTER}.zip
    filename = `${work.stub}_V${volume}_C${chapterNum}.${type}`;
  } else {
    // Final name: {WORK_STUB}_C{CHAPTER}.zip
    filename = `${work.stub}_C${chapterDetail.chapter}.${type}`;
  }

  return filename;
}

export async function getAllPagesbyChapter(chapterId) {
  const chapter = await models.Chapter.findOne({
    where: { id: chapterId },
    include: [
      { model: models.Works, as: 'work' },
      { model: models.Page, as: 'pages' }
    ],
    order: [[models.Page, 'filename']]
  });
  return await chapter.get();
}

/**
 * Create a new zip or pdf file and return a Archive db model.
 * @param {number} chapterId
 * @param {string} type
 * @param {Chapter} chapterDetail
 */
export async function createArchiveFS(chapterId, type, chapterDetail) {
  try {
    const work = chapterDetail.work;
    const filename = await generateFilename(chapterDetail, type);

    // Create ZIP
    const chapterPath = generateChapterDir(chapterDetail, work);
    const chapterFilenamePath = path.join(
      'works',
      work.uniqid,
      chapterDetail.uniqid
    );

    let size = 0;
    if (type === 'zip') {
      size = await zipPages(
        filename,
        chapterDetail.pages,
        chapterPath,
        chapterFilenamePath
      );
    } else if (type === 'pdf') {
      size = await pdfPages(
        filename,
        chapterDetail.pages,
        chapterPath,
        chapterFilenamePath
      );
    }

    const archive = {
      chapterId: chapterId,
      filename,
      size,
      lastDownload: new Date(),
      type,
      exist: true
    };

    return archive;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateArchiveFS(archive, type) {
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
  const chapterFilenamePath = path.join('works', work.uniqid, chapter.uniqid);

  let size = 0;

  if (type === 'zip') {
    size = await zipPages(
      archive.filename,
      chapterDetail.pages,
      chapterPath,
      chapterFilenamePath
    );
  } else if (type === 'pdf') {
    size = await pdfPages(
      archive.filename,
      chapterDetail.pages,
      chapterPath,
      chapterFilenamePath
    );
  }

  return {
    ...archive,
    size,
    lastDownload: new Date(),
    type
  };
}

async function pdfPages(filename, pages, chapterPath, chapterFilenamePath) {
  await ensureDir(chapterPath);

  const pdfPath = path.join(chapterPath, filename);

  const doc = new PDFDocument({ autoFirstPage: false });
  doc.pipe(createWriteStream(pdfPath));

  let size = 0;

  // Get and append chapter pages
  for (const page of pages) {
    try {
      let buffer = null;

      if (useS3) {
        buffer = await downloadFile(
          path.join(chapterFilenamePath, page.filename)
        );
      } else {
        const pageFile = path.join(chapterPath, page.filename);
        buffer = createReadStream(pageFile);
      }

      doc.addPage({ size: [page.width, page.height] });
      doc.image(buffer, 0, 0);
    } catch (err) {
      console.error('Error in append file', err);
    }
  }

  doc.end();

  return size;
}

/**
 * Create a zip with all pages of the chapter
 * @param {string} filename
 * @param {Page[]} pages
 * @param {string} chapterPath
 */
async function zipPages(filename, pages, chapterPath, chapterFilenamePath) {
  await ensureDir(chapterPath);

  const zipPath = path.join(chapterPath, filename);
  let size;
  let output = createWriteStream(zipPath);
  let archive = archiver('zip', {
    zlib: { level: 9 }
  });

  // Events
  output.on('close', function () {
    size = archive.pointer();
  });

  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  // Get and append chapter pages
  for (const page of pages) {
    try {
      let buffer = null;

      if (useS3) {
        buffer = await downloadFile(
          path.join(chapterFilenamePath, page.filename)
        );
        buffer = bufferToStream(buffer);
      } else {
        const pageFile = path.join(chapterPath, page.filename);
        buffer = createReadStream(pageFile);
      }

      archive.append(buffer, { name: page.filename });
    } catch (err) {
      console.error('Error in append file', err);
    }
  }

  await archive.finalize();

  return size;
}

function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });

  return readableInstanceStream;
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
