// Imports
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';
import GraphQLDate from 'graphql-date';

// App Imports
import { ChapterType } from '../chapter/types';

// Page type
const PageType = new GraphQLObjectType({
  name: 'page',
  description: 'Page Type',

  fields: () => ({
    id: { type: GraphQLInt },
    chapter: { type: ChapterType },
    filename: { type: GraphQLString },
    hidden: { type: GraphQLBoolean },
    height: { type: GraphQLInt },
    width: { type: GraphQLInt },
    size: { type: GraphQLInt },
    mime: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate }
  })
});

export { PageType };
