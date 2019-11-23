import ApolloClient from 'apollo-boost';

import { READER_PATH } from './config';

const client = new ApolloClient({
  uri: READER_PATH,
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

export default client;
