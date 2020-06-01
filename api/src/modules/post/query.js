// Imports
import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

// App Imports
import { PostType, PostsAggregatesType } from './types';
import { getAll, getByStub, getByCategory, getAggregates } from './resolvers';

// Posts All
export const posts = {
  type: new GraphQLList(PostType),
  args: {
    languages: { type: new GraphQLList(GraphQLInt) },
    orderBy: { type: GraphQLString },
    sortBy: { type: GraphQLString },
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getAll
};

// Posts by Stub
export const postByStub = {
  type: PostType,
  args: {
    stub: { type: GraphQLString },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getByStub
};

// Post By Category
export const postsByCategory = {
  type: new GraphQLList(PostType),
  args: {
    categoryId: { type: GraphQLInt },
    languages: { type: new GraphQLList(GraphQLInt) },
    orderBy: { type: GraphQLString },
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getByCategory
};

// Posts Aggregates
export const postsAggregates = {
  type: PostsAggregatesType,
  args: {
    aggregate: { type: GraphQLString },
    aggregateColumn: { type: GraphQLString },
    languages: { type: new GraphQLList(GraphQLInt) },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getAggregates
};
