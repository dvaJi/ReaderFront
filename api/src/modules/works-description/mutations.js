// Imports
import { GraphQLString, GraphQLInt } from 'graphql';

// App Imports
import { WorksDescriptionType } from './types';
import { create, update, remove } from './resolvers';

// WorksDescription create
export const worksDescriptionCreate = {
  type: WorksDescriptionType,
  args: {
    workId: {
      name: 'workId',
      type: GraphQLInt
    },

    language: {
      name: 'language',
      type: GraphQLInt
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: create
};

// WorksDescription update
export const worksDescriptionUpdate = {
  type: WorksDescriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    workId: {
      name: 'workId',
      type: GraphQLInt
    },

    language: {
      name: 'language',
      type: GraphQLInt
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: update
};

// WorksDescription remove
export const worksDescriptionRemove = {
  type: WorksDescriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
};
