import { v1 as uuidv1 } from 'uuid';
import { Op } from 'sequelize';
import formatDate from 'date-fns/format';

// App Imports
import { hasPermission } from '../../setup/auth-utils';
import { includesField } from '../../setup/utils';
import { languageById } from '@readerfront/shared/build/params/global';
import { isValidThumb } from '../../setup/images-helpers';
import { API_URL } from '../../config/env';
import models from '../../setup/models';
import { normalizeWork } from '../works/resolvers';
import { addRegistry, REGISTRY_ACTIONS } from '../registry/resolvers';
import {
  remove as removePage,
  getById as getByPageId
} from '../page/resolvers';
import { addHours } from 'date-fns';

// Get all chapters
export async function getAll(
  _,
  {
    languages = [],
    orderBy = 'DESC',
    first = 10,
    offset = 0,
    showHidden = false
  }
) {
  const chapters = await models.Chapter.findAll({
    ...where(showHidden, languages),
    order: [
      ['releaseDate', orderBy],
      [models.Page, 'filename']
    ],
    include: [
      { model: models.Works, as: 'work' },
      { model: models.Page, as: 'pages' }
    ],
    offset: offset,
    limit: first
  });

  return chapters.map(chapter =>
    normalizeChapter(
      chapter.get({ plain: true }),
      chapter.get({ plain: true }).work
    )
  );
}

// Get chapter by work
export async function getByWork(
  _,
  { workStub, languages = [], showHidden },
  __,
  { fieldNodes = [] }
) {
  const order = [
    ['chapter', 'DESC'],
    ['subchapter', 'DESC']
  ];
  const includePages = includesField(fieldNodes, ['pages']);
  const pages = includePages
    ? {
        join: [
          {
            model: models.Page,
            as: 'pages'
          }
        ],
        order: { order: [...order, [models.Page, 'filename']] }
      }
    : {
        join: [],
        order: { order: order }
      };
  const chapters = await models.Chapter.findAll({
    ...where(showHidden, languages),
    include: [
      { model: models.Works, as: 'work', where: { stub: workStub } },
      ...pages.join
    ],
    order
  });

  return chapters.map(chapter =>
    normalizeChapter(
      chapter.get({ plain: true }),
      chapter.get({ plain: true }).work
    )
  );
}

// Get chapter by work id
export async function getByWorkId(_, { workId }) {
  const order = [
    ['chapter', 'DESC'],
    ['subchapter', 'DESC']
  ];
  const chapters = await models.Chapter.findAll({
    where: { workId },
    order
  });

  return chapters.map(chapter =>
    normalizeChapter(
      chapter.get({ plain: true }),
      chapter.get({ plain: true }).work
    )
  );
}

// Get chapter by id
export async function getById(parentValue, { id, showHidden }) {
  const where = showHidden
    ? { where: { id } }
    : { where: { hidden: false, id } };
  const chapter = await models.Chapter.findOne({
    ...where,
    include: [
      { model: models.Works, as: 'work' },
      { model: models.Page, as: 'pages' }
    ],
    order: [[models.Page, 'filename']]
  });

  return normalizeChapter(
    chapter.get({ plain: true }),
    chapter.get({ plain: true }).work
  );
}

// Get chapter by work stub, chapter + subchapter + volume + language
export async function getWithPagesByWorkStubAndChapter(
  parentValue,
  { workStub, language, volume, chapter, subchapter, showHidden }
) {
  let where = { where: { chapter, subchapter, volume, language } };
  if (!showHidden) {
    where.where.hidden = false;
    where.where.releaseDate = { [Op.lt]: new Date() };
  }
  const chapterObj = await models.Chapter.findOne({
    ...where,
    include: [
      { model: models.Works, as: 'work', where: { stub: workStub } },
      { model: models.Page, as: 'pages' }
    ],
    order: [[models.Page, 'filename']]
  });

  return normalizeChapter(
    chapterObj.get({ plain: true }),
    chapterObj.get({ plain: true }).work
  );
}

// Get all chapters for RSS
export async function getAllRSS({
  languages = [],
  orderBy = 'DESC',
  showHidden = false
}) {
  const chapters = await models.Chapter.findAll({
    ...where(showHidden, languages),
    order: [['releaseDate', orderBy]],
    include: [{ model: models.Works, as: 'work' }],
    offset: 0,
    limit: 25
  });

  return chapters.map(chapter =>
    normalizeChapter(
      chapter.get({ plain: true }),
      chapter.get({ plain: true }).work
    )
  );
}

