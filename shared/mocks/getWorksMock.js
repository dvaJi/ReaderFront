import { getPeople } from './getPeopleMock';

export const getWorks = [
  {
    id: 1,
    name: 'Aka Akatoshitachi no Monogatari',
    stub: 'aka_akatoshitachi_no_monogatari',
    uniqid: '9asdof9sdfkfo9l',
    status: 2,
    status_name: 'completed',
    licensed: false,
    demographicId: 7,
    demographic_name: 'Shounen',
    type: 'Manga',
    adult: false,
    hidden: false,
    thumbnail: null,
    thumbnail_path: '/default.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    language: 1,
    language_name: 'es',
    description: '',
    description_short: '',
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
    status_name: 'dropped',
    licensed: false,
    demographicId: 3,
    demographic_name: 'Josei',
    type: 'Manga',
    adult: false,
    hidden: false,
    thumbnail: 'thumb_00_cover.png',
    thumbnail_path: '/thumb_00_cover.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    language: 1,
    language_name: 'es',
    description: '',
    description_short: '',
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
    status_name: 'on_going',
    licensed: false,
    demographicId: 7,
    demographic_name: 'Seinen',
    type: 'Manga',
    adult: false,
    hidden: false,
    thumbnail: null,
    thumbnail_path: '/default.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    language: 1,
    language_name: 'es',
    description: 'zombies and ecchi',
    description_short: 'zombies and...',
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
  status_name: 'completed',
  licensed: false,
  demographicId: 7,
  demographic_name: 'Seinen',
  type: 'Manga',
  adult: false,
  hidden: false,
  thumbnail: 'thumb_00_cover.png',
  thumbnail_path: '/thumb_00_cover.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  language: 1,
  language_name: 'es',
  description: 'some vampires',
  description_short: 'some vamp...',
  works_genres: [{ genreId: 1 }, { genreId: 2 }],
  genres: [
    { id: 1, name: 'action' },
    { id: 2, name: 'drama' }
  ],
  people_works: [{ rol: 1, people: getPeople() }],
  staff: [{ rol: 1, rol_name: 'Author', people: getPeople() }],
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
