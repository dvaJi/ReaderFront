// Imports
import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

// App Imports
import { ChapterType } from './types';
import {
  getAll,
  getByWork,
  getById,
  getWithPagesByWorkStubAndChapter
} from './resolvers';

// Chapters All
export const chapters = {
  type: new GraphQLList(ChapterType),
  args: {
    language: { type: GraphQLInt },
    orderBy: { type: GraphQLString },
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getAll
};

// Chapter By Work
export const chaptersByWork = {
  type: new GraphQLList(ChapterType),
  args: {
    workStub: { type: GraphQLString },
    language: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getByWork
};

// Chapter By ID
export const chapterById = {
  type: ChapterType,
  args: {
    id: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getById
};

// Chapter By Work Stub + Chapter
export const chapterByWorkAndChapter = {
  type: ChapterType,
  args: {
    workStub: { type: GraphQLString },
    language: { type: GraphQLInt },
    volume: { type: GraphQLInt },
    chapter: { type: GraphQLInt },
    subchapter: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getWithPagesByWorkStubAndChapter
};