// Create chapter
export async function create(
  _,
  {
    workId,
    chapter,
    subchapter,
    volume,
    name,
    stub,
    uniqid,
    hidden,
    description,
    thumbnail,
    scheduled_release = 0
  },
  { auth }
) {
  if (await hasPermission('create', auth)) {
    uniqid = uuidv1();
    const releaseDate = addHours(new Date(), scheduled_release);

    const work = await models.Works.findOne({
      where: { id: workId },
      attributes: ['language', 'name']
    });

    const workDetail = work.get();

    await addRegistry(
      auth.user.id,
      REGISTRY_ACTIONS.CREATE,
      'chapter',
      `${workDetail.name} | Chapter ${chapter}.${subchapter}`
    );

    return await models.Chapter.create({
      workId,
      chapter,
      subchapter,
      volume,
      language: workDetail.language,
      name,
      stub,
      uniqid,
      hidden,
      description,
      thumbnail,
      releaseDate
    });
  } else {
    throw new Error('Operation denied.');
  }
}

// Update chapter
export async function update(
  parentValue,
  {
    id,
    workId,
    chapter,
    subchapter,
    volume,
    name,
    stub,
    hidden,
    description,
    thumbnail,
    releaseDate
  },
  { auth }
) {
  if (await hasPermission('update', auth)) {
    const work = await models.Works.findOne({
      where: { id: workId },
      attributes: ['language', 'name']
    });

    const workDetail = work.get();

    await addRegistry(
      auth.user.id,
      REGISTRY_ACTIONS.UPDATE,
      'chapter',
      `${workDetail.name} | Chapter ${chapter}.${subchapter}`
    );

    return await models.Chapter.update(
      {
        chapter,
        subchapter,
        volume,
        name,
        stub,
        hidden,
        description,
        thumbnail,
        releaseDate
      },
      { where: { id } }
    );
  } else {
    throw new Error('Operation denied.');
  }
}

// Update chapter
export async function updateDefaultThumbnail(
  parentValue,
  { id, pageId },
  { auth }
) {
  if (await hasPermission('update', auth)) {
    let thumbnail = null;
    if (pageId) {
      const page = await getByPageId(parentValue, { id: pageId });
      thumbnail = page.filename;
    }
    return await models.Chapter.update(
      {
        thumbnail
      },
      { where: { id } }
    );
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete chapter
export async function remove(parentValue, { id }, { auth }) {
  if (await hasPermission('delete', auth)) {
    const chapter = await models.Chapter.findOne({ where: { id } });

    if (!chapter) {
      // Chapter does not exists
      throw new Error('The chapter does not exists.');
    } else {
      const chapterDetail = chapter.get();
      const work = await models.Works.findOne({
        where: { id: chapterDetail.workId },
        attributes: ['language', 'name']
      });

      const workDetail = work.get();

      await addRegistry(
        auth.user.id,
        REGISTRY_ACTIONS.DELETE,
        'chapter',
        `${workDetail.name} | Chapter ${chapterDetail.chapter}.${chapterDetail.subchapter}`
      );

      // Delete all pages
      const pages = await models.Page.findAll({
        where: { chapterId: id },
        attributes: ['id']
      }).map(el => el.get({ plain: true }));

      for (const page of pages) {
        await removePage(undefined, { id: page.id }, { auth });
      }

      return await models.Chapter.destroy({ where: { id } });
    }
  } else {
    if (auth.user.role === 'UPLOADER') {
      throw new Error('You cannot perform this action.');
    }

    throw new Error('Operation denied.');
  }
}

export async function updateStatus(_, { id, hidden }, { auth }) {
  if (await hasPermission('update', auth)) {
    return await models.Chapter.update(
      {
        hidden
      },
      { where: { id } }
    );
  } else {
    throw new Error('Operation denied.');
  }
}

// Chapter types
export async function getTypes() {
  return {};
}

const where = (showHidden, languages) => {
  const isAllLanguage = languages.length === 0;
  if (showHidden && isAllLanguage) {
    return {};
  }

  const oLanguage = isAllLanguage ? {} : { language: { [Op.or]: languages } };
  const sHidden = showHidden
    ? {}
    : { hidden: false, releaseDate: { [Op.lt]: new Date() } };

  return { where: { ...sHidden, ...oLanguage } };
};

export const normalizeChapter = (chapter, work) => ({
  ...chapter,
  releaseDate_formatted: formatDate(
    new Date(chapter.releaseDate),
    'dd/MM/yyyy'
  ),
  download_href: `${API_URL}/download/${chapter.id}`,
  thumbnail_path:
    isValidThumb(chapter.thumbnail) && work
      ? `/works/${work.uniqid}/${chapter.uniqid}/${chapter.thumbnail}`
      : '/default-cover.png',
  language_name: languageById(chapter.language).name,
  read_path: work
    ? `/read/${work.stub}/${languageById(chapter.language).name}/${
        chapter.volume
      }/${chapter.chapter}.${chapter.subchapter}`
    : null,
  work: normalizeWork(chapter.work)
});
