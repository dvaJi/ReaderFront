import gql from 'graphql-tag';

export const USERS_LIST = gql`
  query Users {
    users {
      id
      name
      email
      role
      activated
      banned
      lastLogin
    }
  }
`;
