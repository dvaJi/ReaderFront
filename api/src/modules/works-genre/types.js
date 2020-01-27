// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import GraphQLDate from 'graphql-date';

// App Imports
import { WorkType } from '../works/types';

// WorksGenre type
const WorksGenreType = new GraphQLObjectType({
  name: 'worksGenre',
  description: 'WorksGenre Type',

  fields: () => ({
    id: { type: GraphQLInt },
    work: { type: WorkType },
    genreId: { type: GraphQLInt },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate }
  })
});

// Genres type
const GenresType = new GraphQLObjectType({
  name: 'genresType',
  description: 'Genres Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

// Demographic type
const DemographicType = new GraphQLObjectType({
  name: 'demographicType',
  description: 'Demographic Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

export { WorksGenreType, GenresType, DemographicType };
