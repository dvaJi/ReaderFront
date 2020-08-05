import { v1 as uuidv1 } from 'uuid';
import path from 'path';
import { Sequelize, Op } from 'sequelize';
import ld from 'lodash';

// App Imports
import { includesField } from '../../setup/utils';
import { typesById, demographicById } from '@shared/params/genres';
import { languageById } from '@shared/params/global';
import { statusById, rolesById } from '@shared/params/works';

import {
  isValidThumb,
  deleteImage,
  storeImage
} from '../../setup/images-helpers';
import { normalizeChapter } from '../chapter/resolvers';
import { insertGenres } from '../works-genre/resolvers';
import { insertStaff } from '../people-works/resolvers';
import { hasPermission } from '../../setup/utils';
import models from '../../setup/models';
import { useS3, deleteFile } from '../../setup/s3-upload';

const PUBLIC_PATH = path.join(__dirname, '..', '..', '..', 'public');
const WORKS_PATH = path.join('works');

// Get all works
export async function getAll(
  parentValue,
  { languages = [], orderBy, first, offset, sortBy, showHidden },
  req,
  { fieldNodes = [] }
) {
  const includeChapters = includesField(fieldNodes, ['chapters']);
  const chapterJoin = includeChapters
    ? [
        {
          model: models.Chapter,
          ...whereChapter(showHidden, languages),
          as: 'chapters',
          order: [
            ['chapter', 'DESC'],
            ['subchapter', 'DESC']
          ],
          include: [{ model: models.Page, as: 'pages' }]
        }
      ]
    : [];

  const includePerson = includesField(fieldNodes, ['people_works']);
  const personJoin = includePerson
    ? [
        {
          model: models.PeopleWorks,
          as: 'people_works',
          include: [{ model: models.People }]
        }
      ]
    : [];

  const includeGenres = includesField(fieldNodes, ['works_genres', 'genres']);
  const genresJoin = includeGenres
    ? [
        {
          model: models.WorksGenres
        }
      ]
    : [];

  const works = await models.Works.findAll({
    order: [[sortBy, orderBy]],
    offset: offset,
    limit: first,
    ...where(showHidden, languages),
    include: [...chapterJoin, ...genresJoin, ...personJoin]
  })
    .map(el => el.get({ plain: true }))
    .then(works => works.map(work => normalizeWork(work)));

  return works;
}

// Get works by stub
export async function getByStub(
  _,
  { stub, language, showHidden },
  __,
  { fieldNodes = [] }
) {
  const work = await models.Works.findOne({
    where: { stub, language, ...whereCond(showHidden) },
    include: [
      {
        model: models.WorksGenres
      }
    ]
  });

  if (!work) {
    // Works does not exists
    throw new Error('The works you are looking for does not exists.');
  } else {
    const includeChapters = includesField(fieldNodes, ['chapters']);
    const chapters = includeChapters
      ? await models.Chapter.findAll({
          where: {
            workId: work.id
          },
          order: [
            ['chapter', 'DESC'],
            ['subchapter', 'DESC']
          ]
        }).map(el => el.get({ plain: true }))
      : [];

    const includePeople = includesField(fieldNodes, ['people_works']);
    const people_works = includePeople
      ? await models.PeopleWorks.findAll({
          where: { workId: work.id },
          include: [{ model: models.People }],
          order: [['rol', 'ASC']]
        })
      : [];

    const includeGenres = includesField(fieldNodes, ['works_genres', 'genres']);
    const works_genres = includeGenres
      ? await models.WorksGenres.findAll({
          where: { workId: work.id },
          order: [['genreId', 'ASC']]
        }).map(el => el.get({ plain: true }))
      : [];

    return normalizeWork({
      ...work.toJSON(),
      chapters,
      people_works,
      works_genres
    });
  }
}

