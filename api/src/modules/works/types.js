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
import { ChapterType } from '../chapter/types';
import { WorksDescriptionType } from '../works-description/types';
import { WorksGenreType } from '../works-genre/types';
import { PeopleWorksType } from '../people-works/types';

// Works type
const WorkType = new GraphQLObjectType({
  name: 'works',
  description: 'Works Type',

  fields: () => ({
    id: { type: GraphQLInt },
    chapters: { type: new GraphQLList(ChapterType) },
    works_descriptions: { type: new GraphQLList(WorksDescriptionType) },
    works_genres: { type: new GraphQLList(WorksGenreType) },
    genres: { type: new GraphQLList(WorksGenre) },
    people_works: { type: new GraphQLList(PeopleWorksType) },
    languages: { type: new GraphQLList(WorksLanguageType) },
    name: { type: GraphQLString },
    stub: { type: GraphQLString },
    uniqid: { type: GraphQLString },
    type: { type: GraphQLString },
    hidden: { type: GraphQLBoolean },
    demographicId: { type: GraphQLInt },
    status: { type: GraphQLInt },
    statusReason: { type: GraphQLString },
    adult: { type: GraphQLBoolean },
    visits: { type: GraphQLInt },
    thumbnail: { type: GraphQLString },
    thumbnail_path: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate }
  })
});

// Works status type
const WorksStatusType = new GraphQLObjectType({
  name: 'worksStatusType',
  description: 'Works Status Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

// Works status type
const WorkAggregatesType = new GraphQLObjectType({
  name: 'workAggregatesType',
  description: 'Work Aggregates Type',

  fields: () => ({
    count: { type: GraphQLInt },
    sum: { type: GraphQLInt },
    max: { type: GraphQLInt },
    min: { type: GraphQLInt }
  })
});

const WorksGenre = new GraphQLObjectType({
  name: 'worksGenrasde',
  description: 'Works Genre',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const WorksLanguageType = new GraphQLObjectType({
  name: 'worksLanguageType',
  description: 'Works Language Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

export { WorkType, WorksStatusType, WorkAggregatesType };
