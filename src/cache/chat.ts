/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloCache } from '@apollo/client';
import { ChatOutput, GetMessageOutput } from '../gql/graphql';
import { GET_CHATS_QUERY } from '../hooks';

export const updateChats = (
  cache: ApolloCache<any>,
  id: string,
  message: GetMessageOutput
) => {
  const chatQueryOptions = {
    query: GET_CHATS_QUERY,
    variables: {
      cursor: null,
    },
  };

  const existing = cache.readQuery<{
    findChats: ChatOutput[];
  }>(chatQueryOptions);

  if (existing && existing.findChats) {
    if (!existing) return;

    const updatedChats = existing.findChats.map((chat) => {
      if (chat._id === id) {
        return {
          ...chat,
          lastMessage: message,
        };
      }
      return chat;
    });

    cache.writeQuery({
      ...chatQueryOptions,
      data: {
        findChats: [...updatedChats],
      },
    });
  } else {
    console.warn('No existing messages in cache. Skipping cache update.');
  }
};
