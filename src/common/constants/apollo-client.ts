/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from '@apollo/client';
import { API_URL, WS_URL } from './urls';
import { onError } from '@apollo/client/link/error';
import { excludedRoutes } from './excluded-routes';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// ✅ Error handling link (placed before httpLink)
const logoutLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors?.length) {
    const firstError = graphQLErrors[0];

    // ✅ Extract status code safely
    const statusCode =
      (firstError?.extensions?.originalError as any)?.statusCode ||
      firstError?.extensions?.code;

    console.log('GraphQL Error:', firstError);

    if (
      statusCode === 401 &&
      !excludedRoutes.includes(window.location.pathname)
    ) {
      window.location.assign('/login'); // ✅ Better alternative to window.location.href
      client.resetStore(); // ✅ Ensures Apollo cache is reset properly
    }
  }
});

// ✅ Create an HTTP link
const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

// ✅ Authentication middleware
const authLink = new ApolloLink((operation, forward) => {
  const operationName = operation.operationName || ''; // ✅ Avoids undefined.includes() issue
  const isAuthRequired = !operationName.includes('createUser');

  operation.setContext({
    credentials: isAuthRequired ? 'include' : 'omit',
  });

  return forward(operation);
});

// ✅ Create WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL, // ✅ Ensure WebSocket URL is correct
  })
);

// ✅ Use split for queries vs. subscriptions
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// ✅ Initialize Apollo Client with improved cache policy
const client = new ApolloClient({
  link: ApolloLink.from([logoutLink, authLink, splitLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // ✅ Prevents stale data issues
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
