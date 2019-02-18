import { getPeople } from './getPeopleMock';

export const getWorks = [
  {
    id: 1,
    name: 'Aka Akatoshitachi no Monogatari',
    stub: 'aka_akatoshitachi_no_monogatari',
    uniqid: '9asdof9sdfkfo9l',
    status: 2,
    demographicId: 7,
    type: 'Manga',
    adult: false,
    hidden: false,
    thumbnail: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    works_descriptions: [],
    works_genres: [{ genreId: 5 }, { genreId: 8 }, { genreId: 1 }],
    works_covers: []
  },
  {
    id: 2,
    name: 'Deathtopia',
    stub: 'deathtopia',
    uniqid: '2jd20dlsda0',
    status: 2,
    demographicId: 3,
    type: 'Manga',
    adult: false,
    hidden: false,
    thumbnail: 'thumb_00_cover.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    works_descriptions: [],
    works_genres: [{ genreId: 3 }, { genreId: 6 }],
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
  },
  {
    id: 3,
    name: 'Infection',
    stub: 'infection',
    uniqid: 'das0pasdlfsdfñ',
    status: 1,
    demographicId: 7,
    type: 'Manga',
    adult: false,
    hidden: false,
    thumbnail: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    works_descriptions: [
      { description: 'Zombis y rikura', language: 1 },
      { description: 'zombies and ecchi', language: 2 }
    ],
    works_genres: [],
    works_covers: []
  }
];

export const getWork = {
  id: 1,
  name: 'Aka Akatoshitachi no Monogatari',
  stub: 'aka_akatoshitachi_no_monogatari',
  uniqid: '21pdsad0is0fsdfñ',
  status: 2,
  demographicId: 7,
  type: 'Manga',
  adult: false,
  hidden: false,
  thumbnail: 'thumb_00_cover.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  works_descriptions: [
    { description: 'some vampires', language: 2 },
    { description: 'vampiros', language: 1 }
  ],
  works_genres: [{ genreId: 1 }, { genreId: 2 }],
  people_works: [{ rol: 1, people: getPeople() }],
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
};
