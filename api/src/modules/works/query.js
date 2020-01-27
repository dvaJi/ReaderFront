// Imports
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

// App Imports
import { WorkType, WorksStatusType, WorkAggregatesType } from './types';
import {
  getAll,
  getByStub,
  getById,
  getRandom,
  getStatusTypes,
  getAggregates
} from './resolvers';

// Works All
export const works = {
  type: new GraphQLList(WorkType),
  args: {
    orderBy: { type: GraphQLString },
    sortBy: { type: GraphQLString },
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    language: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getAll
};

// Work By stub
export const work = {
  type: WorkType,
  args: {
    stub: { type: GraphQLString },
    language: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getByStub
};

// Work By ID
export const workById = {
  type: WorkType,
  args: {
    workId: { type: GraphQLInt },
    language: { type: GraphQLInt }
  },
  resolve: getById
};

// Random Work
export const workRandom = {
  type: WorkType,
  args: {
    language: { type: GraphQLInt }
  },
  resolve: getRandom
};

// Work Types
export const workStatusTypes = {
  type: new GraphQLList(WorksStatusType),
  resolve: getStatusTypes
};

// Work Aggregates
export const workAggregates = {
  type: WorkAggregatesType,
  args: {
    aggregate: { type: GraphQLString },
    aggregateColumn: { type: GraphQLString },
    language: { type: GraphQLInt },
    showHidden: { type: GraphQLBoolean }
  },
  resolve: getAggregates
};
