import { v1 as uuidv1 } from 'uuid';

// App Imports
import params from '../../config/params';
import models from '../../setup/models';
import { sanitizeFilename } from '../../setup/utils';

// Get all peoples
export async function getAll(
  parentValue,
  { orderBy = 'ASC', first = 20, offset = 0 }
) {
  return await models.People.findAll({
    order: [['id', orderBy]],
    offset: offset,
    limit: first,
    include: [
      {
        model: models.PeopleWorks,
        include: [{ model: models.Works }]
      }
    ]
  });
}

export async function getAllByName(parentValue, { name, first, offset }) {
  return await models.People.findAll({
    where: { name: { like: `%${name}%` } },
    order: [['name', 'ASC']],
    offset: offset,
    limit: first
  });
}

// Get people by stub
export async function getByStub(parentValue, { stub }) {
  return await models.People.findAll({
    where: {
      stub: stub
    },
    include: [
      {
        model: models.PeopleWorks,
        include: [{ model: models.Works }]
      }
    ]
  });
}

// Create people
export async function create(
  _,
  { name, name_kanji, description, twitter, thumbnail },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const uniqid = uuidv1();
    const stub = sanitizeFilename(name);

    return await models.People.create({
      name,
      name_kanji,
      stub,
      uniqid,
      description,
      twitter,
      thumbnail
    });
  } else {
    throw new Error('Operation denied.');
  }
}

// Update people
export async function update(
  _,
  { id, name, name_kanji, description, twitter, thumbnail },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const stub = sanitizeFilename(name);
    return await models.People.update(
      {
        name,
        name_kanji,
        stub,
        description,
        twitter,
        thumbnail
      },
      { where: { id } }
    );
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete people
export async function remove(_, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const people = await models.People.findOne({ where: { id } });

    if (!people) {
      // People does not exists
      throw new Error('The people does not exists.');
    } else {
      return await models.People.destroy({ where: { id } });
    }
  } else {
    throw new Error('Operation denied.');
  }
}

// People Rol types
export async function getRoles() {
  return Object.values(params.works.roles);
}
