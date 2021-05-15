// Imports
import { GraphQLInt, GraphQLList } from 'graphql';

// App Imports
import { PageType } from './types';
import { getByChapter } from './resolvers';

// Page By Work
export const pagesByChapter = {
  type: new GraphQLList(PageType),
  args: {
    chapterId: { type: GraphQLInt }
  },
  resolve: getByChapter
};
