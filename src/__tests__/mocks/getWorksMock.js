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
    thumbnail_path: '/images/default.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    works_descriptions: [],
    languages: [],
    works_genres: [{ genreId: 5 }, { genreId: 8 }, { genreId: 1 }],
    genres: [
      { id: 5, name: 'action' },
      { id: 8, name: 'drama' },
      { id: 1, name: 'drama' }
    ],
    works_covers: []
  },
  {
    id: 2,
    name: 'Deathtopia',
    stub: 'deathtopia',
    uniqid: '2jd20dlsda0',
    status: 3,
    demographicId: 3,
    type: 'Manga',
    adult: false,
    hidden: false,
    thumbnail: 'thumb_00_cover.png',
    thumbnail_path: '/images/thumb_00_cover.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    works_descriptions: [],
    languages: [],
    works_genres: [{ genreId: 3 }, { genreId: 6 }],
    genres: [
      { id: 3, name: 'fantasy' },
      { id: 6, name: 'horror' }
    ],
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
    thumbnail_path: '/images/default.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    works_descriptions: [
      { description: 'Zombis y fanservice', language: 1 },
      { description: 'zombies and ecchi', language: 2 }
    ],
    languages: [
      { id: 1, name: 'es', description: 'Zombis y fanservice' },
      { id: 2, name: 'en', description: 'zombies and ecchi' }
    ],
    works_genres: [],
    genres: [],
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
  thumbnail_path: '/images/thumb_00_cover.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  works_descriptions: [
    { description: 'some vampires', language: 2 },
    { description: 'vampiros', language: 1 }
  ],
  languages: [
    { id: 1, name: 'es', description: 'vampiros' },
    { id: 2, name: 'en', description: 'some vampires' }
  ],
  works_genres: [{ genreId: 1 }, { genreId: 2 }],
  genres: [
    { id: 1, name: 'action' },
    { id: 2, name: 'drama' }
  ],
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
