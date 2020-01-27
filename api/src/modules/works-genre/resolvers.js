// App Imports
import params from '../../config/params';
import models from '../../setup/models';

export async function insertGenres(workId, genres) {
  await models.WorksGenres.destroy({ where: { workId: workId } });
  const genresIds = genres.map(genre => ({ workId, genreId: genre.genreId }));
  return await models.WorksGenres.bulkCreate(genresIds, { returning: true });
}

// Genres types
export async function getGenresTypes() {
  return Object.values(params.genres.types);
}

// Demographic types
export async function getDemographicTypes() {
  return Object.values(params.genres.demographic);
}
