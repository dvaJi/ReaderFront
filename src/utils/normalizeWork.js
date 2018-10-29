import params from '../params.json';

/**
 * Normalize data and add new properties to work object
 * @param {*} work
 */
export function normalizeWork(work) {
  const status = Object.keys(params.works.status).find(
    st => params.works.status[st].id === work.status
  );

  // Get demographic key
  const demographic = Object.keys(params.genres.demographic).find(
    dm => params.genres.demographic[dm].id === work.demographicId
  );

  // get genres keys
  const genres = work.works_genres.map(wg => {
    return Object.keys(params.genres.types).find(
      dm => params.genres.types[dm].id === wg.genreId
    );
  });

  // get roles keys
  const pWorks =
    work.people_works !== undefined
      ? normalizePeopleWorks(work.people_works)
      : [];

  // set a safest description
  const desc =
    work.works_descriptions.length === 0
      ? ''
      : work.works_descriptions[0].description;

  return {
    ...work,
    statusLabel: status,
    demographic: demographic,
    genres: genres,
    people_works: pWorks,
    description: desc
  };
}

function normalizePeopleWorks(people_works) {
  if (people_works.length === 0) {
    return [];
  }

  return people_works.map(pw => {
    return {
      ...pw,
      rolText: Object.keys(params.works.roles).find(
        dm => params.works.roles[dm].id === pw.rol
      )
    };
  });
}
