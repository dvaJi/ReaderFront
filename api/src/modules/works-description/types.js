// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import GraphQLDate from 'graphql-date';

// App Imports
import { WorkType } from '../works/types';

// WorksDescription type
const WorksDescriptionType = new GraphQLObjectType({
  name: 'worksDescription',
  description: 'WorksDescription Type',

  fields: () => ({
    id: { type: GraphQLInt },
    work: { type: WorkType },
    language: { type: GraphQLInt },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate }
  })
});

export { WorksDescriptionType };
