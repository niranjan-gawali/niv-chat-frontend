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
  if (
    graphQLErrors?.length &&
    (graphQLErrors[0]?.extensions.originalError as any)?.statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      window.location.href = '/login'; // ✅ Redirect safely
      client.onClearStore(() => client.resetStore()); // ✅ Ensures store resets correctly
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

console.log('WS LINK WE GET : ', WS_URL);

// ✅ Use split for queries vs. subscriptions
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query); // ✅ Pass query correctly
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// ✅ Initialize Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([logoutLink, authLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge,
          },
          messages: {
            keyArgs: ['chatId'],
            merge,
          },
        },
      },
    },
  }),
});

function merge(existing: any, incoming: any, { args }: any) {
  const merged = existing ? existing.slice(0) : [];
  for (let i = 0; i < incoming.length; i++) {
    merged[args.skip + i] = incoming[i];
  }
  return merged;
}

export default client;
