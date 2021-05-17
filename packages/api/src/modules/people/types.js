// Imports
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import GraphQLDate from 'graphql-date';

// App Imports
import { PeopleWorksType } from '../people-works/types';

// People type
const PeopleType = new GraphQLObjectType({
  name: 'people',
  description: 'People Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString, description: 'The name of the person' },
    name_kanji: {
      type: GraphQLString,
      description: 'The name (kanji) of the person'
    },
    stub: { type: GraphQLString, description: 'The stub of the person' },
    uniqid: { type: GraphQLString, description: 'The uniqid of the person' },
    description: {
      type: GraphQLString,
      description: "Person's biography/comments"
    },
    twitter: { type: GraphQLString, description: 'Twitter username' },
    thumbnail: { type: GraphQLString, description: 'Thumbnail filename' },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
    people_works: {
      type: new GraphQLList(PeopleWorksType),
      description: 'The works of the person'
    }
  })
});

// People Rol type
const PeopleRolType = new GraphQLObjectType({
  name: 'PeopleRolType',
  description: 'People Rol Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

export { PeopleType, PeopleRolType };
