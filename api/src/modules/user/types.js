// Imports
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'User type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    activated: { type: GraphQLBoolean },
    activatedToken: { type: GraphQLString },
    banned: { type: GraphQLBoolean },
    bannedReason: { type: GraphQLString },
    newPasswordToken: { type: GraphQLString },
    newPasswordRequested: { type: GraphQLBoolean },
    lastIp: { type: GraphQLString },
    lastLogin: { type: GraphQLString }
  })
});

// User Login type
const UserLoginType = new GraphQLObjectType({
  name: 'userAuth',
  description: 'User Authentication Type',

  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
});

// User Gender type
const UserGenderType = new GraphQLObjectType({
  name: 'userGender',
  description: 'User Gender Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

export { UserType, UserLoginType, UserGenderType };
