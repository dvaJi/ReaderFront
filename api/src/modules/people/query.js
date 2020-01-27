// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql';

// App Imports
import { PeopleType, PeopleRolType } from './types';
import { getAll, getAllByName, getByStub, getRoles } from './resolvers';

export const searchPeopleByName = {
  type: new GraphQLList(PeopleType),
  args: {
    name: { type: GraphQLString },
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: getAllByName
};

// Peoples All
export const peoples = {
  type: new GraphQLList(PeopleType),
  args: {
    orderBy: { type: GraphQLString },
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: getAll
};

// People By Stub
export const peoplesByStub = {
  type: new GraphQLList(PeopleType),
  args: {
    stub: { type: GraphQLString }
  },
  resolve: getByStub
};

// People Rol
export const peopleRolTypes = {
  type: new GraphQLList(PeopleRolType),
  resolve: getRoles
};
