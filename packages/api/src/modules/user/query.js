// Imports
import { GraphQLInt, GraphQLList } from 'graphql';

// App Imports
import { UserType, UserGenderType } from './types';
import { getAll, getById, getGenders } from './resolvers';

// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
};

// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
};

// Genders
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
};
