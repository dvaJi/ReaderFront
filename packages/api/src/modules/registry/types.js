import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import GraphQLDate from 'graphql-date';

// Registry type
const RegistryType = new GraphQLObjectType({
  name: 'registry',
  description: 'Registry type',

  fields: () => ({
    id: { type: GraphQLInt },
    action: { type: GraphQLString },
    module: { type: GraphQLString },
    detail: { type: GraphQLString },
    username: { type: GraphQLString },
    createdAt: { type: GraphQLDate }
  })
});

export { RegistryType };
