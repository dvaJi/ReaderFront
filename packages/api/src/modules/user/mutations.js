// Imports
import { GraphQLString, GraphQLInt } from 'graphql';

// App Imports
import { UserType, UserLoginType, MessageType } from './types';
import {
  login,
  create,
  ban,
  unban,
  activate,
  changePassword,
  recoverPassword,
  changeRole,
  updateProfile
} from './resolvers';

// Auth
export const userLogin = {
  type: UserLoginType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    },

    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: login
};

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
};

// Activate
export const userActivate = {
  type: UserType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    activatedToken: {
      name: 'token',
      type: GraphQLString
    }
  },
  resolve: activate
};

// Ban
export const userBan = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    reason: {
      name: 'reason',
      type: GraphQLString
    }
  },
  resolve: ban
};

// Unban
export const userUnban = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: unban
};

export const userRecoverPassword = {
  type: MessageType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    }
  },
  resolve: recoverPassword
};

export const userChangePassword = {
  type: MessageType,
  args: {
    token: {
      name: 'token',
      type: GraphQLString
    },
    newPassword: {
      name: 'newPassword',
      type: GraphQLString
    }
  },
  resolve: changePassword
};

export const userChangeRole = {
  type: MessageType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: changeRole
};

export const userUpdateProfile = {
  type: MessageType,
  args: {
    username: { name: 'username', type: GraphQLString },
    password: { name: 'password', type: GraphQLString }
  },
  resolve: updateProfile
};
