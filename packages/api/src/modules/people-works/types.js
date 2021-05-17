// Imports
import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import GraphQLDate from 'graphql-date';

// App Imports
import { WorkType } from '../works/types';
import { PeopleType } from '../people/types';

// People type
const PeopleWorksType = new GraphQLObjectType({
  name: 'peopleWorks',
  description: 'PeopleWorks Type',

  fields: () => ({
    id: { type: GraphQLInt },
    work: { type: WorkType },
    people: { type: PeopleType },
    rol: { type: GraphQLInt },
    rol_name: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate }
  })
});

export { PeopleWorksType };
