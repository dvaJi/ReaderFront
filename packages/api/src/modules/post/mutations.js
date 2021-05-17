// Imports
import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

// App Imports
import { PostType } from './types';
import { create, update, remove } from './resolvers';

// Post create
export const postCreate = {
  type: PostType,
  args: {
    userId: {
      name: 'userId',
      type: GraphQLInt
    },

    content: {
      name: 'content',
      type: GraphQLString
    },

    category: {
      name: 'category',
      type: GraphQLInt
    },

    uniqid: {
      name: 'uniqid',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLInt
    },

    title: {
      name: 'title',
      type: GraphQLString
    },

    stub: {
      name: 'stub',
      type: GraphQLString
    },

    status: {
      name: 'status',
      type: GraphQLInt
    },

    sticky: {
      name: 'sticky',
      type: GraphQLBoolean
    },

    language: {
      name: 'language',
      type: GraphQLInt
    },

    thumbnail: {
      name: 'thumbnail',
      type: GraphQLUpload
    }
  },
  resolve: create
};

// Post update
export const postUpdate = {
  type: PostType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    userId: {
      name: 'userId',
      type: GraphQLInt
    },

    content: {
      name: 'content',
      type: GraphQLString
    },

    category: {
      name: 'category',
      type: GraphQLInt
    },

    uniqid: {
      name: 'uniqid',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLInt
    },

    title: {
      name: 'title',
      type: GraphQLString
    },

    stub: {
      name: 'stub',
      type: GraphQLString
    },

    status: {
      name: 'status',
      type: GraphQLInt
    },

    sticky: {
      name: 'sticky',
      type: GraphQLBoolean
    },

    language: {
      name: 'language',
      type: GraphQLInt
    },

    thumbnail: {
      name: 'thumbnail',
      type: GraphQLUpload
    }
  },
  resolve: update
};

// Post remove
export const postRemove = {
  type: PostType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
};
