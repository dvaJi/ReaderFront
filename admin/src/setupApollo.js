import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { READER_PATH } from './config';
import { setUser } from 'state';

const httpLink = createHttpLink({
  uri: READER_PATH
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      'keep-alive': 'true',
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'Operation denied.') {
        setUser(null);
      }

      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink, createUploadLink(), onErrorLink),
  cache: new InMemoryCache(),
  ssrMode: false,
  name: 'ReaderFront'
});

export default client;
