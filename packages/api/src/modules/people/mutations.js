// Imports
import { GraphQLString, GraphQLInt } from 'graphql';

// App Imports
import { PeopleType } from './types';
import { create, update, remove } from './resolvers';

// People create
export const peopleCreate = {
  type: PeopleType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
      description: 'People name'
    },
    name_kanji: {
      name: 'name_kanji',
      type: GraphQLString
    },
    description: {
      name: 'description',
      type: GraphQLString
    },
    twitter: {
      name: 'twitter',
      type: GraphQLString
    },
    thumbnail: {
      name: 'thumbnail',
      type: GraphQLString
    }
  },
  resolve: create
};

// People update
export const peopleUpdate = {
  type: PeopleType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },
    name_kanji: {
      name: 'name_kanji',
      type: GraphQLString
    },
    description: {
      name: 'description',
      type: GraphQLString
    },
    twitter: {
      name: 'twitter',
      type: GraphQLString
    },
    thumbnail: {
      name: 'thumbnail',
      type: GraphQLString
    }
  },
  resolve: update
};

// People remove
export const peopleRemove = {
  type: PeopleType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
};
