import uuidv1 from 'uuid/v1';
import { Op } from 'sequelize';

// App Imports
import { includesField, languageIdToName } from '../../setup/utils';
import { isValidThumb } from '../../setup/images-helpers';
import { API_URL } from '../../config/env';
import params from '../../config/params';
import models from '../../setup/models';

// Get all chapters
export async function getAll(
  parentValue,
  {
    language = -1,
    orderBy = 'DESC',
    first = 10,
    offset = 0,
    showHidden = false
  }
) {
  const chapters = await models.Chapter.findAll({
    ...where(showHidden, language),
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
  }).map(el => el.get({ plain: true }));

  return chapters.map(chapter => normalizeChapter(chapter, chapter.work));
}

// Get chapter by work
export async function getByWork(
  parentValue,
  { workStub, language, showHidden },
  req,
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
    ...where(showHidden, language),
    include: [
      { model: models.Works, as: 'work', where: { stub: workStub } },
      ...pages.join
    ],
    order
  }).map(el => el.get({ plain: true }));

  return chapters.map(chapter => normalizeChapter(chapter, chapter.work));
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

  return normalizeChapter(chapter.toJSON(), chapter.toJSON().work);
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

  return normalizeChapter(chapterObj.toJSON(), chapterObj.toJSON().work);
}

// Get all chapters for RSS
export async function getAllRSS({
  language = -1,
  orderBy = 'DESC',
  showHidden = false
}) {
  const chapters = await models.Chapter.findAll({
    ...where(showHidden, language),
    order: [['releaseDate', orderBy]],
    include: [{ model: models.Works, as: 'work' }],
    offset: 0,
    limit: 25
  }).map(el => el.get({ plain: true }));

  return chapters.map(chapter => normalizeChapter(chapter, chapter.work));
}

// Create chapter
export async function create(
  parentValue,
  {
    workId,
    chapter,
    subchapter,
    volume,
    language,
    name,
    stub,
    uniqid,
    hidden,
    description,
    thumbnail,
    releaseDate
  },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    uniqid = uuidv1();
    if (releaseDate === null) {
      releaseDate = new Date();
    }
    return await models.Chapter.create({
      workId,
      chapter,
      subchapter,
      volume,
      language,
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
    language,
    name,
    stub,
    uniqid,
    hidden,
    description,
    thumbnail,
    releaseDate
  },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Chapter.update(
      {
        workId,
        chapter,
        subchapter,
        volume,
        language,
        name,
        stub,
        uniqid,
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
  { id, thumbnail },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
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
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const chapter = await models.Chapter.findOne({ where: { id } });

    if (!chapter) {
      // Chapter does not exists
      throw new Error('The chapter does not exists.');
    } else {
      return await models.Chapter.destroy({ where: { id } });
    }
  } else {
    throw new Error('Operation denied.');
  }
}

// Chapter types
export async function getTypes() {
  return Object.values(params.chapter.types);
}

const where = (showHidden, language) => {
  const isAllLanguage = language === -1 || language === undefined;
  if (showHidden && isAllLanguage) {
    return {};
  }

  const oLanguage = isAllLanguage ? {} : { language };
  const sHidden = showHidden
    ? {}
    : { hidden: false, releaseDate: { [Op.lt]: new Date() } };

  return { where: { ...sHidden, ...oLanguage } };
};

export const normalizeChapter = (chapter, work) => ({
  ...chapter,
  download_href: `${API_URL}download/${chapter.id}`,
  thumbnail_path: isValidThumb(chapter.thumbnail)
    ? `works/${work.uniqid}/${chapter.uniqid}/${chapter.thumbnail}`
    : 'images/default-cover.png',
  language_name: languageIdToName(chapter.language),
  read_path: `read/${work.stub}/${languageIdToName(chapter.language)}/${
    chapter.volume
  }/${chapter.chapter}.${chapter.subchapter}`
});