// Get work by ID
export async function getById(_, { workId }, __, { fieldNodes = [] }) {
  const work = await models.Works.findOne({
    where: { id: workId }
  });

  if (!work) {
    // Works does not exists
    throw new Error('The works you are looking for does not exists.');
  } else {
    const includeChapters = includesField(fieldNodes, ['chapters']);
    const chapters = includeChapters
      ? await models.Chapter.findAll({
          where: workId,
          order: [
            ['chapter', 'DESC'],
            ['subchapter', 'DESC']
          ]
        }).map(el => el.get({ plain: true }))
      : [];

    const includePeople = includesField(fieldNodes, ['people_works', 'staff']);
    const people_works = includePeople
      ? await models.PeopleWorks.findAll({
          where: { workId: work.id },
          include: [{ model: models.People }],
          order: [['rol', 'ASC']]
        })
      : [];

    const includeGenres = includesField(fieldNodes, ['works_genres', 'genres']);
    const works_genres = includeGenres
      ? await models.WorksGenres.findAll({
          where: { workId: work.id },
          order: [['genreId', 'ASC']]
        }).map(el => el.get({ plain: true }))
      : [];

    return normalizeWork({
      ...work.toJSON(),
      chapters,
      people_works,
      works_genres
    });
  }
}

// Get random work
export async function getRandom(
  parentValue,
  { languages },
  req,
  { fieldNodes = [] }
) {
  const includeChapters = includesField(fieldNodes, ['chapters']);
  const chapterJoin = includeChapters
    ? [
        {
          model: models.Chapter,
          as: 'chapters',
          order: [
            ['chapter', 'DESC'],
            ['subchapter', 'DESC']
          ],
          include: [{ model: models.Page, as: 'pages' }]
        }
      ]
    : [];

  const includePerson = includesField(fieldNodes, ['people_works']);
  const personJoin = includePerson
    ? [
        {
          model: models.PeopleWorks,
          as: 'people_works',
          include: [{ model: models.People }]
        }
      ]
    : [];

  const includeGenres = includesField(fieldNodes, ['works_genres', 'genres']);
  const genresJoin = includeGenres
    ? [
        {
          model: models.WorksGenres
        }
      ]
    : [];

  const work = await models.Works.findOne({
    limit: 1,
    order: [[models.Sequelize.fn('RAND')]],
    ...where(false, languages),
    include: [...chapterJoin, ...personJoin, ...genresJoin]
  });

  return normalizeWork(work.get({ plain: true }));
}

// Create works with cover
export async function create(
  parentValue,
  {
    name,
    stub,
    type,
    hidden = false,
    demographicId,
    status,
    statusReason,
    description,
    language,
    adult = false,
    visits,
    thumbnail,
    works_genres,
    people_works
  },
  { auth }
) {
  if (hasPermission('create', auth)) {
    const uniqid = uuidv1();

    let thumbnailFilename = null;
    if (thumbnail) {
      const coverPath = path.join(WORKS_PATH, uniqid);
      const { filename } = await storeImage({
        file: thumbnail,
        basePath: PUBLIC_PATH,
        filepath: coverPath
      });
      thumbnailFilename = filename;
    }

    return await models.Works.create({
      name,
      stub,
      uniqid,
      type,
      hidden,
      demographicId,
      status,
      statusReason,
      description,
      language,
      adult,
      thumbnail: thumbnailFilename,
      visits
    }).then(async work => {
      const workdetails = await work.get();
      // Add genres
      workdetails.works_genres = await insertGenres(
        workdetails.id,
        works_genres
      );

      // Add Staff
      await insertStaff(workdetails.id, people_works);

      return workdetails;
    });
  } else {
    throw new Error('Operation denied.');
  }
}

