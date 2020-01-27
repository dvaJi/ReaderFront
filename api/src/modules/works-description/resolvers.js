// App Imports
import params from '../../config/params';
import models from '../../setup/models';

// Get worksDescription by work
export async function getByWork(parentValue, { workId, language }) {
  return await models.WorksDescription.findAll({
    where: {
      workId: Number(workId),
      language: language
    },
    include: [{ model: models.Works, as: 'work' }]
  });
}

// Create descriptions
export async function createDescriptions(descriptions, workId) {
  const descriptionsArray = JSON.parse(descriptions);
  if (descriptionsArray !== undefined && workId !== undefined) {
    await models.WorksDescription.destroy({ where: { workId: workId } });

    const descriptionsInsert = descriptionsArray.map(desc => ({
      workId,
      language: desc.language,
      description: desc.description
    }));

    models.WorksDescription.bulkCreate(descriptionsInsert, { returning: true });
  } else {
    throw new Error('Operation denied.');
  }
}

// Create worksDescription
export async function create(
  parentValue,
  { workId, language, description },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.WorksDescription.create({
      workId,
      language,
      description
    });
  } else {
    throw new Error('Operation denied.');
  }
}

// Update worksDescription
export async function update(
  parentValue,
  { id, workId, language, description },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.WorksDescription.update(
      {
        workId,
        language,
        description
      },
      { where: { id } }
    );
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete worksDescription
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const worksDescription = await models.WorksDescription.findOne({
      where: { id }
    });

    if (!worksDescription) {
      // WorksDescription does not exists
      throw new Error('The worksDescription does not exists.');
    } else {
      return await models.WorksDescription.destroy({ where: { id } });
    }
  } else {
    throw new Error('Operation denied.');
  }
}

// WorksDescription types
export async function getTypes() {
  return Object.values(params.worksDescription.types);
}
