// Imports
import { GraphQLInt } from 'graphql';

// App Imports
import { WorksGenreType } from './types';
import { create, update, remove } from './resolvers';

// WorksGenre create
export const worksGenreCreate = {
  type: WorksGenreType,
  args: {
    workId: {
      name: 'workId',
      type: GraphQLInt
    },

    genreId: {
      name: 'genreId',
      type: GraphQLInt
    }
  },
  resolve: create
};

// WorksGenre update
export const worksGenreUpdate = {
  type: WorksGenreType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    workId: {
      name: 'workId',
      type: GraphQLInt
    },

    genreId: {
      name: 'genreId',
      type: GraphQLInt
    }
  },
  resolve: update
};

// WorksGenre remove
export const worksGenreRemove = {
  type: WorksGenreType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
};
