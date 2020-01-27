// Imports
import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLJSON } from 'graphql-type-json';

// App Imports
import { WorkType } from './types';
import { create, update, remove } from './resolvers';

// Work create
export const workCreate = {
  type: WorkType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    stub: {
      name: 'stub',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLString
    },

    hidden: {
      name: 'hidden',
      type: GraphQLBoolean
    },

    demographicId: {
      name: 'demographicId',
      type: GraphQLInt
    },

    status: {
      name: 'status',
      type: GraphQLInt
    },

    statusReason: {
      name: 'statusReason',
      type: GraphQLString
    },

    adult: {
      name: 'adult',
      type: GraphQLBoolean
    },

    visits: {
      name: 'visits',
      type: GraphQLInt
    },

    thumbnail: {
      name: 'thumbnail',
      type: GraphQLUpload
    },

    works_descriptions: {
      name: 'works_descriptions',
      type: GraphQLString
    },

    works_genres: {
      name: 'works_genres',
      type: GraphQLJSON
    },

    people_works: {
      name: 'people_works',
      type: GraphQLJSON
    }
  },
  resolve: create
};

// Work update
export const workUpdate = {
  type: WorkType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    stub: {
      name: 'stub',
      type: GraphQLString
    },

    uniqid: {
      name: 'uniqid',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLString
    },

    hidden: {
      name: 'hidden',
      type: GraphQLBoolean
    },

    demographicId: {
      name: 'demographicId',
      type: GraphQLInt
    },

    status: {
      name: 'status',
      type: GraphQLInt
    },

    statusReason: {
      name: 'statusReason',
      type: GraphQLString
    },

    thumbnail: {
      name: 'thumbnail',
      type: GraphQLUpload
    },

    adult: {
      name: 'adult',
      type: GraphQLBoolean
    },

    visits: {
      name: 'visits',
      type: GraphQLInt
    },

    cover: {
      name: 'cover',
      type: GraphQLString
    },

    works_descriptions: {
      name: 'works_descriptions',
      type: GraphQLString
    },

    works_genres: {
      name: 'works_genres',
      type: GraphQLJSON
    },

    people_works: {
      name: 'people_works',
      type: GraphQLJSON
    }
  },
  resolve: update
};

// Work remove
export const workRemove = {
  type: WorkType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
};
