import { getPeople } from './getPeopleMock';

export function getWorks() {
  let works = [];
  works.push({
    id: 1,
    name: 'Aka Akatoshitachi no Monogatari',
    stub: 'aka_akatoshitachi_no_monogatari',
    status: 2,
    demographicId: 7,
    works_descriptions: [],
    works_genres: generateGenres(3),
    works_covers: []
  });
  works.push({
    id: 2,
    name: 'Deathtopia',
    stub: 'deathtopia',
    status: 2,
    demographicId: 3,
    works_descriptions: [],
    works_genres: generateGenres(2),
    works_covers: [
      {
        id: 1,
        filename: 'thumb_00_cover.png',
        coverTypeId: 1
      },
      {
        id: 2,
        filename: 'thumb2_00_cover.png',
        coverTypeId: 2
      },
      {
        id: 3,
        filename: '00_cover.png',
        coverTypeId: 3
      }
    ]
  });
  works.push({
    id: 3,
    name: 'Infection',
    stub: 'infection',
    status: 1,
    demographicId: 7,
    works_descriptions: [{ description: 'zombies and ecchi' }],
    works_genres: generateGenres(1),
    works_covers: []
  });

  return works;
}

export function getWork() {
  return {
    id: 1,
    name: 'Aka Akatoshitachi no Monogatari',
    stub: 'aka_akatoshitachi_no_monogatari',
    status: 2,
    demographicId: 7,
    works_descriptions: [{ description: 'some vampires' }],
    works_genres: generateGenres(3),
    people_works: [{ rol: 1, people: getPeople() }],
    works_covers: []
  };
}

function generateGenres(amount = 2) {
  const genres = [];
  for (let index = 1; index <= amount; index++) {
    genres.push({ genreId: index });
  }
  return genres;
}
