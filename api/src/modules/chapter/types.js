// Imports
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';
import GraphQLDate from 'graphql-date';

// App Imports
import { WorkType } from '../works/types';
import { PageType } from '../page/types';

// Chapter type
const ChapterType = new GraphQLObjectType({
  name: 'chapter',
  description: 'Chapter Type',

  fields: () => ({
    id: { type: GraphQLInt },
    work: { type: WorkType },
    pages: { type: new GraphQLList(PageType) },
    chapter: { type: GraphQLInt },
    subchapter: { type: GraphQLInt },
    volume: { type: GraphQLInt },
    language: { type: GraphQLInt },
    language_name: { type: GraphQLString },
    name: { type: GraphQLString },
    stub: { type: GraphQLString },
    uniqid: { type: GraphQLString },
    hidden: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    thumbnail_path: { type: GraphQLString },
    releaseDate: { type: GraphQLDate },
    download_href: { type: GraphQLString },
    read_path: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate }
  })
});

export { ChapterType };
