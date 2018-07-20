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

  // set a covers obj
  const covers =
    work.works_covers !== undefined ? normalizeCovers(work.works_covers) : null;

  return {
    ...work,
    statusLabel: status,
    demographic: demographic,
    genres: genres,
    people_works: pWorks,
    description: desc,
    covers: covers
  };
}

function normalizeCovers(works_covers) {
  if (works_covers.length === 0) {
    return null;
  }

  let covers = {};
  const coversTypesKeys = Object.keys(params.works.cover_type);
  coversTypesKeys
    .filter(ctk =>
      works_covers.find(
        wc => wc.coverTypeId === params.works.cover_type[ctk].id
      )
    )
    .forEach(ctk => {
      covers = {
        ...covers,
        [ctk]: works_covers.find(
          wc => wc.coverTypeId === params.works.cover_type[ctk].id
        )
      };
    });

  return covers;
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