// Update works
export async function update(
  parentValue,
  {
    id,
    name,
    stub,
    uniqid,
    type,
    hidden,
    demographicId,
    status,
    statusReason,
    description,
    language,
    adult,
    visits,
    thumbnail,
    works_genres,
    people_works
  },
  { auth }
) {
  if (hasPermission('update', auth)) {
    let newWork = {
      name,
      stub,
      uniqid,
      type,
      hidden,
      demographicId,
      status,
      statusReason,
      description,
      language,
      adult,
      thumbnail,
      visits
    };

    if (thumbnail) {
      const oldWork = await models.Works.findOne({ where: { id } });
      const oldWorkDetail = oldWork.get();

      // Store new cover
      const coverPath = path.join(WORKS_PATH, oldWorkDetail.uniqid);
      const { filename } = await storeImage({
        file: thumbnail,
        basePath: PUBLIC_PATH,
        filepath: coverPath
      });
      newWork.thumbnail = filename;

      // Delete old cover
      const oldCoverPath = path.join(
        PUBLIC_PATH,
        WORKS_PATH,
        oldWorkDetail.uniqid,
        oldWorkDetail.thumbnail
      );

      try {
        await deleteImage(oldCoverPath);
        if (useS3) {
          await deleteFile(
            path.join(WORKS_PATH, oldWorkDetail.uniqid, oldWorkDetail.thumbnail)
          );
        }
      } catch (err) {
        //
      }
    }

    return await models.Works.update(newWork, { where: { id } }).then(
      async () => {
        // Add genres
        await insertGenres(id, works_genres);

        // Add Staff
        await insertStaff(id, people_works);
      }
    );
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete works
export async function remove(parentValue, { id }, { auth }) {
  if (hasPermission('delete', auth)) {
    const works = await models.Works.findOne({ where: { id } });

    if (!works) {
      // Works does not exists
      throw new Error('The works does not exists.');
    } else {
      return await models.Works.destroy({ where: { id } });
    }
  } else {
    throw new Error('Operation denied.');
  }
}

// Works Status types
export async function getStatusTypes() {
  return {};
}

// Get all work aggregates
export async function getAggregates(
  parentValue,
  { aggregate, aggregateColumn, language, showHidden }
) {
  let agg = 0;
  await models.Works.findAll({
    ...where(showHidden, language),
    attributes: [
      [
        Sequelize.fn(aggregate, Sequelize.col('works.' + aggregateColumn)),
        aggregate.toLowerCase()
      ]
    ]
  }).then(async aggs => {
    if (aggs.length > 0) {
      agg = await aggs[0].get()[aggregate.toLowerCase()];
    }
  });

  const result = {};
  result[aggregate.toLowerCase()] = agg;

  return result;
}

const where = (showHidden, languages) => {
  const isAllLanguage = languages.length === 0;
  if (showHidden && isAllLanguage) {
    return {};
  }

  const oLanguage = isAllLanguage ? {} : { language: { [Op.or]: languages } };
  const sHidden = showHidden ? {} : { hidden: false };

  return { where: { ...sHidden, ...oLanguage } };
};

const whereChapter = (showHidden, languages) => {
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

const whereCond = showHidden => (showHidden ? {} : { hidden: false });

export const normalizeWork = work => {
  if (!work) {
    return null;
  }

  const description = work?.description || '';
  const desc_short = work?.description
    ? `${description.substr(0, 120)}...`
    : '';
  return {
    ...work,
    demographic_name: demographicById(work?.demographicId).name,
    status_name: statusById(work?.status).name,
    thumbnail_path: isValidThumb(work?.thumbnail)
      ? `/works/${work?.uniqid}/${work?.thumbnail}`
      : '/default-cover.png',
    language: work?.language,
    language_name: ld.get(languageById(work?.language), 'name', ''),
    description,
    description_short: desc_short,
    genres: ld.get(work, 'works_genres', []).map(genre => ({
      id: genre.genreId,
      name: typesById(genre.genreId).name
    })),
    chapters: ld
      .get(work, 'chapters', [])
      .map(chapter => normalizeChapter(chapter, work)),
    staff: ld
      .get(work, 'people_works', [])
      .map(pw => ({ ...pw, rol_name: rolesById(pw.rol).name }))
  };
};
