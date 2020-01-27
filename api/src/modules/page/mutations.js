// Imports
import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

// App Imports
import { PageType } from './types';
import { create, update, remove } from './resolvers';

// Page create
export const pageCreate = {
  type: PageType,
  args: {
    chapterId: {
      name: 'chapterId',
      type: GraphQLInt
    },

    file: {
      name: 'file',
      type: GraphQLUpload
    },

    size: {
      name: 'size',
      type: GraphQLInt
    }
  },
  resolve: create
};

// Page update
export const pageUpdate = {
  type: PageType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    chapterId: {
      name: 'chapterId',
      type: GraphQLInt
    },

    filename: {
      name: 'filename',
      type: GraphQLString
    },

    hidden: {
      name: 'hidden',
      type: GraphQLBoolean
    },

    height: {
      name: 'height',
      type: GraphQLInt
    },

    width: {
      name: 'width',
      type: GraphQLInt
    },

    size: {
      name: 'size',
      type: GraphQLInt
    },

    mime: {
      name: 'mime',
      type: GraphQLString
    }
  },
  resolve: update
};

// Page remove
export const pageRemove = {
  type: PageType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
};
