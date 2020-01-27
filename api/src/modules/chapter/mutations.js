// Imports
import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';

// App Imports
import { ChapterType } from './types';
import { create, update, updateDefaultThumbnail, remove } from './resolvers';

// Chapter create
export const chapterCreate = {
  type: ChapterType,
  args: {
    workId: {
      name: 'workId',
      type: GraphQLInt
    },

    chapter: {
      name: 'chapter',
      type: GraphQLInt
    },

    subchapter: {
      name: 'subchapter',
      type: GraphQLInt
    },

    volume: {
      name: 'volume',
      type: GraphQLInt
    },

    language: {
      name: 'language',
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

    hidden: {
      name: 'hidden',
      type: GraphQLBoolean
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    thumbnail: {
      name: 'thumbnail',
      type: GraphQLString
    },

    releaseDate: {
      name: 'releaseDate',
      type: GraphQLString
    }
  },
  resolve: create
};

// Chapter update
export const chapterUpdate = {
  type: ChapterType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    workId: {
      name: 'workId',
      type: GraphQLInt
    },

    chapter: {
      name: 'chapter',
      type: GraphQLInt
    },

    subchapter: {
      name: 'subchapter',
      type: GraphQLInt
    },

    volume: {
      name: 'volume',
      type: GraphQLInt
    },

    language: {
      name: 'language',
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

    hidden: {
      name: 'hidden',
      type: GraphQLBoolean
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    thumbnail: {
      name: 'thumbnail',
      type: GraphQLString
    },

    releaseDate: {
      name: 'releaseDate',
      type: GraphQLString
    }
  },
  resolve: update
};

// Chapter update
export const chapterThumbUpdate = {
  type: ChapterType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    thumbnail: {
      name: 'thumbnail',
      type: GraphQLString
    }
  },
  resolve: updateDefaultThumbnail
};

// Chapter remove
export const chapterRemove = {
  type: ChapterType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
};
