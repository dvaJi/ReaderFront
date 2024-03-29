// App Imports
import models from '../../setup/models';

export async function insertGenres(workId, genres) {
  await models.WorksGenres.destroy({ where: { workId: workId } });
  const genresIds = genres.map(genre => ({ workId, genreId: genre.genreId }));
  return await models.WorksGenres.bulkCreate(genresIds);
}

// Genres types
export async function getGenresTypes() {
  return {};
}

// Demographic types
export async function getDemographicTypes() {
  return {};
}
