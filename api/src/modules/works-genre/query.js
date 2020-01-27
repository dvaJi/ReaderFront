// Imports
import { GraphQLList } from 'graphql';

// App Imports
import { GenresType, DemographicType } from './types';
import { getGenresTypes, getDemographicTypes } from './resolvers';

// Genres Types
export const genresTypes = {
  type: new GraphQLList(GenresType),
  resolve: getGenresTypes
};

// Demographic Types
export const demographicsTypes = {
  type: new GraphQLList(DemographicType),
  resolve: getDemographicTypes
};
