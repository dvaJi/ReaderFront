import { GraphQLInt, GraphQLList } from 'graphql';

import { RegistryType } from './types';
import { getRegistries } from './resolvers';

export const registries = {
  type: new GraphQLList(RegistryType),
  args: {
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: getRegistries
};
